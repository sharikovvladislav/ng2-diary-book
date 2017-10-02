import { Tag } from './tag';

export interface DiaryEntrySet {
  $key?: string;
  id?: number;
  createDate: string | {};
  date: string;
  message: string;
  tags: Tag[];
}
