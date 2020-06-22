import { Injectable } from '@angular/core';
import marked from 'marked';

/**
 * Markdown service.
 * @description Processes string in markdown format, outputs html.
 */
@Injectable({
  providedIn: 'root',
})
export class AppMarkdownService {
  /**
   * Processes markdown input.
   * @param input marked input
   */
  public process(input: string): string {
    return marked(input);
  }
}
