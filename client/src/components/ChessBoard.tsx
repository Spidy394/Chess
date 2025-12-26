import type { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/Game";

const ChessBoard = ({ board, socket, setBoard, chess }: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: React.Dispatch<React.SetStateAction<typeof board>>;
  chess: Chess;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [selected, setselected] = useState<null | Square>(null);

  return (
    <div className="text-black">
      
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = String.fromCharCode(97 + (j%8)) + "" + (8 - i) as Square;
              const isSelected = selected === squareRepresentation
              return (
                <div
                  onClick={() => {
                    if(!from){
                      setFrom(squareRepresentation);
                      setselected(squareRepresentation)
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
                      setselected(null)
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
                  className={`size-20 relative ${ isSelected ? ((i+j) % 2 === 0 ? "bg-[#b7c0d8]" : "bg-[#9990eb]") : ((i+j) % 2 === 0 ? "bg-[#e8edf9]" : "bg-[#b1a7fc]")}`}
                >
                  {j === 0 && (
                    <div className={`absolute top-1 left-1 font-semibold ${(i+j) % 2 === 0 ? "text-[#b1a7fc]" : "text-[#e8edf9]"}`}>
                      {8 - i}
                    </div>
                  )}

                  {i === 7 && (
                    <div className={`absolute bottom-1 right-1 font-semibold ${(i+j) % 2 === 0 ? "text-[#b1a7fc]" : "text-[#e8edf9]"}`}>
                      {String.fromCharCode(97 + j)}
                    </div>
                  )}
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col">
                      {square ? <img className="size-14" src={`/${square?.color === 'b' ? square?.type : `${square?.type?.toUpperCase()}_w`}.svg`} /> : null}
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
