import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Tag } from 'ng2-diary-book-shared-models';

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
      { name: 'пятница' },
      { name: 'программирование' },
      { name: 'мысли' },
      { name: 'орви' },
      { name: 'музыка' },
      { name: 'фильмы' },
      { name: 'завтрак' },
      { name: 'обед' },
      { name: 'ужин' },
      { name: 'growfood' },
      { name: 'java' },
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
