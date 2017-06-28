import { Pipe, PipeTransform } from '@angular/core';

import markdown from 'markdown-js';


@Pipe({ name: 'diaryMarkdown' })
export class MarkdownPipe implements PipeTransform {
  transform(textAsMarkdown: string) {
    return markdown.makeHtml(textAsMarkdown);
  }
}
