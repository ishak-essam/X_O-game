import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'XO';
  currentPlayer: string = 'X';
  winner: string = 'None';
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  constructor(public dialog: MatDialog) {}
  ngOnInit() {}

  placeMarker(row: number, col: number): void {
    if (this.winner !== 'None') return; // Prevent placing markers after the game ends

    if (this.board[row][col] === '') {
      this.board[row][col] = this.currentPlayer;
      this.checkWinner();
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    }
  }

  checkWinner(): void {
    const lines = [
      // Rows
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      // Columns
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      // Diagonals
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]],
    ];

    for (let line of lines) {
      if (line.every((mark) => mark === 'X')) {
        this.winner = 'X';
        break;
      } else if (line.every((mark) => mark === 'O')) {
        this.winner = 'O';
        break;
      }
    }
  }
  reset(): void {
    this.currentPlayer = 'X';
    this.winner = 'None';
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }
}
