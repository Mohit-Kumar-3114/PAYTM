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
    font-size: 2rem;
    animation: fadeIn 1s forwards, fadeOut 1s forwards;
}

.hidden {
    display: none;
}
`;

export default function() {
    const [currentMessage, setCurrentMessage] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentMessage((prev) => (prev + 1) % messages.length);
                setIsVisible(true);
            }, 1000); 
        }, 4000); 

        return () => clearInterval(interval);
    }, []);

    // Messages to display
    const messages = [
        "Welcome to Paytm",
        "Add money from bank",
        "Do P2P transaction",
        "See your recent transactions",
        "And much more"
    ];
    return <div className="w-full">
    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
    Dashboard
   </div>
   <div className="w-full relative">
            {/* Injecting CSS for animations */}
            <style>{animationStyles}</style>

            <div className={`message ${!isVisible ? 'hidden' : ''}`}>
                {messages[currentMessage]}
            </div>
        </div>
   </div>
}