import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HashGameService {

  private readonly SIZE_BOARD: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly EMPTY: number = 0;

  private board: any;
  private numMovements: number;
  private won: any;

  private _player: number;
  private _showStart: boolean;
  private _showBoard: boolean;
  private _showFinal: boolean;

  constructor() { }

  /**
   * Initializes the game. Sets the home screen display.
   *
   * @return void
   */
  initialize(): void {
    this._showStart = true;
    this._showBoard = false;
    this._showFinal = false;
    this.numMovements = 0;
    this._player = this.X;
    this.won = false;
    this.initializeBoard();
  }

  /**
   * Initializes the game board with EMPTY for all
   * the positions.
   *
   * @return void
   */
  initializeBoard(): void {
    this.board = [this.SIZE_BOARD];
    for (let i = 0; i < this.SIZE_BOARD; i++) {
      this.board[i] = [this.EMPTY, this.EMPTY, this.EMPTY];
    }
  }

  /**
   * Returns whether the start screen should be displayed.
   * 
   * @return boolean
   */
  get showStart(): boolean {
    return this._showStart;
  }

  /**
   * Returns whether the board should be displayed.
   * 
   * @return boolean
   */
  get showBoard(): boolean {
    return this._showBoard;
  }

  /**
   * Returns whether the end of game screen should be displayed.
   * 
   * @return boolean
   */
  get showFinal(): boolean {
    return this._showFinal;
  }

  /**
   * Returns the number of the player to play.
   * 
   * @return number
   */
  get player(): number {
    return this._player;
  }

  /**
   * Show o board.
   *
   * @return void
   */
  startGame(): void {
    this._showStart = false;
    this._showBoard = true;
  }

  /**
   * Performs a move given the coordinates of the board.
   *
   * @param number posX
   * @param number posY
   * @return void
   */
  peformMove(posX: number, posY: number): void {
    // invalid move
    if (this.board[posX][posY] !== this.EMPTY || 
      this.won) {
      return;
    }

    this.board[posX][posY] = this._player;
    this.numMovements++;
    this.won = this.endGame(posX, posY, 
      this.board, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;

    if (!this.won && this.numMovements < 9) {
      this.cpuMovement();
    }

    // check win
    if (this.won !== false) {
      this._showFinal = true;
    }

    // check draw
    if (!this.won && this.numMovements === 9) {
      this._player = 0;
      this._showFinal = true;
    }
  }

  /**
   * Check and returns if the game is over
   *
   * @param number line
   * @param number column
   * @param any board
   * @param number player
   * @return array
   */
  endGame(line: number, column: number, 
      board: any, player: number) {
    let end: any = false;

    // validate line
    if (board[line][0] === player && 
      board[line][1] === player && 
      board[line][2] === player) {
      end = [[line, 0], [line, 1], [line, 2]];
    }

    // validate column
    if (board[0][column] === player && 
      board[1][column] === player && 
      board[2][column] === player) {
      end = [[0, column], [1, column], [2, column]];
    }

    // validates diagonals
    if (board[0][0] === player && 
      board[1][1] === player && 
      board[2][2] === player) {
      end = [[0, 0], [1, 1], [2, 2]];
    }

    if (board[0][2] === player && 
      board[1][1] === player && 
      board[2][0] === player) {
      end = [[0, 2], [1, 1], [2, 0]];
    }

    return end;
  }

  /**
   * Logic to simulate computer play in random mode.
   *
   * @return void
   */
  cpuMovement(): void {
    // checks winning move
    let movement: number[] = this.getMovement(this.O);

    if (movement.length <= 0) {
      // try to play to avoid defeat
      movement = this.getMovement(this.X);
    }

    if (movement.length <= 0) {
      // play random
      let movements: any = [];
      for (let i=0; i<this.SIZE_BOARD; i++) {
        for (let j=0; j<this.SIZE_BOARD; j++) {
          if (this.board[i][j] === this.EMPTY) {
            movements.push([i, j]);
          }
        }
      }
      let k = Math.floor((Math.random() * (movements.length - 1)));
      movement = [movements[k][0], movements[k][1]];
    }

    this.board[movement[0]][movement[1]] = this._player;
    this.numMovements++;
    this.won = this.endGame(movement[0], movement[1],
        this.board, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;
  }

  /**
   * Obtains a valid play for a player's victory.
   *
   * @param number player
   * @return nomber[]
   */
  getMovement(player: number): number[] {
    let tab = this.board;
    for (let lin = 0; lin < this.SIZE_BOARD; lin++) {
      for (let col = 0; col < this.SIZE_BOARD; col++) {
        if (tab[lin][col] !== this.EMPTY) {
          continue;
        }
        tab[lin][col] = player;
        if (this.endGame(lin, col, tab, player)) {
          return [lin, col];
        }
        tab[lin][col] = this.EMPTY;
      }
    }
    return [];
  }

  /**
   * Returns whether part X should be displayed for the
   * coordinates informed.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  showX(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.X;
  }

  /**
   * Returns whether part O should be displayed for the
   * coordinates informed.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  showO(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.O;
  }

  /**
   * Returns whether the victory mark should be displayed for the
   * coordinates informed.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  displayWinner(posX: number, posY: number): boolean {
    let displayWinner: boolean = false;

    if (!this.won) {
      return displayWinner;
    }

    for (let pos of this.won) {
      if (pos[0] === posX && pos[1] === posY) {
        displayWinner = true;
        break;
      }
    }

    return displayWinner;
  }

  /**
   * Initializes a new game, as well as displays the board.
   *
   * @return void
   */
  newGame(): void {
    this.initialize();
    this._showFinal = false;
    this._showStart = false;
    this._showBoard = true;
  }

}
