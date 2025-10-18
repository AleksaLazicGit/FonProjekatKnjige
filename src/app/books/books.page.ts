import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
  standalone: false,
})
export class BooksPage implements OnInit {
  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {}

  openMenu() {
    this.menuCtrl.open();
  }
}
