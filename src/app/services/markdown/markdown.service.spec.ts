import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppMarkdownService } from './markdown.service';

describe('AppMarkdownService', () => {
  let service: AppMarkdownService;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule({
        providers: [
          {
            provide: AppMarkdownService,
            useFactory: () => new AppMarkdownService(),
            deps: [],
          },
        ],
      })
        .compileComponents()
        .then(() => {
          service = TestBed.inject(AppMarkdownService);
        });
    }),
  );

  it('should exist', () => {
    expect(service).toBeTruthy();
    expect(service.process).toEqual(jasmine.any(Function));
  });
});
