import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { ModalController } from '@ionic/angular';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: false,
})
export class ExplorePage implements OnInit, OnDestroy {
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

  books: Book[];
  private bookSub: Subscription = new Subscription();
  constructor(
    private menuCtrl: MenuController,
    private bookService: BooksService,
    private modalCtrl: ModalController
  ) {
    this.books = [];
  }
  ngOnDestroy(): void {
    if (this.bookSub) {
      this.bookSub.unsubscribe();
    }
  }

  openMenu() {
    this.menuCtrl.open();
  }

  ngOnInit() {
    this.bookSub = this.bookService.books.subscribe((books) => {
      this.books = books;
      // const books: Book[] = [];

      // for (const key in booksData) {
      //   if (booksData.hasOwnProperty(key)) {
      //     books.push({
      //       id: key,
      //       author: booksData[key].author,
      //       title: booksData[key].title,
      //       genre: booksData[key].genre,
      //       imageUrl:
      //         'https://mybookshelf.com.ua/assets/images/products/11079/small/the-bfg.webp',
      //     });
      //   }
      // }
    });
  }

  ionViewWillEnter() {
    this.bookService.getBooks().subscribe((books) => {
      // this.books = books;
    });
  }

  openModal() {
    // const modal= await this.modalCtrl.create({
    //   component: BookModalComponent,
    // });
    // modal.present();
    this.modalCtrl
      .create({
        component: BookModalComponent,
        componentProps: { title: 'Add a book' },
      })
      .then((modal) => {
        console.log('modal works');
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          console.log(resultData);
          this.bookService
            .addBook(
              resultData.data.bookData.author,
              resultData.data.bookData.title,
              resultData.data.bookData.genre
            )
            .subscribe((books) => {
              // this.books = books;
            });
        }
      });
  }
}
