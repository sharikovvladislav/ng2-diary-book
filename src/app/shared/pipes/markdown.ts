import { Pipe, PipeTransform } from '@angular/core';

import markdown from 'markdown-js';

@Pipe({ name: 'diaryMarkdown' })
export class MarkdownPipe implements PipeTransform {
  transform(textAsMarkdown: string) {
    // TODO here is the problem, in test environment markdown is undefined
    console.log('markdown in MarkdownPipe', markdown);
    return markdown.makeHtml(textAsMarkdown);
  }
}
