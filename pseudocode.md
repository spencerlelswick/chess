# Chess pseudo code 

1. Declare init vars
- positions Object - will hold an array of random positions, and solutions
- board - will be empty until populated 
- 




2. populateBoard() function
- will need to take a FEN string and populate the currentBoard for the given position. e.g. FEN String - 

```
4r2r/2pQ1pp1/5k1p/8/6P1/P3qP1P/1PP5/3R3K w - - 1 33
```
- two character nodes will reference a Pawn.
- three character nodes will reference a major or minor piece denoted by the first capital letter. e.g. 

``` N = kNight, K = King, R = Rook ```

3. eventListners
- The board will have an event listener, return square clicked will be the starting square
- The board will have an event listener, return square clicked will be the destination square
- Hint button will change the color of the correct starting square
- Solution button will change the color of the correct starting square and correct destination square.

4. Rendering to the DOM
- board
- piece
- game data
- Notifications
- -  correct confirmation
- - incorrect notification
- Buttons
- - Hint
- - Solution
- Rating