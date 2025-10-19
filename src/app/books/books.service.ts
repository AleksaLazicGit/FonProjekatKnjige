import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, concat, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

interface BookData {
  author: string;
  title: string;
  genre: string;
  imageUrl: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  // private _books: Book[] = [];
  private _books = new BehaviorSubject<Book[]>([]);
  constructor(private http: HttpClient, private authService: AuthService) {}

  get books() {
    return this._books.asObservable();
  }
  // books: Book[] = [
  //   {
  //     id: 'q1',
  //     author: 'J.K. Rowling',
  //     title: 'Harry Potter',
  //     genre: 'fantasy',
  //     imageUrl:
  //       'https://mybookshelf.com.ua/assets/images/products/11079/small/the-bfg.webp',
  //   },

  //   {
  //     id: 'q2',
  //     author: 'Tolstoy',
  //     title: 'War and Peace',
  //     genre: 'classic',
  //     imageUrl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKLK_udK0I7Pjnom3QdpikNIBorrFF8P67TGYbD2Lw5QbH_qUt5C624ryG3XYksAuw9zI&usqp=CAU',
  //   },
  // ];

  //Add a book
  addBook(author: string, title: string, genre: string) {
    let generatedId: string;
    const userId: string = this.authService.getUserId()!;
    return this.http
      .post<{ name: string }>(
        `https://knjige-8c1a5-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${this.authService.getToken()}`,
        {
          author,
          title,
          genre,
          userId,
          imageUrl:
            'https://image.freepik.com/free-vector/carpe-diem-flowers_83277-1509.jpg',
        }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this._books;
        }),
        take(1),
        tap((books) => {
          this._books.next(
            books.concat({
              id: generatedId,
              author,
              title,
              genre,
              userId,
              imageUrl:
                'https://knjige-8c1a5-default-rtdb.europe-west1.firebasedatabase.app/books.json',
            })
          );
        })
      );
  }

  //Get books
  getBooks() {
    return this.http
      .get<{ [key: string]: BookData }>(
        `https://knjige-8c1a5-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${this.authService.getToken()}`
      )
      .pipe(
        map((booksData) => {
          const books: Book[] = [];

          for (const key in booksData) {
            if (booksData.hasOwnProperty(key)) {
              books.push({
                id: key,
                author: booksData[key].author,
                title: booksData[key].title,
                genre: booksData[key].genre,
                userId: booksData[key].userId,
                imageUrl:
                  'https://mybookshelf.com.ua/assets/images/products/11079/small/the-bfg.webp',
              });
            }
          }

          return books;
        }),
        tap((books) => {
          this._books.next(books);
        })
      );
  }

  deleteBook(id: string) {
    return this.http
      .delete(
        `https://knjige-8c1a5-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json?auth=${this.authService.getToken()}`
      )
      .pipe(
        switchMap(() => {
          return this.books;
        }),
        take(1),
        tap((books) => {
          this._books.next(books.filter((q) => q.id !== id));
        })
      );
  }

  getBook(id: string) {
    return this.http
      .get<BookData>(
        `https://knjige-8c1a5-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json?auth=${this.authService.getToken()}`
      )
      .pipe(
        map((resData) => {
          console.log(resData);
          return {
            id,
            author: resData.author,
            title: resData.title,
            genre: resData.genre,
            userId: resData.userId,
            imageUrl: resData.imageUrl,
          };
        })
      );
  }

  editBook(
    id: string,
    author: string,
    title: string,
    genre: string,
    imageUrl: string | null,
    userId: string
  ) {
    return this.http
      .put(
        `https://knjige-8c1a5-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json?auth=${this.authService.getToken()}`,
        { author, title, genre, imageUrl, userId }
      )
      .pipe(
        switchMap(() => this.books),
        take(1),
        tap((books) => {
          const updatedBookIndex = books.findIndex((q) => q.id === id);
          const updatedBooks = [...books];
          updatedBooks[updatedBookIndex] = {
            id,
            author,
            title,
            genre,
            imageUrl,
            userId,
          };
          this._books.next(updatedBooks);
        })
      );
  }

  // getBook(id: string) {
  //   return this.books.find((b) => b.id === id);
  // }
}
