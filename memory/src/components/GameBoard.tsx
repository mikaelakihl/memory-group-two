import { useState } from 'react';
import type { ICard } from '../models/ICard';
import './GameBoard.css';
import { Card } from './Card';
import { shuffleArray } from '../utils/shuffleArray';

export const GameBoard = () => {
  const [cards, setCards] = useState<ICard[]>(
    shuffleArray([
      {
        id: 1,
        pairId: 1,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 2,
        pairId: 1,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 3,
        pairId: 2,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 4,
        pairId: 2,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 5,
        pairId: 3,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 6,
        pairId: 3,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 7,
        pairId: 4,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 8,
        pairId: 4,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 9,
        pairId: 5,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 10,
        pairId: 5,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 11,
        pairId: 6,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 12,
        pairId: 6,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 13,
        pairId: 7,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 14,
        pairId: 7,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 15,
        pairId: 8,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 16,
        pairId: 8,
        bgColor: 'white',
        isFlipped: false,
        isMatched: false,
      },
    ])
  );

  // export const [matchingPair, setMatchingPair] = useState(false);

  const colorByPairId: { [key: number]: { hexcode: string; name: string } } = {
    1: { hexcode: '#FF0000', name: 'Röd' },
    2: { hexcode: '#FF1493', name: 'Rosa' },
    3: { hexcode: '#9932CC', name: 'Lila' },
    4: { hexcode: '#00BFFF', name: 'Blå' },
    5: { hexcode: '#228B22', name: 'Grön' },
    6: { hexcode: '#FFFF00', name: 'Gul' },
    7: { hexcode: '#FFA500', name: 'Orange' },
    8: { hexcode: '#555555', name: 'Mörkgrå' },
  };

      const handleFlip = (id: number) => {
        // const flipCard = cards.filter(c => c.isFlipped && !c.isMatched);
        // if (flipCard.length >= 2) return; // blockera fler än 2
        setCards(currentCards => {
            const updatedCards = currentCards.map(card =>
                card.id === id
                    ? { ...card, isFlipped: !card.isFlipped, bgColor: !card.isFlipped ? colorByPairId[card.pairId].hexcode : "white",}
                    : card
            );
        
            checkForMatch(updatedCards);
            return updatedCards;
        })
    }

    const checkForMatch = (cards: ICard[]) => {
        const flippedCards = cards.filter(card => card.isFlipped && !card.isMatched);

        if (flippedCards.length === 2) {
            const [first, second] = flippedCards;

            if (first.pairId === second.pairId) {
                handleMatch(first.pairId)
            } else {
                setTimeout(() => {
                    setCards(currentCards => currentCards.map(card => card.id === first.id || card.id === second.id ? {...card, isFlipped: false, bgColor: "white"} : card ))
                }, 850)
            }
        }
    };

    const handleMatch = (pairId: number) => {
            setCards(currentCard =>
                currentCard.map(card =>
                    card.pairId === pairId
                    ? { ...card, isMatched: true}
                    : card
                )
            );
        }

  // Lägg in i handleFlip ? Om lägger variabel inuti handleFlip lokal variabel?
  // const match = () => {
  //     if({c.pairId === c.pairId}) {
  //         setMatchingPair(c.isMatched(true)); //Om den är true - matchingPair =true
  //     }
  // }
  // OBS if isMatched && TVÅ cards isFlipped "lås" & kolla om matchedPair.
  // Annars return. if isMatched ??? Försvinna? Låsa(stäng av funktion för att kunna flippa)?
  //

  return (
    <>
      <div className="gameBoard">
        {cards.map((c) => (
          <Card
            key={c.id}
            card={c}
            colorName={colorByPairId[c.pairId].name}
            onFlip={handleFlip}
          />
        ))}
      </div>
    </>
  );
};
