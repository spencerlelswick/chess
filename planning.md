# Chess 

<img src="https://i.imgur.com/d89A4Zm.png" width="400">

## Overview

Chess is the Game of Kings where two armies (White and Black) clash for control of the center, overpower the other in order to checkmate the opponents king.

## Planning & Presentation 

### Wireframe

<img src="https://i.imgur.com/BgWVIzL.png" width="80%">

# Chess pseudo code 

1. positions Object - will hold an array of random positions, and solutions

2. Board Class - Will hold state of each square

3. Square Class - Will hold state of color, coordinates and Piece occupying the square

3. Piece Class - Will define behavior of a piece

4. King Class (and each other piece) - Will extend Piece and implement their own movement and capture rules


1. If it is not the users turn no piece will move
2. If the player is in check, the player must
- move the king
- block check
- capture the checking piece
- Otherwise the game will end in Checkmate and be win/loss respectively as the King is captured on the next move
3. Check for stalemate or draw conditions
  - if a player offers a draw and the other accepts (computer will evaluate 0.00 or advantage for human to accept)
  - if a player is not in check
  - if a player has no legal moves (i.e. only the king can move into check) (stalemate)
  - if both players lack sufficient check mating material (i.e. K+B vs K, K+N vs K, K+N+N vs K) (drawn)
  - if 50 moves (100 plies) have been played without a pawn move (drawn by 50 move rule)
  - if the current position has occured in the game three times (drawn by repetition)
  - the game will be stalemated or drawn (draw 1/2 - 1/2)
3. A user will select a piece or square as a source
2. The user will drag the piece, or click the second square as a destination
6. if the player is not in check, and is their turn, movement will be calculated
7. the source square clicked will indicate the piece to move
8. the source square is only defined if the square clicked contains a piece
8. The movement of the piece will reference its source and destination square
9. All pieces but the knight will check if blocked
10. if there is a piece in between the src and dest square, the move is illegal
11. If there is a clear path to destination it will check if destination is occupied
12. All pieces except for pawns can capture on destination square

** Special rules **
1. Knights can move anywhere within the board limits, and are not blocked by pieces.
2. Kings can move with a range of 1 in all directions, but cannot move to a square attacked by any enemy piece
3. Kings can castle
   - If the king has not moved
   - If the castle-Rook has not moved
   - If the kings path to the castle-Rook is clear
   - If the kings path to the castle-Rook is not attacked by an enemy piece
   - If the king is NOT in check
   - Kings can castle to g1/g8, and c1/c8 respectively (O-O Kingside, O-O-O Queenside)
4. Pawns
   - Can move two squares if it has not moved previously
   - Can only move one square for the rest of the game
   - Can En-passant, capturing an enemy pawn that has advanced two squares on the last turn, only if the pawn is on the 5th rank for white, or 4th rank for black.
   - Cannot move to an occupied square
   - Can only capture one square diagonally from source square
   - Can promote on the last rank after travelling the entire board
   -   -  Pawns can promote to a kNight, Bishop, Rook or Queen

#### Receive player moves
- will need to take two inputs from the user, starting square and destination square and determine if it matches the solution

#### Play computer moves
- will need to play the opponents moves automatically via engine, two play mode, or solution from FEN:


### Check moves
- Will need to check attacked squares
- Will need to check occupied squares
- Will Special rules for:
- - castling
- - long castling
- - pawn promotion


### Check for Checkmate
- on start of every turn, if the players king is attacked, the player is in check

### Check for Stalemate or Draw
- on start of every turn, if the players king is not attacked
- check if the user has any legal moves
- check if 50 moves have been played without a pawn move
- position has repeated three times
- Draw offered and accepted by opponent

#### If a player is in check there are a few options:
- They must move their king to an unattacked square
- They must block the check with another piece
- They must capture the piece checking the king
- They cannot castle out of, or through check


### eventListeners
- The board will have an event listener, return square clicked will be the starting square
- The board will have an event listener, return square clicked will be the destination square
- Hint button will change the color of the correct starting square
- Solution button will change the color of the correct starting square and correct destination square.

### Rendering to the DOM
- board
- squares
- pieces
- Buttons
- - New Game
- - Offer Draw


---
# Icebox features

## Chess960 Feature

### Major pieces for each side are symetrically randomized
- 960 permutations
- King is placed between rooks on any file
- all other rules apply

## Chess Tactics Puzzle Feature

### Populate board with puzzle position
- will need to pass in a FEN string 

- populate the currentBoard for the given position
```
4r2r/2pQ1pp1/5k1p/8/6P1/P3qP1P/1PP5/3R3K w - - 1 33
```
- two character nodes will reference a Pawn.
- three character nodes will reference a major or minor piece denoted by the first capital letter. e.g. 

``` N = kNight, K = King, R = Rook ```

### Rendering to the DOM
- board
- squares
- pieces
- game data
- Notifications
- - correct confirmation
- - incorrect notification
- Buttons
- - Hint
- - Solution
- Rating
