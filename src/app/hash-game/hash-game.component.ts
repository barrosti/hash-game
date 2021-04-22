import { Component, OnInit } from '@angular/core';

import { HashGameService } from './shared';

@Component({
  selector: 'app-hash-game',
  templateUrl: './hash-game.component.html',
  styleUrls: ['./hash-game.component.css']
})
export class HashGameComponent implements OnInit {

  constructor(private hashGameService: HashGameService) { }

  ngOnInit(): void {
  	this.hashGameService.initialize();
  }

  get showStart(): boolean {
  	return this.hashGameService.showStart;
  }

  get showBoard(): boolean {
  	return this.hashGameService.showBoard;
  }

  get showFinal(): boolean {
  	return this.hashGameService.showFinal;
  }

  startGame(): void {
  	return this.hashGameService.startGame();
  }

  peformMove(posX: number, posY: number): void {
  	return this.hashGameService.peformMove(posX, posY);
  }

  showX(posX: number, posY: number): boolean {
  	return this.hashGameService.showX(posX, posY);
  }

  showO(posX: number, posY: number): boolean {
  	return this.hashGameService.showO(posX, posY);
  }

  displayWinner(posX: number, posY: number): boolean {
  	return this.hashGameService.displayWinner(posX, posY);
  }

  get player(): number {
  	return this.hashGameService.player;
  }

  newGame(): void {
  	return this.hashGameService.newGame();
  }

}
