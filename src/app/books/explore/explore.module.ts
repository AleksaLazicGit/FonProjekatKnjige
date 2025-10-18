import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { BookElementComponent } from '../book-element/book-element.component';
import { BookModalComponent } from '../book-modal/book-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExplorePageRoutingModule],
  declarations: [ExplorePage, BookElementComponent, BookModalComponent],
})
export class ExplorePageModule {}
