import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GoogleBooksService } from './google-books';

describe('Service: GoogleBooks', () => {
  let service: GoogleBooksService = null;
  let httpMock: HttpTestingController = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        GoogleBooksService,
      ]
    });
  });

  beforeEach(inject([
    GoogleBooksService,
    HttpTestingController], (
      googleBooksService: GoogleBooksService,
      _httpMock: HttpTestingController
  ) => {
    service = googleBooksService;
    httpMock = _httpMock;
  }));

  const data = {
    'title': 'Book Title',
    'author': 'John Smith',
    'volumeId': '12345'
  };

  const books = {
    items: [
      {id: '12345', volumeInfo: {title: 'Title'}},
      {id: '67890', volumeInfo: {title: 'Another Title'}}
    ]
  };

  const queryTitle = 'Book Title';

  it('should call the search api and return the search results', (done) => {
    service
      .searchBooks(queryTitle)
      .subscribe((res) => {
        expect(res).toEqual(books);
        done();
      });

    const req = httpMock.expectOne(`https://www.googleapis.com/books/v1/volumes?q=${queryTitle}`);

    expect(req.request.method).toEqual('GET');
    req.flush(books);

    httpMock.verify();
  });

  it('should retrieve the book from the volumeId', (done) => {
    service
      .retrieveBook(queryTitle)
      .subscribe((response) => {
        expect(response).toEqual(data);
        done();
      });

    const req = httpMock.expectOne(`https://www.googleapis.com/books/v1/volumes/${queryTitle}`);

    expect(req.request.method).toEqual('GET');
    req.flush(data);

    httpMock.verify();
  });

});
