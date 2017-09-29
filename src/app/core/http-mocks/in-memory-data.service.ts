import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Tag } from '../../shared/models/tag';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tagsSkeleton = [
      { name: 'здоровье' },
      { name: 'хобби' },
      { name: 'angular' },
      { name: 'работа' },
      { name: '52недели' },
      { name: 'спина' },
      { name: 'секс' },
      { name: 'еда' },
      { name: 'пятница', description: 'а' },
      { name: 'программирование' },
      { name: 'мысли', description: '' },
      { name: 'орви', description: '' },
      { name: 'музыка', description: '' },
      { name: 'фильмы', description: '' },
      { name: 'завтрак', description: '' },
      { name: 'обед', description: '' },
      { name: 'ужин', description: '' },
      { name: 'growfood', description: '' },
      { name: 'java', description: '' },
      { name: 'личные-проекты' },
      { name: 'личные-проекты-дневник' },
    ];

    const tags = tagsSkeleton.reduce(
      (acc: string[], tag: Tag) => [
        ...acc,
        { description: '', id: acc.length + 1, ...tag },
      ],
      [],
    );
    return {
      tags,
    };
  }
}
