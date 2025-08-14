import { useState } from "react";
import type { ICard } from "../models/ICard";

export const MemoryApp = () => {
    const [cards, setCards] = useState<ICard[]>([
        {id: 1, pairId: 1, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 2, pairId: 1, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 3, pairId: 2, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 4, pairId: 2, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 5, pairId: 3, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 6, pairId: 3, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 7, pairId: 4, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 8, pairId: 4, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 9, pairId: 5, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 10, pairId: 5, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 11, pairId: 6, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 12, pairId: 6, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 13, pairId: 7, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 14, pairId: 7, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 15, pairId: 8, bgColor: "white", isFlipped: false, isMatched: false},
        {id: 16, pairId: 8, bgColor: "white", isFlipped: false, isMatched: false},
    ]);

    const [flipped, setFlipped] = useState([]); 
    const [matched, setMatched] = useState([]); 

    const handleFlip = (id: number) => {
        setCards(currentCards =>
            currentCards.map(card =>
                card.id === id
                    ? { ...card, isFlipped: !card.isFlipped }
                    : card
            )
        )
    }

    return (
        <>
         <div>
            {cards.map((c) => (
                <button
                    key={c.id}
                    onClick={() => handleFlip(c.id)}
                    style={{
                        backgroundColor: c.isFlipped ? c.bgColor : "gray",
                        width: "80px",
                        height: "80px",
                        margin: "5px"
                    }}
                >
                    {c.isFlipped ? "": `Kort ${c.id}`}
                </button>
            ))}
        </div>
        </>
    )
    
}