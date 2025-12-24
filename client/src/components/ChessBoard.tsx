import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/Game";

const ChessBoard = ({ board, socket, setBoard, chess }: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: any;
  chess: any;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);


  return (
    <div className="text-black">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = String.fromCharCode(97 + (j%8)) + "" + (8 - i) as Square;
              return (
                <div
                  onClick={() => {
                    if(!from){
                      setFrom(squareRepresentation);
                    } else {
                      socket.send(JSON.stringify({
                        type: MOVE,
                        payload: {
                          move: {
                            from,
                            to: squareRepresentation
                          }
                        }
                      }))
                      setFrom(null)
                      chess.move({
                        from,
                        to: squareRepresentation
                      });
                      setBoard(chess.board())
                      console.log({
                        from,
                        to: squareRepresentation
                      });
                      
                    }
                  }}
                  key={j}
                  className={`size-16 ${
                    (i + j) % 2 === 0 ? "bg-[#EEEED2]" : "bg-[#769656]"
                  }`}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col">
                      {square ? <img className="size-11" src={`/${square?.color === 'b' ? square?.type : `${square?.type?.toUpperCase()}_w`}.svg`} /> : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
