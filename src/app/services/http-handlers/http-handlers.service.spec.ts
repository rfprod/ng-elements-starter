import { HttpErrorResponse } from '@angular/common/http';
import { async, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { HttpHandlersService } from './http-handlers.service';

describe('HttpHandlersService', () => {
  let service: HttpHandlersService;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({});
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(HttpHandlersService);
      });
  }));

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have variables and methods defined', () => {
    expect(service.isLocalhost).toEqual(jasmine.any(Function));
    expect(service.apiBaseUrl).toEqual(jasmine.any(Function));
    expect(service.defaultHttpTimeout).toEqual(jasmine.any(Number));
    expect(service.handleError).toEqual(jasmine.any(Function));
    expect(service.pipeHttpRequest).toEqual(jasmine.any(Function));
  });

  describe('handleError', () => {
    it('should handle errors properly #1', async(() => {
      const errRes = new HttpErrorResponse({
        status: 400,
        statusText: 'error status text',
      });

      service
        .handleError(errRes)
        .toPromise()
        .then(
          () => true,
          (error: string) => {
            expect(error).toEqual(service.getErrorMessage(errRes));
          },
        );
    }));

    it('should handle errors properly #2', async(() => {
      const errRes = new HttpErrorResponse({});
      service
        .handleError(errRes)
        .toPromise()
        .then(
          () => true,
          (error: string) => {
            expect(error).toEqual(service.getErrorMessage(errRes));
          },
        );
    }));
  });
});
