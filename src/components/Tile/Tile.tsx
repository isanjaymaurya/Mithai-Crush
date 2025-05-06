import React from 'react';
import { useDrag } from 'react-dnd';
import './style.scss';

const Tile = ({ color, onClick, row, col }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TILE',
    item: { row, col },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`tile ${color} flex items-center justify-center cursor-pointer border-black`}
      onClick={onClick}
      style={{ opacity: isDragging ? 0.5 : 1, border: "0.1px #333 solid" }}
    >
        {row} {col}
    </div>
  );
};

export default Tile;
