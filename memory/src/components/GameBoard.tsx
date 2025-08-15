import { useRef, useState } from "react";
import type { ICard } from "../models/ICard";
import "./GameBoard.css";
import { Card } from "./Card";
import { shuffleArray } from "../utils/shuffleArray";

const memoryCards: ICard[] = shuffleArray([
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
]);

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
  
export const GameBoard = () => {
  const [cards, setCards] = useState<ICard[]>(shuffleArray(memoryCards));

  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isTimeRunning, setIsTimeRunning] = useState(false);

  const startTimer = () => {
    if (!isTimeRunning) {
      setIsTimeRunning(true);
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTimeRunning(false);
  };

  // GAME OVER
  const [gameOver, setGameOver] = useState(false);

  const checkGameOver = (cardsToCheck: ICard[]) => {
    const allMatched = cardsToCheck.every((card) => card.isMatched); // Kolla om alla kort är matchade


		if (allMatched) {
			setGameOver(true); // Om alla kort är matchade, sätt gameOver till true
      stopTimer();
    }
		console.log(gameOver);
	};

  // RESTART GAME
  const restartGame = () => {
    const resetCards = cards.map((card) => ({
      ...card,
      isFlipped: false,
      isMatched: false,
      bgColor: 'white',
    }));
    
		const shuffledCards = shuffleArray(resetCards); // ⬅ ta emot resultatet
		setCards(shuffledCards);
		setGameOver(false);
    stopTimer()
    setTimeElapsed(0)
	};

	const handleFlip = (id: number) => {
    if (!isTimeRunning) startTimer();

		setCards((currentCards) => {
			const updatedCards = currentCards.map((card) =>
				card.id === id
					? {
							...card,
							isFlipped: !card.isFlipped,
							bgColor: !card.isFlipped ? colorByPairId[card.pairId].hexcode : "white",
					  }
					: card
			);

      checkForMatch(updatedCards);
      return updatedCards;
    });
  };

  const checkForMatch = (cards: ICard[]) => {
    const flippedCards = cards.filter(
      (card) => card.isFlipped && !card.isMatched
    );

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      if (first.pairId === second.pairId) {
        handleMatch(first.pairId);
      } else {
        setTimeout(() => {
          setCards((currentCards) => {
            const updated = currentCards.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false, bgColor: 'white' }
                : card
            );
            checkGameOver(updated);
            return updated;
          });
        }, 850);
      }
    }
  };

  const handleMatch = (pairId: number) => {
    setCards((currentCard) => {
      const updated = currentCard.map((card) =>
        card.pairId === pairId ? { ...card, isMatched: true } : card
      );
      checkGameOver(updated);
      return updated;
    });
  };

	return (
		<>
      <div>Time:{ timeElapsed}</div>
    <h1>MEMORY</h1>
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
      {gameOver && <h2>Grattis! Du klarade det!</h2>}
			{gameOver && (
				<button onClick={restartGame} className="game-over-btn">
					Spela igen?
				</button>
			)}
		</>
	);

        
};
