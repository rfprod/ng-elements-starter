import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { LocalStorageMock } from '../../mocks/utils/local-storage.mock';
import { AppUserService } from './user.service';

describe('AppUserService', () => {
  let service: AppUserService;
  let localStorage: LocalStorageMock;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({});
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(
    waitForAsync(() => {
      Object.defineProperty(window, 'localStorage', {
        value: new LocalStorageMock(),
        writable: true,
      });
      localStorage = window.localStorage;
      spyOn(localStorage, 'setItem').and.callThrough();

      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          service = TestBed.inject(AppUserService);
        });
    }),
  );

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('local storage mock should work correctly', () => {
    expect(localStorage.getItem('test')).toBeUndefined();

    localStorage.setItem('test', 'some value');
    expect(localStorage.getItem('test')).toEqual('some value');

    localStorage.removeItem('test');
    expect(localStorage.getItem('test')).toBeUndefined();
  });

  it(
    'saveUser should update AppUserService private model',
    waitForAsync(async () => {
      let user = await service.user$.toPromise();
      expect(user.name).toEqual('');
      service.saveUser({ name: 'test' });
      user = await service.user$.toPromise();
      expect(user.name).toEqual('test');

      expect(user.email).toEqual('');
      service.saveUser({ email: 'test' });
      user = await service.user$.toPromise();
      expect(user.email).toEqual('test');

      expect(user.organization).toEqual('');
      service.saveUser({ organization: 'test' });
      user = await service.user$.toPromise();
      expect(user.organization).toEqual('test');

      expect(user.token).toEqual('');
      service.saveUser({ token: 'sample' });
      user = await service.user$.toPromise();
      expect(user.token).toEqual('sample');
    }),
  );

  it(
    'resetUser should reset private model and local storage',
    waitForAsync(async () => {
      service.resetUser();
      const user = await service.user$.toPromise();
      expect(user).toEqual(
        jasmine.objectContaining({
          name: '',
          email: '',
          organization: '',
          token: '',
        }),
      );
    }),
  );

  it(
    'restoreUser should restore user model from local storage if it exists',
    waitForAsync(async () => {
      let user = await service.user$.toPromise();
      expect(user).toEqual(
        jasmine.objectContaining({
          name: '',
          email: '',
          organization: '',
          token: '',
        }),
      );
      localStorage.setItem(
        'userService',
        JSON.stringify({
          name: 'name',
          email: 'email',
          organization: 'org',
          token: 'token',
        }),
      );
      service.restoreUser();
      user = await service.user$.toPromise();
      expect(user).toEqual(
        jasmine.objectContaining({
          name: 'name',
          email: 'email',
          organization: 'org',
          token: 'token',
        }),
      );
    }),
  );
});
