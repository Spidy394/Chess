import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./Messages.js";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  private startTime: Date;
  private moveCount = 0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }

  makeMove(
    socket: WebSocket,
    move: {
      from: string;
      to: string;
    }
  ) {
    if (this.moveCount % 2 === 0 && socket !== this.player1) {
      console.log("early return1");

      return;
    }

    if (this.moveCount % 2 === 1 && socket !== this.player2) {
      console.log("early return2");

      return;
    }

    console.log("did not early return");

    try {
      this.board.move(move);
    } catch (e) {
      return;
    }

    if (this.board.isGameOver()) {
      this.player1.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      return;
    }

    console.log("move succeeded");

    console.log(this.moveCount % 2 === 0);

    if (this.moveCount % 2 === 0) {
      console.log("sent1");

      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      console.log("sent1");

      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }

    this.moveCount++;
  }
}
