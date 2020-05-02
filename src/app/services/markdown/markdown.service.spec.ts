import { async, TestBed } from '@angular/core/testing';

import { MarkdownService } from './markdown.service';

describe('MarkdownService', () => {
  let service: MarkdownService;

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      providers: [
        {
          provide: MarkdownService,
          useFactory: () => new MarkdownService(),
          deps: [],
        },
      ],
    })
      .compileComponents()
      .then(() => {
        service = TestBed.inject(MarkdownService);
      });
  }));

  it('should exist', () => {
    expect(service).toBeTruthy();
    expect(service.process).toEqual(jasmine.any(Function));
  });
});
