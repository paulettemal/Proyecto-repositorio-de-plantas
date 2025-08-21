import { motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";

interface CardRotateProps {
    children: React.ReactNode;
    onSendToBack: () => void;
    sensitivity: number;
    }

    function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [60, -60]);
    const rotateY = useTransform(x, [-100, 100], [-60, 60]);

    function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
        if (
        Math.abs(info.offset.x) > sensitivity ||
        Math.abs(info.offset.y) > sensitivity
        ) {
        onSendToBack();
        } else {
        x.set(0);
        y.set(0);
        }
    }

    return (
        <motion.div
        className="absolute cursor-grab"
        style={{ x, y, rotateX, rotateY }}
        drag
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragElastic={0.6}
        whileTap={{ cursor: "grabbing" }}
        onDragEnd={handleDragEnd}
        >
        {children}
        </motion.div>
    );
    }

    interface StackProps {
    randomRotation?: boolean;
    sensitivity?: number;
    cardDimensions?: { width: number; height: number };
    sendToBackOnClick?: boolean;
    cardsData?: { id: number;nombre:string, img: string }[];
    animationConfig?: { stiffness: number; damping: number };
    }

    export default function Stack({
    randomRotation = false,
    sensitivity = 200,
    cardDimensions = { width: 400, height: 400 },
    cardsData = [],
    animationConfig = { stiffness: 260, damping: 20 },
    sendToBackOnClick = false,
    }: StackProps) {
    const [cards, setCards] = useState(
        cardsData.length
        ? cardsData
        : [
            {
                id: 1,
                nombre: "Manzanilla",
                img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQiHYN3WSJ9EiefjNvNJgff1CXCgvE2tsf39UaMoXuD5P5YWxdpvbOElfRQ0ifZkCUhcgxbyTb19EsmXcKa5QxWFg",
            },
            {
                id: 2,
                nombre: "Valeriana",
                img: "https://www.plantex.fr/wp-content/uploads/2024/04/Valeriane-768x767.jpg",
            },
            {
                id: 3,
                nombre: "Ruda",
                img: "https://www.elcomercio.com/wp-content/uploads/2022/12/ruda-ec.jpg",
            },
            {
                id: 4,
                nombre: "Higo",
                img: "https://www.hola.com/horizon/landscape/3a4869d098d0-gettyimages-1335962301.jpg",
            },
            ]
    );

    const sendToBack = (id: number) => {
        setCards((prev) => {
        const newCards = [...prev];
        const index = newCards.findIndex((card) => card.id === id);
        const [card] = newCards.splice(index, 1);
        newCards.unshift(card);
        return newCards;
        });
    };

    return (
        <div
        className="relative"
        style={{
            width: cardDimensions.width,
            height: cardDimensions.height,
            perspective: 600,
        }}
        >
        {cards.map((card, index) => {
            const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

            return (
            <CardRotate
                key={card.id}
                onSendToBack={() => sendToBack(card.id)}
                sensitivity={sensitivity}
            >
                <motion.div
                    className="rounded-2xl overflow-hidden border-4 border-white bg-white"
                    onClick={() => sendToBackOnClick && sendToBack(card.id)}
                    animate={{
                        rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                        scale: 1 + index * 0.06 - cards.length * 0.06,
                        transformOrigin: "90% 90%",
                    }}
                    initial={false}
                    transition={{
                        type: "spring",
                        stiffness: animationConfig.stiffness,
                        damping: animationConfig.damping,
                    }}
                    style={{
                        width: cardDimensions.width,
                        height: cardDimensions.height,
                        display: "flex",
                        flexDirection: "column",
                    }}
                    >
                        <div className="flex-1 overflow-hidden">
                            <img
                            src={card.img}
                            alt={`card-${card.id}`}
                            className="w-full h-full object-cover pointer-events-none"
                            />
                        </div>
                        <h3 className="text-black text-center p-2 font-bold">
                            {card.nombre}
                        </h3>
                    </motion.div>
            </CardRotate>
            );
        })}
        </div>
    );
}
