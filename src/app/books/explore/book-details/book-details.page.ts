import { Component, OnInit } from '@angular/core';
import { IonTitle, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { Book } from '../../book.model';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
  standalone: false,
})
export class BookDetailsPage implements OnInit {
  book: Book = {
    id: 'q1',
    author: 'J.K. Rowling',
    title: 'Harry Potter',
    genre: 'fantasy',
    imageUrl:
      'https://mybookshelf.com.ua/assets/images/products/11079/small/the-bfg.webp',
  };
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.book = this.booksService.getBook(paramMap.get('bookId')!)!;
    });
  }
}
