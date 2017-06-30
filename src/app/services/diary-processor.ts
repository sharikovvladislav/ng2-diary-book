import { DiaryEntrySet } from '../models/diary-entry-set';
import { Injectable } from '@angular/core';

@Injectable()
export class DiaryProcessorService {
  prepareForSave(diaryToSave: DiaryEntrySet) {
    const tmpDiary = { ...diaryToSave };

    delete tmpDiary.$key;

    return tmpDiary;
  }
}
