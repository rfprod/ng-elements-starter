import { TestBed, async } from '@angular/core/testing';

import { UserService } from './user.service';

import { LocalStorageMock } from '../../mocks/utils/local-storage.mock';

describe('UserService', () => {

  let service: UserService;
  let localStorage: LocalStorageMock;

  beforeEach(async(() => {
    Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock(), writable: true});
    localStorage = window.localStorage;
    spyOn(localStorage, 'setItem').and.callThrough();

    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ ],
      providers: [ UserService ],
      schemas: [ ],
    }).compileComponents().then(() => {
      service = TestBed.get(UserService) as UserService;
    });
  }));

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('local storage mock should work correctly', () => {
    expect(localStorage.getItem('test')).toBeUndefined();
    expect(localStorage['test']).toBeUndefined();

    localStorage.setItem('test', 'some value');
    expect(localStorage.getItem('test')).toEqual('some value');
    expect(localStorage['test']).toEqual('some value');

    localStorage.removeItem('test');
    expect(localStorage.getItem('test')).toBeUndefined();
    expect(localStorage['test']).toBeUndefined();
  });

  it('should have variables and methods defined', () => {
    /*
    expect(service.model).toEqual(jasmine.objectContaining({
      name: '',
      email: '',
      organization: '',
      token: ''
    }));
    expect(service.modelKeys).toEqual(jasmine.any(Object));
    expect(service.initializeModel).toEqual(jasmine.any(Function));
    */
    expect(service.getUser).toEqual(jasmine.any(Function));
    expect(service.SaveUser).toEqual(jasmine.any(Function));
    expect(service.RestoreUser).toEqual(jasmine.any(Function));
    expect(service.ResetUser).toEqual(jasmine.any(Function));
  });

  it('getUser method should return a private model', () => {
    expect(service.getUser()).toEqual(jasmine.any(Object));
    expect(service.getUser()).toEqual(jasmine.objectContaining({
      name: '',
      email: '',
      organization: '',
      token: ''
    }));
  });

  it('SaveUser should update UserService private model', () => {
    expect(service.getUser().name).toEqual('');
    service.SaveUser({ name: 'test' });
    expect(service.getUser().name).toEqual('test');

    expect(service.getUser().email).toEqual('');
    service.SaveUser({ email: 'test' });
    expect(service.getUser().email).toEqual('test');

    expect(service.getUser().organization).toEqual('');
    service.SaveUser({ organization: 'test' });
    expect(service.getUser().organization).toEqual('test');

    expect(service.getUser().token).toEqual('');
    service.SaveUser({ token: 'sample' });
    expect(service.getUser().token).toEqual('sample');

  });

  it('ResetUser should reset private model and local storage', () => {
    service.ResetUser();
    expect(service.getUser()).toEqual(jasmine.objectContaining({
      name: '',
      email: '',
      organization: '',
      token: ''
    }));
  });

  it('RestoreUser should restore user model from local storage if it exists', () => {
    expect(service.getUser()).toEqual(jasmine.objectContaining({
      name: '',
      email: '',
      organization: '',
      token: ''
    }));
    localStorage.setItem('userService', JSON.stringify({
      name: 'name',
      email: 'email',
      organization: 'org',
      token: 'token'
    }));
    service.RestoreUser();
    expect(service.getUser()).toEqual(jasmine.objectContaining({
      name: 'name',
      email: 'email',
      organization: 'org',
      token: 'token'
    }));
  });

});
