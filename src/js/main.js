console.log('js:loaded')

// const boardEl = document.querySelector('board')

class Board {

  constructor() {
    this.squares = []
    //maybe make this static
    this.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    this.ranks = [8, 7, 6, 5, 4, 3, 2, 1]
  }
  makeBoard() {
    let currColor = true
    for (let rank of this.ranks) {
      for (let file of this.files) {
        this.squares.push(new Square(file, rank, currColor))
        currColor = !currColor
      }
      //toggle starting color of each rank
      currColor = !currColor
    }
  }
  toggleSquareColor() {
    toggleColor ? 'dark' : 'light'
  }
  drawBoard() {
    const boardRanks = [[]]
    let currFile = 0
    let count = 0
    for (let square in this.squares) {

      boardRanks[currFile].push(this.squares[square])
      count++
      if (count === this.files.length) {
        currFile !== this.files.length ? boardRanks.push([]) : null
        currFile++
        count = 0
      }
    }
    //TODO: Possible bug adding empty array at idx 0.
    //TODO: Possible bug drawing board ranks in reverse order
    boardRanks.reverse()

    //temporary console.log board
    return boardRanks;
  }
  domDrawBoard() {
    const boardEl = document.querySelector('.board')
    boardEl.replaceChildren()
    this.squares.forEach(sq => {
      const square = document.createElement("div");
      // const pieceName = document.createTextNode(sq.piece ? sq.piece.name : `${sq.file}${sq.rank}`);
      const pieceName = document.createTextNode(sq.piece ? sq.piece.name : '');
      square.appendChild(pieceName)
      square.classList.add(sq.color === 'light' ? 'light-square' : 'dark-square')
      boardEl.appendChild(square)
      boardEl.classList.add()
    });
    // boardEl.replaceChildren(domSquares)
  }

  //temp method to draw board in console.
  consoleDrawBoard() {
    let localRank = ''
    const drawnBoard = []
    const consoleBoard = this.drawBoard()
    for (let i = 0; i < consoleBoard.length; i++) {
      localRank = ''
      for (let j = 0; j < consoleBoard[i].length; j++) {
        let localSq = consoleBoard[i][j]
        // localRank += `| ${localSq.rank}${localSq.file} `
        // localSq.piece ? localRank += `|${localSq.piece.name} ` : localRank += `|${localSq.file}${localSq.rank}`
        localSq.piece ? localRank += `|${localSq.piece.name} ` : localRank += `|__`
      }
      if (localRank) drawnBoard.push(localRank)

    }
    console.log(drawnBoard)
  }
}

class Square {
  constructor(file, rank, color, piece) {
    this.file = file
    this.rank = rank
    this.color = color ? 'light' : 'dark'
    this.piece = piece ? piece : null
  }
}

class Piece {
  constructor(color) {
    // canMove
    // canCapture
    // canPromote

    this.color = color

  }
}

class Pawn extends Piece {
  constructor(color) {
    super(color)
    this.type = 'pawn'
    this.name = color === 'white' ? 'P' : 'p'
    this.movementRange = 2
  }
  move() {
    //moving a pawn restricts its range to 1 for rest of game.
    this.movementRange = 1
    console.log(`moving: ${this.name} to square`)
  }
}

class Knight extends Piece {
  constructor(color) {
    super(color)
    this.type = 'knight'
    this.name = color === 'white' ? 'N' : 'n'
  }
  move() {
    console.log(`moving: ${this.name} to square`)
  }
}
class King extends Piece {
  constructor(color) {
    super(color)
    this.type = 'king'
    this.name = color === 'white' ? 'K' : 'k'
  }
  move() {
    console.log(`moving: ${this.name} to square`)
  }
}

class Queen extends Piece {
  constructor(color) {
    super(color)
    this.type = 'queen'
    this.name = color === 'white' ? 'Q' : 'q'
  }
  move() {
    console.log(`moving: ${this.name} to square`)
  }
}
class Rook extends Piece {
  constructor(color) {
    super(color)
    this.type = 'rook'
    this.name = color === 'white' ? 'R' : 'r'
  }
  move() {
    console.log(`moving: ${this.name} to square`)
  }
}

class Bishop extends Piece {
  constructor(color) {
    super(color)
    this.type = 'bishop'
    this.name = color === 'white' ? 'B' : 'b'
  }
  move() {
    console.log(`moving: ${this.name} to square`)
  }
}

//DOM
let sourceInput = document.getElementById("source");
let destinationInput = document.getElementById("destination");
let source
let destination
const moveBtnEl = document.querySelector('.submit-move')
moveBtnEl.addEventListener('click', e => {
  e.preventDefault()
  source = sourceInput.value
  destination = destinationInput.value
  let src = sqaureIndex(source)
  console.log(src)
  let dst = sqaureIndex(destination)
  playerMove(src, dst)
  updatePieceSquare(src, dst)
  consolePlay()
})

