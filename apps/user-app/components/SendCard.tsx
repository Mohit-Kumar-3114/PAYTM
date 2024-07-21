"use client";
import React, { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransferBackend} from "../app/lib/actions/p2pTransferbackend";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    const handleSend = async () => {
        try {
            await p2pTransferBackend(number, Number(amount) * 100);
            alert("Money sent successfully!");
            setNumber("");
            setAmount("");
        } catch (error) {
            alert("An unexpected error occurred. Please try again later");
            setNumber("");
            setAmount("");
        }
    };

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput
                            placeholder={"Number"}
                            label="Number"
                            onChange={(value) => setNumber(value)}
                            value={number}
                        />
                        <TextInput
                            placeholder={"Amount"}
                            label="Amount"
                            onChange={(value) => setAmount(value)}
                            value={amount}
                        />
                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleSend}>Send</Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    );
}

