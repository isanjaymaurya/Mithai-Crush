import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface TileProps {
  color: string | undefined;
  type?: string | undefined; 
  index: number; 
  onMove: (fromIndex: number, toIndex: number) => void;
  isRemoving?: boolean;
  isReverting?: boolean;
}

const Tile = ({
  type, 
  index,
  onMove,
  color,
  isReverting,
  isRemoving
}: TileProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isFading, setIsFading] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TILE',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'TILE',
    drop: (item: { index: number }) => {
      onMove(item.index, index);
    },
  }));

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`h-10 cursor-pointer ${color} ${isDragging ? 'opacity-50' : 'opacity-100'} ${isFading ? 'animate-fadeOut' : ''} ${isReverting ? 'animate-revert' : ''}`}
      data-type={type}
      style={{ border: '0.5px solid' }}
    >
      {index}
    </div>
  );
};

export default Tile;
