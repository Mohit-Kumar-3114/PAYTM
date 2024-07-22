"use client"
import React, { useState, useEffect } from 'react';

const animationStyles = `
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.message {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 5rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: fadeIn 2s forwards, fadeOut 2s forwards;
}

.hidden {
    display: none;
}
`;

export default function Dashboard() {
    const [currentMessage, setCurrentMessage] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentMessage((prev) => (prev + 1) % messages.length);
                setIsVisible(true);
            }, 2000); 
        }, 3000); 

        return () => clearInterval(interval);
    }, []);

    const messages = [
        "Welcome to Paytm",
        "Effortless Transactions, Every Time",
        "Money at Your Fingertips",
        "Smart Payments for a Smart Life",
        "Your Money, Your Control",
        "Discover Our Features",
        "Add money from bank",
        "Do P2P transaction",
        "See your recent transactions",
        "And much more"
    ];

    return (
        <div className="w-full">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Dashboard
            </div>
            <div className="w-full flex justify-center">
                <style>{animationStyles}</style>
                <div className={`message ${!isVisible ? 'hidden' : ''}`}>
                    {messages[currentMessage]}
                </div>
            </div>
        </div>
    );
}
