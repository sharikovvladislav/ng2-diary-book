import { DiaryEntrySet } from '../models/diary-entry-set';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DiaryProcessorService {
  prepareForServerProcess(diaryToSave: DiaryEntrySet) {
    const diaryToSaveCopy = { ...diaryToSave };

    delete diaryToSaveCopy.$key;

    return {
      ...diaryToSaveCopy,
      createDate: moment().toISOString(),
      date: moment(diaryToSave.date).format('YYYY-MM-DD')
    };
  }
}
