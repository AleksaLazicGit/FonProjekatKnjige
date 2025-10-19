import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IonTitle,
  IonHeader,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { Book } from '../../book.model';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../books.service';
import { Subscription } from 'rxjs';
import { LoadingController, ModalController } from '@ionic/angular';
import { BookModalComponent } from '../../book-modal/book-modal.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
  standalone: false,
})
export class BookDetailsPage implements OnInit, OnDestroy {
  isLoading: boolean = false;
  book: Book = {
    id: 'q1',
    author: 'J.K. Rowling',
    title: 'Harry Potter',
    genre: 'fantasy',
    userId: 'ccc',
    imageUrl:
      'https://mybookshelf.com.ua/assets/images/products/11079/small/the-bfg.webp',
  };

  private bookSub!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      // this.book = this.booksService.getBook(paramMap.get('bookId')!)!;
      if (!paramMap.has('bookId')) {
        this.navCtrl.navigateBack('/books/tabs/explore');
        return;
      }
      this.isLoading = true;
      this.bookSub = this.booksService
        .getBook(paramMap.get('bookId')!)
        .subscribe((book) => {
          this.book = book;
          this.isLoading = false;
        });
    });
  }

  async onDeleteBook() {
    const loading = await this.loadingCtrl.create({ message: 'Deleting...' });
    await loading.present();

    this.booksService.deleteBook(this.book.id).subscribe(async () => {
      await loading.dismiss();
      this.navCtrl.navigateBack('/books/tabs/explore');
    });
  }

  async onEditBook() {
    const modal = await this.modalCtrl.create({
      component: BookModalComponent,
      componentProps: {
        title: 'Edit book',
        author: this.book.author,
        genre: this.book.genre,
        mode: 'edit',
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.booksService
        .editBook(
          this.book.id,
          data.bookData.author,
          data.bookData.title,
          data.bookData.genre,
          this.book.imageUrl,
          this.book.userId
        )
        .subscribe(() => {
          this.book.author = data.bookData.author;
          this.book.title = data.bookData.title;
          this.book.genre = data.bookData.genre;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.bookSub) {
      this.bookSub.unsubscribe();
    }
  }
}
