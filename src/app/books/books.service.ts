import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';

interface BookData {
  author: string;
  title: string;
  genre: string;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}
  books: Book[] = [
    {
      id: 'q1',
      author: 'J.K. Rowling',
      title: 'Harry Potter',
      genre: 'fantasy',
      imageUrl:
        'https://mybookshelf.com.ua/assets/images/products/11079/small/the-bfg.webp',
    },

    {
      id: 'q2',
      author: 'Tolstoy',
      title: 'War and Peace',
      genre: 'classic',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKLK_udK0I7Pjnom3QdpikNIBorrFF8P67TGYbD2Lw5QbH_qUt5C624ryG3XYksAuw9zI&usqp=CAU',
    },
  ];

  //Add a book
  addBook(author: string, title: string, genre: string) {
    return this.http.post<{ name: string }>(
      'https://knjige-8c1a5-default-rtdb.europe-west1.firebasedatabase.app/books.json',
      { author, title, genre }
    );
  }

  //Get books
  getBooks() {
    return this.http.get<{ [key: string]: BookData }>(
      'https://knjige-8c1a5-default-rtdb.europe-west1.firebasedatabase.app/books.json'
    );
  }

  getBook(id: string) {
    return this.books.find((b) => b.id === id);
  }
}
