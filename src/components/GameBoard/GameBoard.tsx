import { useState, useEffect } from 'react';

import Tile from '../Tile/Tile';
import generateInitialBoard, { candyTypes } from './generateInitialBoard';
import moveTile from './moveTile';

interface GameBoardProps {
  levelNo: string | undefined;
  setScore: any;
}

const GameBoard = ({
    levelNo,
    setScore
}: GameBoardProps) => {
    const [tiles, setTiles] = useState<TilesProps[]>([]);
    const [removingCandies, setRemovingCandies] = useState<Set<number>>(new Set());
    const [revertingCandies, setRevertingCandies] = useState<Set<number>>(new Set());

    const handleMoveCandy = (fromIndex: number, toIndex: number) => {
        const newBoard = moveTile(tiles, fromIndex, toIndex);
        const { newBoard: updatedBoard, newScore, matches } = checkAndRemoveMatches(newBoard, Math.sqrt(newBoard.length));

        if (matches?.size > 0) {
            setRemovingCandies(matches);
            setTimeout(() => {
                setTiles(updatedBoard);
                setScore((prevScore: number) => prevScore + newScore);
                setRemovingCandies(new Set());
            }, 500); // Match the duration of the fade-out animation
        } else {
            setRevertingCandies(new Set([fromIndex, toIndex]));
            setTimeout(() => {
                setTiles(tiles); // Revert to original board
                setRevertingCandies(new Set());
            }, 500); // Match the duration of the revert animation
        }
    };

    const checkAndRemoveMatches = (tiles: TilesProps[], size: number): { newBoard: TilesProps[], newScore: number, matches: Set<number> } => {
        let matches = new Set<number>();
        let newScore = 0;

        console.log(tiles)

        for (let row = 0; row < size; row++) {
          for (let col = 0; col < size - 2; col++) {
            const index = row * size + col;
            if (tiles[index].color === tiles[index + 1].color && tiles[index].color === tiles[index + 2].color) {
              let matchLength = 3;
              matches.add(index);
              matches.add(index + 1);
              matches.add(index + 2);
              while (col + matchLength < size && tiles[index].color === tiles[index + matchLength].color) {
                matches.add(index + matchLength);
                matchLength++;
              }
              newScore += 100 * Math.pow(2, matchLength - 3);
              col += matchLength - 1;
            }
          }
        }
      
        for (let col = 0; col < size; col++) {
          for (let row = 0; row < size - 2; row++) {
            const index = row * size + col;
            if (tiles[index].color === tiles[index + size].color && tiles[index].color === tiles[index + 2 * size].color) {
              let matchLength = 3;
              matches.add(index);
              matches.add(index + size);
              matches.add(index + 2 * size);
              while (row + matchLength < size && tiles[index].color === tiles[index + matchLength * size].color) {
                matches.add(index + matchLength * size);
                matchLength++;
              }
              newScore += 100 * Math.pow(2, matchLength - 3);
              row += matchLength - 1;
            }
          }
        }
      
        if (matches.size > 0) {
          const newBoard = removeMatches(tiles, matches, size);
          return { newBoard, newScore, matches };
        }
      
        return { newBoard: tiles, newScore: 0, matches: new Set() };
    };

    const removeMatches = (board: TilesProps[], matches: Set<number>, size: number): TilesProps[] => {
        matches.forEach(index => {
          board[index] = { color: '' };
        });
        return bringDownCandies(board, size);
    };
      
    const bringDownCandies = (board: TilesProps[], size: number): TilesProps[] => {
        for (let col = 0; col < size; col++) {
          let emptySlots = 0;
          for (let row = size - 1; row >= 0; row--) {
            const index = row * size + col;
            if (board[index].color === '') {
              emptySlots++;
            } else if (emptySlots > 0) {
              board[index + emptySlots * size] = board[index];
              board[index] = { color: '' };
            }
          }
          for (let row = 0; row < emptySlots; row++) {
            const index = row * size + col;
            board[index] = { color: candyTypes[Math.floor(Math.random() * candyTypes.length)] };
          }
        }
        return [...board];
    };

    useEffect(() => {
        const newTile = generateInitialBoard();
        setTiles(newTile);
        // console.log(JSON.stringify(newTile))
    }, []);

    return (
        <div className="gameboard shadow rounded-lg" data-level={levelNo}>
            <div className="grid grid-cols-9 gap-0">
                {tiles.map((tile: TilesProps, index) =>
                    <Tile
                        key={index}
                        color={tile.color}
                        type=""
                        index={index}
                        onMove={handleMoveCandy}
                        isRemoving={removingCandies.has(index)}
                        isReverting={revertingCandies.has(index)}
                    />
                )}
            </div>
        </div>
    );
};

export default GameBoard;