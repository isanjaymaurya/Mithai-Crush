export const candyTypes = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-orange-500'];

const generateInitialBoard = (size = 9): TilesProps[] => {
  const board: TilesProps[][] = Array(size).fill(null).map(() => Array(size).fill(null));

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      let possibleCandies = [...candyTypes];

      if (col > 1 && board[row][col - 1]?.color === board[row][col - 2]?.color) {
        possibleCandies = possibleCandies.filter(candy => candy !== board[row][col - 1].color);
      }

      if (row > 1 && board[row - 1][col]?.color === board[row - 2][col]?.color) {
        possibleCandies = possibleCandies.filter(candy => candy !== board[row - 1][col].color);
      }

      const randomType = possibleCandies[Math.floor(Math.random() * possibleCandies.length)];
      board[row][col] = { 
        color: randomType,
        type: 'sweet'
      };
    }
  }

  return board.flat();
};

export default generateInitialBoard;