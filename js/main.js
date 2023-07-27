console.log('js:loaded')

class Board {

  constructor() {
    this.squares = []
    //maybe make this static
    this.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    this.ranks = [8, 7, 6, 5, 4, 3, 2, 1]
    this.diagonals = []
    this.isCheck = false
    this.isCheckmate = false
    this.whiteTurn = true
    this.winner = null
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

  checkCheckmate() {
    let kingsLeft = []
    this.squares.forEach(square => {
      if (square.piece !== null) {
        if (square.piece.type === 'king') {
          kingsLeft.push(square)
        }
      }
    })

    if (kingsLeft.length < 2) {
      this.isCheckmate = true
      this.winner = kingsLeft[0].piece.color
    }

    if (this.isCheckmate) {
      const cmModal = document.querySelector('.modal')
      const cmLabel = document.querySelector('.modal-winner > span')
      const cmMessage = `${this.winner}`
      cmLabel.innerText = cmMessage
      cmModal.classList.add('.checkmate')
      cmLabel.innerText = `${cmMessage}`
      cmModal.setAttribute("style", "display:flex;");
    }
  }
  drawBoard() {
    const boardEl = document.querySelector('.board')
    let src = null
    let dst = null
    let clickCount = 0
    boardEl.addEventListener('click', e => {
      clickCount++
      if (!src && clickCount === 1) {
        src = this.squares[this.squareIndex(e.target.id)]
        if (!src.piece) {
          src = null
          dst = null
          clickCount = 0
        }
      }
      if (src && clickCount === 2) {
        dst = this.squares[this.squareIndex(e.target.id)]
        if (src.piece && dst) {
          if (src.rank === dst.rank && src.file === dst.file) {
            dst = null
          } else {
            this.updatePieceSquare(src, dst)
          }
        }
      }
      if (clickCount > 1) {
        src = null
        dst = null
        clickCount = 0
      }
    });
    boardEl.replaceChildren()


    this.squares.forEach(sq => {
      const square = document.createElement("div");
      // const pieceName = document.createTextNode(sq.piece ? sq.piece.name : '');
      // square.appendChild(pieceName)
      const squareLabel = document.createElement('span');
      squareLabel.innerText = `${sq.file}${sq.rank}`
      squareLabel.innerText = this.squareIndex(`${sq.file}${sq.rank}`)
      square.classList.add('squareLabel')
      // $DEMO
      // square.appendChild(squareLabel)
      if (sq.piece) {
        const pieceImg = document.createElement('img')
        sq.piece.type === 'pawn' ? pieceImg.classList.add('pawn') : pieceImg.classList.add('piece')
        pieceImg.src = sq.piece.image
        square.appendChild(pieceImg)
      }
      square.setAttribute('id', `${sq.file}${sq.rank}`)
      square.classList.add(sq.color === 'light' ? 'light-square' : 'dark-square')
      boardEl.appendChild(square)
      boardEl.classList.add()
    });
  }
  //takes a src,dst. Moves piece to dst, removes from src.
  updatePieceSquare(src, dst) {
    let srcIdx = this.squareIndex(`${src.file}${src.rank}`)
    let dstIdx = this.squareIndex(`${dst.file}${dst.rank}`)
    let colorTurn = this.whiteTurn ? 'white' : 'black'

    if (src.piece.color === colorTurn) {
      // if players turn check if king is attacked
      if (this.squareAttacked(srcIdx)) {
      }

      if (src.piece.move(srcIdx, dstIdx)) {
        dst.piece = src.piece
        src.piece = null
        this.whiteTurn = !this.whiteTurn
      }
      this.checkCheckmate()
      board.drawBoard()
    } else {
      // console.log(`it is ${colorTurn} to move.`)
    }


  }
  // takes a square a1-h8 and converts it to square index

  squareOccupied(square) {
    let sq = board.squares[square]
    return sq.piece ? true : false
  }
  squareAttacked(src) {

    return false
  }
  //given a square, returns squares on that file.
  squareFile = square => this.squares.filter(fileSqs => board.squares[square].file === fileSqs.file)
  //given a square, returns squares on that rank.
  squareRank = square => this.squares.filter(rankSqs => board.squares[square].rank === rankSqs.rank)
  squareDiagonal = square => {
    //for the given file/rank of square
    //loop through each diagonal array
    //return all diagonals that contain file/rank of square

    const matchingDiags = this.diagonals.filter(diag => {
      return diag.includes(`${this.squares[square].file}${this.squares[square].rank}`)
    })

    return matchingDiags
  }
  //computes squares possible diagonals.
  populateDiagonals() {
    const filesLimitLow = this.files[0]
    const filesLimitHigh = this.files[this.files.length - 1]
    const ranksLimitLow = this.ranks[0]
    const ranksLimitHigh = this.ranks[this.ranks.length - 1]

    let blackRightDiagonals = []
    let blackLeftDiagonals = [[], [], [], [], [], [], [], []]
    let whiteLeftDiagonals = [[], [], [], [], [], [], [], []]
    let whiteRightDiagonals = []

    let possibleDiagonals = []

    for (let s = 0; s < this.files.length; s++) {
      let limitReached = false
      blackRightDiagonals.push([])
      for (let i = s; i < this.squares.length; i += 9) {
        if (limitReached) break
        if (filesLimitHigh === this.squares[i].file || ranksLimitHigh === this.squares[i].rank) {
          blackRightDiagonals[s].push(`${this.squares[i].file}${this.squares[i].rank}`)
          limitReached = true
        } else {
          blackRightDiagonals[s].push(`${this.squares[i].file}${this.squares[i].rank}`)
        }
      }
    }

    for (let r = 7; r > 0; r--) {
      let limitReached = false
      for (let i = r; i < this.squares.length; i += 7) {
        if (limitReached) break
        if (filesLimitLow === this.squares[i].file || ranksLimitHigh === this.squares[i].rank) {
          blackLeftDiagonals[r].push(`${this.squares[i].file}${this.squares[i].rank}`)
          limitReached = true
        } else {
          blackLeftDiagonals[r].push(`${this.squares[i].file}${this.squares[i].rank}`)
        }
      }
    }

    for (let w = 56; w < this.squares.length; w++) {
      let limitReached = false
      whiteRightDiagonals.push([])
      for (let i = w; i < this.squares.length; i -= 7) {
        if (limitReached) break
        if (filesLimitHigh === this.squares[i].file || ranksLimitLow === this.squares[i].rank) {
          whiteRightDiagonals[w - 56].push(`${this.squares[i].file}${this.squares[i].rank}`)
          limitReached = true
        } else {
          whiteRightDiagonals[w - 56].push(`${this.squares[i].file}${this.squares[i].rank}`)
        }
      }
    }

    for (let z = this.squares.length; z > 56; z--) {
      let limitReached = false
      for (let i = z; i < this.squares.length; i -= 9) {
        if (limitReached) break
        if (filesLimitLow === this.squares[i].file || ranksLimitLow === this.squares[i].rank) {
          whiteLeftDiagonals[z - 56].push(`${this.squares[i].file}${this.squares[i].rank}`)
          limitReached = true
        } else {
          whiteLeftDiagonals[z - 56].push(`${this.squares[i].file}${this.squares[i].rank}`)
        }
      }
    }

    possibleDiagonals = [...blackLeftDiagonals, ...blackRightDiagonals, ...whiteLeftDiagonals, ...whiteRightDiagonals]
    possibleDiagonals = possibleDiagonals.filter(arr => arr.length)
    this.diagonals = [...possibleDiagonals]
    return possibleDiagonals
  }
  //given a square, returns a square index
  squareIndex(square) {
    let file = square.slice(0, 1)
    let rank = parseInt(square.slice(1, 2))
    let sq = board.squares.filter(sq => sq.file === file).filter(sq => sq.rank === rank)
    let squareIndex = board.squares.findIndex(square => square === sq[0])
    return squareIndex
  }
  //given array of squares, returns their indexes
  squaresIndexes(squares) {
    const squaresIndexes = []
    for (let sq of squares) {
      squaresIndexes.push(this.squareIndex(`${sq.file}${sq.rank}`))
    }

    return squaresIndexes
  }
  diagonalIndexes(squares) {
    const squaresIndexes = []
    for (let sq of squares) {
      squaresIndexes.push(this.squareIndex(`${sq}`))
    }

    return squaresIndexes
  }
  populateBoard() {
    this.squares[0].piece = new Rook('black')
    this.squares[1].piece = new Knight('black')
    this.squares[2].piece = new Bishop('black')
    this.squares[3].piece = new Queen('black')
    this.squares[19].piece = new King('black')
    this.squares[5].piece = new Bishop('black')
    this.squares[6].piece = new Knight('black')
    this.squares[7].piece = new Rook('black')
    this.squares[8].piece = new Pawn('black')
    this.squares[9].piece = new Pawn('black')
    this.squares[10].piece = new Pawn('black')
    this.squares[11].piece = new Pawn('black')
    this.squares[12].piece = new Pawn('black')
    this.squares[13].piece = new Pawn('black')
    this.squares[14].piece = new Pawn('black')
    this.squares[15].piece = new Pawn('black')
    this.squares[56].piece = new Rook('white')
    this.squares[57].piece = new Knight('white')
    this.squares[58].piece = new Bishop('white')
    this.squares[43].piece = new Queen('white')
    this.squares[60].piece = new King('white')
    this.squares[61].piece = new Bishop('white')
    this.squares[62].piece = new Knight('white')
    this.squares[63].piece = new Rook('white')
    this.squares[55].piece = new Pawn('white')
    this.squares[54].piece = new Pawn('white')
    this.squares[53].piece = new Pawn('white')
    this.squares[52].piece = new Pawn('white')
    this.squares[51].piece = new Pawn('white')
    this.squares[50].piece = new Pawn('white')
    this.squares[48].piece = new Pawn('white')
    this.squares[49].piece = new Pawn('white')
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
    this.color = color
  }
}

class Pawn extends Piece {
  constructor(color) {
    super(color)
    this.type = 'pawn'
    this.name = color === 'white' ? 'P' : 'p'
    this.image = color === 'white' ? './assets/piece/wp.png' : './assets/piece/bp.png'
    this.movementRange = 2
    this.moveDistance = color === 'white' ? -8 : 8
    this.sqControlled = []
  }
  calcControll() {

  }
  move(src, dst) {
    //check if dst is occupied
    //check if path is occupied
    if (this.movementRange === 2 && src + this.moveDistance * this.movementRange === dst) {
      this.movementRange = 1
      return true
    }
    if (src + this.moveDistance === dst) {
      this.movementRange = 1
      if (board.squareOccupied(dst)) {
        return false
      }
      return true
    }

    if (src + this.moveDistance + 1 === dst || src + this.moveDistance - 1 === dst) {
      if (board.squareOccupied(dst)) {
        if (board.squares[src].piece.color !== board.squares[dst].piece.color)
          return true
      }
      return false
    }
    return false
  }
}

class Knight extends Piece {
  constructor(color) {
    super(color)
    this.type = 'knight'
    this.name = color === 'white' ? 'N' : 'n'
    this.image = color === 'white' ? './assets/piece/wn.png' : './assets/piece/bn.png'
    this.sqControlled = []
  }
  calcControll() {

  }
  move(src, dst) {
    //knight moves in L shapes
    //which is always a variation of +/-(1 or 2)x(1 or 2)y
    //this translates to the following static values in all cases
    let possibleMoves = [-17, -15, -10, -6, 6, 10, 15, 17]
    if (src < dst) {
      if (possibleMoves.includes(dst - src)) {
        if (board.squareOccupied(dst)) {
          return board.squares[src].piece.color !== board.squares[dst].piece.color
        } else {
          return true
        }
      }
    } else {
      if (possibleMoves.includes(src - dst)) {
        if (board.squareOccupied(dst)) {
          return board.squares[src].piece.color !== board.squares[dst].piece.color
        } else {
          return true
        }
      }
    }

    return false;
  }
}

class King extends Piece {
  constructor(color) {
    super(color)
    this.type = 'king'
    this.name = color === 'white' ? 'K' : 'k'
    this.image = color === 'white' ? './assets/piece/wk.png' : './assets/piece/bk.png'
    this.hasMoved = false
    this.sqControlled = []
  }
  calcControll() {

  }
  move(src, dst) {
    let possibleFile = board.squareFile(src)
    let possibleRank = board.squareRank(src)
    let possibleFileIdx = board.squaresIndexes(possibleFile)
    let possibleRankIdx = board.squaresIndexes(possibleRank)
    let possibleMoves = [...possibleFileIdx, ...possibleRankIdx]
    let path = []
    let kingMoves = []
    let possibleDiags = board.squareDiagonal(src)
    let movable = false

    //convert possible diagonal squares XY to square indexes
    let possibleDiagsIdx = []

    if (possibleFileIdx.includes(dst)) {
      if (src > dst) {
        possibleMoves = possibleFileIdx.reverse()
        kingMoves.push(possibleMoves[possibleMoves.indexOf(src) + 1])
      } else {
        possibleMoves = possibleFileIdx
        kingMoves.push(possibleMoves[possibleMoves.indexOf(src) + 1])
      }
    }

    if (possibleRankIdx.includes(dst)) {
      if (src > dst) {
        possibleMoves = possibleRankIdx.reverse()
        kingMoves.push(possibleMoves[possibleMoves.indexOf(src) + 1])
      } else {
        possibleMoves = possibleRankIdx
        kingMoves.push(possibleMoves[possibleMoves.indexOf(src) + 1])
      }
    }

    possibleDiags.forEach(possible => {
      possibleDiagsIdx.push(board.diagonalIndexes(possible))
    })
    possibleDiagsIdx.forEach(diagsIdx => {
      if (diagsIdx.includes(dst)) {
        //check for piece between src and dst
        if (src > dst) {
          possibleMoves = diagsIdx
          kingMoves.push(possibleMoves[possibleMoves.indexOf(src) + 1])
          kingMoves.push(possibleMoves[possibleMoves.indexOf(src) - 1])
        } else {
          possibleMoves = diagsIdx.reverse()
          kingMoves.push(possibleMoves[possibleMoves.indexOf(src) + 1])
          kingMoves.push(possibleMoves[possibleMoves.indexOf(src) - 1])
        }
      }
    })

    if (kingMoves.includes(dst)) {
      if (board.squareOccupied(dst)) {
        movable = board.squares[src].piece.color !== board.squares[dst].piece.color
      } else {
        movable = true
      }
    }
    return movable
  }
}


class Queen extends Piece {
  constructor(color) {
    super(color)
    this.type = 'queen'
    this.name = color === 'white' ? 'Q' : 'q'
    this.image = color === 'white' ? './assets/piece/wq.png' : './assets/piece/bq.png'
    this.sqControlled = []
  }
  calcControll(src) {
    this.sqControlled = []
    let possibleFile = board.squareFile(src)
    let possibleRank = board.squareRank(src)
    let possibleFileIdx = board.squaresIndexes(possibleFile)
    let possibleRankIdx = board.squaresIndexes(possibleRank)
    let possibleMoves = [...possibleFileIdx, ...possibleRankIdx]
    let path = []
    let possibleDiags = board.squareDiagonal(src)
    let movable = false
    let possibleDiagsIdx = []


    // Queen DOWN file attack
    // for (let i = possibleFileIdx.indexOf(src); i < possibleFileIdx.reverse().length; i++) {
    //   this.sqControlled.push(possibleMoves[i])
    //   if (board.squareOccupied(possibleMoves[i])) {
    //     break;
    //   }
    // }
    // Queen UP file attack
    for (let i = possibleFileIdx.indexOf(src); i < possibleFileIdx.reverse().length; i--) {
      this.sqControlled.push(possibleMoves[i])
      if (board.squareOccupied(possibleMoves[i])) {
        break;
      }
    }






    // if (possibleRankIdx.includes(dst)) {
    //   //check for piece between src and dst
    //   if (src > dst) {
    //     possibleMoves = possibleRankIdx.reverse()
    //     //get path squares between src and dst
    //     path = possibleRankIdx.filter(pathMove => {
    //       return pathMove < src && pathMove > dst
    //     })
    //   } else {
    //     path = possibleRankIdx.filter(pathMove => {
    //       return pathMove < dst && pathMove > src
    //     })
    //   }

    //   const pathClear = path.every(pathSq => {
    //     return !board.squareOccupied(pathSq)
    //   })

    //   if (pathClear) {
    //     if (board.squareOccupied(dst)) {
    //       return board.squares[src].piece.color !== board.squares[dst].piece.color
    //     } else {
    //       return true
    //     }
    //   }
    // }


    // possibleDiags.forEach(possible => {
    //   possibleDiagsIdx.push(board.diagonalIndexes(possible))
    // })
    // possibleDiagsIdx.forEach(diagsIdx => {

    //   let path = []
    //   if (diagsIdx.includes(dst)) {

    //     //check for piece between src and dst
    //     if (src > dst) {
    //       //get path squares between src and dst
    //       path = diagsIdx.filter(pathMove => {
    //         return pathMove < src && pathMove > dst
    //       })
    //     } else {
    //       path = diagsIdx.filter(pathMove => {
    //         return pathMove < dst && pathMove > src
    //       })
    //     }
    //     const pathClear = path.every(pathSq => {
    //       return !board.squareOccupied(pathSq)
    //     })

    //     if (pathClear) {
    //       if (board.squareOccupied(dst)) {
    //         return board.squares[src].piece.color !== board.squares[dst].piece.color
    //       } else {
    //         movable = true
    //       }
    //     }
    //   }
    // })


    return this.sqControlled
  }
  move(src, dst) {
    this.calcControll(dst)
    let possibleFile = board.squareFile(src)
    let possibleRank = board.squareRank(src)
    let possibleFileIdx = board.squaresIndexes(possibleFile)
    let possibleRankIdx = board.squaresIndexes(possibleRank)
    let possibleMoves = [...possibleFileIdx, ...possibleRankIdx]
    let path = []
    let possibleDiags = board.squareDiagonal(src)
    let movable = false


    //convert possible diagonal squares XY to square indexes
    let possibleDiagsIdx = []
    if (possibleFileIdx.includes(dst)) {
      //check for piece between src and dst
      if (src > dst) {
        possibleMoves = possibleFileIdx.reverse()
        //get path squares between src and dst
        path = possibleFileIdx.filter(pathMove => {
          return pathMove < src && pathMove > dst
        })
      } else {
        path = possibleFileIdx.filter(pathMove => {
          return pathMove < dst && pathMove > src
        })
      }

      const pathClear = path.every(pathSq => {
        return !board.squareOccupied(pathSq)
      })

      if (pathClear) {
        if (board.squareOccupied(dst)) {
          return board.squares[src].piece.color !== board.squares[dst].piece.color
        } else {
          return true
        }
      }
    }
    if (possibleRankIdx.includes(dst)) {
      //check for piece between src and dst
      if (src > dst) {
        possibleMoves = possibleRankIdx.reverse()
        //get path squares between src and dst
        path = possibleRankIdx.filter(pathMove => {
          return pathMove < src && pathMove > dst
        })
      } else {
        path = possibleRankIdx.filter(pathMove => {
          return pathMove < dst && pathMove > src
        })
      }

      const pathClear = path.every(pathSq => {
        return !board.squareOccupied(pathSq)
      })

      if (pathClear) {
        if (board.squareOccupied(dst)) {
          return board.squares[src].piece.color !== board.squares[dst].piece.color
        } else {
          return true
        }
      }
    }


    possibleDiags.forEach(possible => {
      possibleDiagsIdx.push(board.diagonalIndexes(possible))
    })
    possibleDiagsIdx.forEach(diagsIdx => {
      let path = []
      if (diagsIdx.includes(dst)) {

        //check for piece between src and dst
        if (src > dst) {
          //get path squares between src and dst
          path = diagsIdx.filter(pathMove => {
            return pathMove < src && pathMove > dst
          })
        } else {
          path = diagsIdx.filter(pathMove => {
            return pathMove < dst && pathMove > src
          })
        }
        const pathClear = path.every(pathSq => {
          return !board.squareOccupied(pathSq)
        })

        if (pathClear) {
          if (board.squareOccupied(dst)) {
            console.log(dst)
            movable = board.squares[src].piece.color !== board.squares[dst].piece.color
          } else {
            movable = true
          }
        }
      }

    })
    return movable
  }
}

class Rook extends Piece {
  constructor(color) {
    super(color)
    this.type = 'rook'
    this.name = color === 'white' ? 'R' : 'r'
    this.image = color === 'white' ? './assets/piece/wr.png' : './assets/piece/br.png'
    this.hasMoved = false
    this.sqControlled = []
  }
  calcControll() {

  }
  move(src, dst) {
    //get current rank
    // allowed to move on rank if not blocked
    //for a given square index
    //find all square indexes on the file
    let possibleFile = board.squareFile(src)
    let possibleRank = board.squareRank(src)
    let possibleFileIdx = board.squaresIndexes(possibleFile)
    let possibleRankIdx = board.squaresIndexes(possibleRank)
    let possibleMoves = [...possibleFileIdx, ...possibleRankIdx]
    let path = []
    if (possibleFileIdx.includes(dst)) {
      //check for piece between src and dst
      if (src > dst) {
        possibleMoves = possibleFileIdx.reverse()
        //get path squares between src and dst
        path = possibleFileIdx.filter(pathMove => {
          return pathMove < src && pathMove > dst
        })
      } else {
        path = possibleFileIdx.filter(pathMove => {
          return pathMove < dst && pathMove > src
        })
      }

      const pathClear = path.every(pathSq => {
        return !board.squareOccupied(pathSq)
      })

      if (pathClear) {
        if (board.squareOccupied(dst)) {
          return board.squares[src].piece.color !== board.squares[dst].piece.color
        } else {
          return true
        }
      }
    }
    if (possibleRankIdx.includes(dst)) {
      //check for piece between src and dst
      if (src > dst) {
        possibleMoves = possibleRankIdx.reverse()
        //get path squares between src and dst
        path = possibleRankIdx.filter(pathMove => {
          return pathMove < src && pathMove > dst
        })
      } else {
        path = possibleRankIdx.filter(pathMove => {
          return pathMove < dst && pathMove > src
        })
      }

      const pathClear = path.every(pathSq => {
        return !board.squareOccupied(pathSq)
      })

      if (pathClear) {
        if (board.squareOccupied(dst)) {
          return board.squares[src].piece.color !== board.squares[dst].piece.color
        } else {
          return true
        }
      }
    }

    return false;
  }
}

class Bishop extends Piece {
  constructor(color) {
    super(color)
    this.type = 'bishop'
    this.name = color === 'white' ? 'B' : 'b'
    this.image = color === 'white' ? './assets/piece/wb.png' : './assets/piece/bb.png'

    this.sqControlled = []
  }
  calcControll() {

  }
  move(src, dst) {
    //check if dst is occupied
    //check if path is occupied
    //get diagonal from board
    let possibleDiags = board.squareDiagonal(src)
    let possibleMoves = []
    let movable = false

    //convert possible diagonal squares XY to square indexes
    let possibleDiagsIdx = []
    possibleDiags.forEach(possible => {
      possibleDiagsIdx.push(board.diagonalIndexes(possible))
    })
    possibleDiagsIdx.forEach(diagsIdx => {

      let path = []
      if (diagsIdx.includes(dst)) {

        //check for piece between src and dst
        if (src > dst) {
          //get path squares between src and dst
          path = diagsIdx.filter(pathMove => {
            return pathMove < src && pathMove > dst
          })
        } else {
          path = diagsIdx.filter(pathMove => {
            return pathMove < dst && pathMove > src
          })
        }
        const pathClear = path.every(pathSq => {
          return !board.squareOccupied(pathSq)
        })

        if (pathClear) {
          if (board.squareOccupied(dst)) {
            movable = board.squares[src].piece.color !== board.squares[dst].piece.color
          } else {
            movable = true
          }
        }
      }

    })
    return movable
  }
}

function playerMove(src, dst) {
  //check if player turn
  //check for check
  //check for checkmate
  //check for stalemate
  //check for draw
  //check for piece on square
  //calculate movement
}


function init() {
  board.makeBoard()
  board.populateDiagonals()
  board.populateBoard()
  board.drawBoard()
}

const board = new Board()
init()