function playerMove(src, dst) {
  //check if player turn
  //check for check
  //check for checkmate
  //check for stalemate
  //check for draw
  //check for piece on square
  //calculate movement
  console.log(`moving ${src} to ${dst}`)
  console.log(`moving ${board.squares[src].piece.name} to ${board.squares[dst].file}${board.squares[dst].rank}`)
}

//takes a src,dst. Moves piece to dst, removes from src.
function updatePieceSquare(src, dst) {
  board.squares[dst].piece = board.squares[src].piece
  board.squares[src].piece.move(src, dst)
  board.squares[src].piece = null
}

// takes a square a1-h8 and converts it to square index
function sqaureIndex(square) {
  let file = square.slice(0, 1)
  let rank = parseInt(square.slice(1, 2))
  let sq = board.squares.filter(sq => sq.file === file).filter(sq => sq.rank === rank)
  let squareIndex = board.squares.findIndex(square => square === sq[0])
  return squareIndex
}


function init() {
  populateBoard()
  consolePlay()
}

function consolePlay() {
  board.drawBoard()
  board.domDrawBoard()
  board.consoleDrawBoard()
}

const board = new Board()
board.makeBoard()




// // Console pawn test
// //add piece to e2 (pawn)
// board.squares[12].piece = new Pawn('white')
// board.squares[52].piece = new Knight('black')

// //move pawn to e4! best by test.
// consolePlay()

// //player clicks e2 and clicks e4

// //check if square ahead is occupied
// if (!board.squares[20].piece) console.log(`path clear for pawn on ${board.squares[12 + 8].file}${board.squares[12 + 8].rank} `)
// //check if destination square is occupied
// if (!board.squares[28].piece) console.log(`path clear for pawn on ${board.squares[12 + 8 + 8].file}${board.squares[12 + 8 + 8].rank} `)
//move the pawn to e4
// board.squares[28].piece = board.squares[12].piece

// //set pawn hasMoved() to true, limiting is movement range to 1 square.
// board.squares[12].piece.move()

// //remove the pawn from e2
// board.squares[12].piece = null
// consolePlay()


// //knights can move to any square without being blocked
// board.squares[37].piece = board.squares[52].piece
// board.squares[52].piece.move()
// board.squares[52].piece = null

// consolePlay()

// //check if pawn can advance forward
// if (!board.squares[28 + 8].piece) console.log(`path clear for pawn on ${board.squares[28 + 8].file}${board.squares[28 + 8].rank} `)

// //check if pawn can capture

// if (board.squares[28 + 7].piece) console.log(`Capture detected! ${board.squares[28 + 7].file}${board.squares[28 + 7].rank} `)
// if (board.squares[28 + 9].piece) console.log(`Capture detected! ${board.squares[28 + 9].file}${board.squares[28 + 9].rank} `)

// consolePlay()

// //if capture is detected, the move is legal
// board.squares[37].piece = board.squares[28].piece
// board.squares[28].piece = null
// console.log('Pawn captures Knight on f5')
// consolePlay()







//////////////////////////////////////////////////////////
// TODO: Make init function
init()
// 




//TODO: Refactor
function populateBoard() {
  board.squares[0].piece = new Rook('black')
  board.squares[1].piece = new Knight('black')
  board.squares[2].piece = new Bishop('black')
  board.squares[3].piece = new Queen('black')
  board.squares[4].piece = new King('black')
  board.squares[5].piece = new Bishop('black')
  board.squares[6].piece = new Knight('black')
  board.squares[7].piece = new Rook('black')
  board.squares[8].piece = new Pawn('black')
  board.squares[9].piece = new Pawn('black')
  board.squares[10].piece = new Pawn('black')
  board.squares[11].piece = new Pawn('black')
  board.squares[12].piece = new Pawn('black')
  board.squares[13].piece = new Pawn('black')
  board.squares[14].piece = new Pawn('black')
  board.squares[15].piece = new Pawn('black')
  board.squares[56].piece = new Rook('white')
  board.squares[57].piece = new Knight('white')
  board.squares[58].piece = new Bishop('white')
  board.squares[59].piece = new Queen('white')
  board.squares[60].piece = new King('white')
  board.squares[61].piece = new Bishop('white')
  board.squares[62].piece = new Knight('white')
  board.squares[63].piece = new Rook('white')
  board.squares[55].piece = new Pawn('white')
  board.squares[54].piece = new Pawn('white')
  board.squares[53].piece = new Pawn('white')
  board.squares[52].piece = new Pawn('white')
  board.squares[51].piece = new Pawn('white')
  board.squares[50].piece = new Pawn('white')
  board.squares[48].piece = new Pawn('white')
  board.squares[49].piece = new Pawn('white')
}