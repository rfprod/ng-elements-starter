import { TestBed, async } from '@angular/core/testing';
import { MarkdownService } from './markdown.service';

// tslint:disable-next-line: no-unused-declaration
declare let marked;

describe('MarkdownService', () => {
  marked = (input: string) => input;

  let service: MarkdownService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
