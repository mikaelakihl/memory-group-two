import { useState } from "react";
import type { ICard } from "../models/ICard";
import "./MemoryApp.css";

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
    
    const colorByPairId: {[key: number]: string} = {
        1: "#FF0000", 
        2: "#FF1493", 
        3: "#9932CC", 
        4: "#00BFFF", 
        5: "#228B22", 
        6: "#FFFF00", 
        7: "#FFA500", 
        8: "#40E0D0", 
    };

    const [flipped, setFlipped] = useState([]); 
    const [matched, setMatched] = useState([]); 

    const handleFlip = (id: number) => {
        setCards(currentCards =>
            currentCards.map(card =>
                card.id === id
                    ? { ...card, isFlipped: !card.isFlipped, bgColor: !card.isFlipped ? colorByPairId[card.pairId] : "white",}
                    : card
            )
        )
    }

    return (
        <>
         <div className="gameBoard">
            {cards.map((c) => (
                <button
                    key={c.id}
                    className={`card ${c.isMatched ? "matched" : ""}`}
                    onClick={() => handleFlip(c.id)}
                    style={{backgroundColor: c.isFlipped ? c.bgColor : "white",}}
                    aria-label={`Kort ${c.id}`}
                    // style={{
                    //     backgroundColor: c.isFlipped ? c.bgColor : "white",
                    //     width: "80px",
                    //     height: "80px",
                    //     margin: "5px"
                    // }}
                >
                    {/* Ta bort/Kommentera ut nedanstående rad för att ta bort texten på korten:  */}
                    {c.isFlipped ? "": `Kort ${c.id}`} 
                </button>
            ))}
        </div>
        </>
    )
    
}