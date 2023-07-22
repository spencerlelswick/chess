# Chess 

<img src="https://i.imgur.com/d89A4Zm.png" width="400">

## Overview

Chess is the Game of Kings where two armies (White and Black) clash for control of the center, overpower the other in order to checkmate the opponents king.

## Planning & Presentation 

### Wireframe

<img src="https://i.imgur.com/BgWVIzL.png" width="100%">

# Chess pseudo code 

1. positions Object - will hold an array of random positions, and solutions

2. Board Class - Will hold state of each square

3. Square Class - Will hold state of color, coordinates and Piece occupying the square

3. Piece Class - Will define behavior of a piece

4. King Class (and each other piece) - Will extend Piece and implement their own movement and capture rules

#### Populate board with pieces
- will need to pass in a FEN string 

- populate the currentBoard for the given position

#### Receive player moves
- will need to take two inputs from the user, starting square and destination square and determine if it matches the solution

#### Play computer moves
- will need to play the opponents moves automatically via engine, two play mode, or solution from FEN:

```
4r2r/2pQ1pp1/5k1p/8/6P1/P3qP1P/1PP5/3R3K w - - 1 33
```
- two character nodes will reference a Pawn.
- three character nodes will reference a major or minor piece denoted by the first capital letter. e.g. 

``` N = kNight, K = King, R = Rook ```

### Check moves
- Will need to check attacked squares
- Will need to check occupied squares
- Will Special rules for:
- - castling
- - long castling
- - pawn promotion


### Check for Checkmate
- on start of every turn, if the players king is attacked, the player is in check

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
- game data
- Notifications
- - correct confirmation
- - incorrect notification
- Buttons
- - Hint
- - Solution
- Rating

---