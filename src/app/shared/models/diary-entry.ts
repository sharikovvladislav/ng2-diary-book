import { Tag } from './tag';

export interface DiaryEntry {
  $key?: string;
  id?: number;
  createDate?: {};
  date: {};
  tags?: Tag[];
  message: string;
}
