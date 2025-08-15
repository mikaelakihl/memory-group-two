import type { ICard } from '../models/ICard';

type CardProps = {
  card: ICard;
  colorName: string;
  onFlip: (id: number) => void;
};

export const Card = ({ card, colorName, onFlip }: CardProps) => {
  return (
    <button
      className={`card ${card.isMatched ? 'matched' : ''}`}
      onClick={() => onFlip(card.id)}
      style={{ backgroundColor: card.isFlipped ? card.bgColor : 'white' }}
      aria-label={card.isFlipped ? colorName : `Kort ${card.id}`}
    ></button>
  );
};
