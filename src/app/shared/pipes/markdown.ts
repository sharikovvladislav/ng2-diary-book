import { Pipe, PipeTransform } from '@angular/core';

import markdown from 'markdown-js';

@Pipe({ name: 'diaryMarkdown' })
export class MarkdownPipe implements PipeTransform {
  transform(textAsMarkdown: string) {
    // FIXME try to get why markdown is undefined in test environment
    return textAsMarkdown;
    //  return markdown.makeHtml(textAsMarkdown);
  }
}
