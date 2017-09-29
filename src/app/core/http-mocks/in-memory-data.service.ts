import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tags = [
      { id: 1, name: 'здоровье', description: '' },
      { id: 2, name: 'хобби', description: '' },
      { id: 3, name: 'angular', description: '' },
      { id: 4, name: 'работа', description: '' },
      { id: 5, name: '52недели', description: '' },
      { id: 6, name: 'спина', description: '' },
      { id: 7, name: 'секс', description: '' },
    ];
    return {
      tags,
    };
  }
}
