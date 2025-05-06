import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Tile from '../Tile/Tile';

interface TileType {
  color: string;
}

interface GameBoardProps {
  levelNo: string | number;
}

const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500'];

const getRandomColor = (excludeColors = []) => {
  const availableColors = colors.filter(color => !excludeColors.includes(color));
  return availableColors[Math.floor(Math.random() * availableColors.length)];
};

const generateTiles = (): TileType[][] => {
  const tiles: TileType[][] = [];

  for (let i = 0; i < 5; i++) {
    tiles[i] = [];
    for (let j = 0; j < 5; j++) {
      let color;
      const excludeColors: string[] = [];
      if (i > 1 && tiles[i - 1][j].color === tiles[i - 2][j].color) {
        excludeColors.push(tiles[i - 1][j].color);
      }
      if (j > 1 && tiles[i][j - 1].color === tiles[i][j - 2].color) {
        excludeColors.push(tiles[i][j - 1].color);
      }
      color = getRandomColor(excludeColors);
      tiles[i][j] = { color };
    }
  }

  return tiles;
};

const GameBoard = ({ levelNo }: GameBoardProps) => {
  const [tiles, setTiles] = useState<TileType[][]>([]);

  const [, drop] = useDrop(() => ({
    accept: 'TILE',
    drop: (item: { row: number; col: number }, monitor) => {
      const { row, col } = item;
      const delta = monitor.getDifferenceFromInitialOffset();
      const newRow = Math.round(row + delta.y / 74); // Assuming each tile is 64px
      const newCol = Math.round(col + delta.x / 74);

      if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
        const newTiles = [...tiles];
        [newTiles[row][col], newTiles[newRow][newCol]] = [newTiles[newRow][newCol], newTiles[row][col]];
        setTiles(newTiles);
      }
    },
  }));

  useEffect(() => {
    setTiles(generateTiles());
  }, []);


  return (
      <div ref={drop} className="gameboard shadow rounded-lg">
        <div className="grid grid-cols-9">
          {tiles.map((row, rowIndex) =>
            row.map((tile, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                color={tile.color}
                row={rowIndex}
                col={colIndex}
              />
            ))
          )}
        </div>
      </div>
  );
};

export default GameBoard;
