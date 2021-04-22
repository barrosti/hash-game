import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HashGameComponent } from './hash-game.component';
import { HashGameService } from './shared';



@NgModule({
  declarations: [HashGameComponent],
  imports: [
    CommonModule
  ],
  exports: [
  	HashGameComponent
  ],
  providers: [
  	HashGameService
  ]
})
export class HashGameModule { }
