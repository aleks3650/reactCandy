import { useEffect, useState } from "react";

const Board = () => {
  const width = 8;
  const CandyColors = [
    "blue",
    "red",
    "orange",
    "purple",
    "green",
    "darkred",
    
  ];
  const [GameBoard, SetGameBoard] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)

  function CreateBoard() {
    const TemporaryBoard = [];
    for (let i = 1; i <= width * width; i++) {
      let TemporaryCandy = Math.floor(CandyColors.length * Math.random());
      TemporaryBoard.push(TemporaryCandy);
    }
    SetGameBoard(TemporaryBoard);
  }

  function CheckThreeRow() {
    
    for (let i=0; i<= width * width - 1; i++){
        const RightEdge = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63]
        if(RightEdge.includes(i)) continue
        if(GameBoard[i] === GameBoard[i + 1] && GameBoard[i] === GameBoard[i + 2]){
            GameBoard[i] = null;
            GameBoard[i + 1] = null;
            GameBoard[i + 2] = null;
        }
    } 
  }

  function CheckFourRow() {
    
    for (let i=0; i<= width * width - 1; i++){
        const RightEdge = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63, 5,13,21,29,37,45,53,61]
        if(RightEdge.includes(i)) continue
        if(GameBoard[i] === GameBoard[i + 1] && GameBoard[i] === GameBoard[i + 2] && GameBoard[i] === GameBoard[i + 3]){
            GameBoard[i] = null;
            GameBoard[i + 1] = null;
            GameBoard[i + 2] = null;
            GameBoard[i + 3] = null;
        }
    } 
  }

  function CheckThreeColumn() {
    for (let i = 0; i <= width * (width - 3); i++) {
      if (
        GameBoard[i] === GameBoard[i + width] &&
        GameBoard[i] === GameBoard[i + 2 * width]
      ) {
        GameBoard[i] = null;
        GameBoard[i + width] = null;
        GameBoard[i + width * 2] = null;
      }
    }
  }

  function CheckFourColumn() {
    for (let i = 0; i <= width * (width - 4); i++) {
      if (
        GameBoard[i] === GameBoard[i + width] &&
        GameBoard[i] === GameBoard[i + 2 * width] &&
        GameBoard[i] === GameBoard[i + 3 * width]
      ) {
        GameBoard[i] = null;
        GameBoard[i + width] = null;
        GameBoard[i + width * 2] = null;
        GameBoard[i + width * 3] = null;
      }
    }
  }

  function MoveBelow() {
    for (let i = 0; i <= width * (width - 1); i++) {
      if (i < width && GameBoard[i] === null) {
        let TemporaryCandy = Math.floor(CandyColors.length * Math.random());
        GameBoard[i] = TemporaryCandy;
      }
      if (GameBoard[i + width] === null && i < width * (width - 1)) {
        GameBoard[i + width] = GameBoard[i];
        GameBoard[i] = null;
      }
    }
  }

  const dragStart = (e) => {
    setSquareBeingDragged(e.target)
}
const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
}

  function dragEnd(){
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
    const validMoves = [
        squareBeingDraggedId - 1,
        squareBeingDraggedId - width,
        squareBeingDraggedId + 1,
        squareBeingDraggedId + width
    ]
    const validMove = validMoves.includes(squareBeingReplacedId)
    if(validMove){
        const newGameBoard = [...GameBoard];
        newGameBoard[squareBeingReplacedId] = GameBoard[squareBeingDraggedId];
        newGameBoard[squareBeingDraggedId] = GameBoard[squareBeingReplacedId];
        SetGameBoard(newGameBoard);
    }
  }

  useEffect(() => {
    CreateBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      CheckFourColumn();
      CheckFourRow()
      CheckThreeColumn();
      CheckThreeRow()
      MoveBelow();
      SetGameBoard([...GameBoard]);
    }, 400); 
    return () => clearInterval(timer);
  }, [GameBoard]);

  return (
    <>
      {GameBoard.map((candy, index) => (
        <div
          key={index}
          className={`Block ${candy}`}
          data-id={index}
          draggable={true}
          onDragStart={dragStart}
          onDragEnter={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={dragDrop}
          onDragLeave={(e) => e.preventDefault()}
          onDragEnd={dragEnd}
          style={{
            backgroundColor: CandyColors[candy],
          }}
        >
          {index}
        </div>
      ))}
    </>
  );
};

export default Board;
