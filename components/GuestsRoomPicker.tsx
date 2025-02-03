"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface GuestsRoomsPickerProps {
    onApply: (values: {
        roomType: string
        guests: number
    }) => void
    onClose: () => void
}
export default function GuestsRoomsPicker({ onApply, onClose }: GuestsRoomsPickerProps) {
    const [guests, setGuests] = useState(1)
    const [roomType, setRoomType] = useState("single")
    const handleReset = () => {
        setRoomType("single")
    }
    const handleApply = () => {
        onApply({ roomType, guests: guests })
        onClose()
    }
    return (
        <div className="p-4 w-[320px]">

            {/* Rooms */}
            <div className="flex items-center justify-between mb-6">
                <span className="font-medium">Room Type</span>
                <div className="flex items-center gap-3">
                    <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="triple">Triple</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center justify-between mb-6">
                <span className="font-medium">Guests</span>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                        className="p-2 border rounded"
                    >
                        <Minus />
                    </button>
                    <span>{guests}</span>
                    <button
                        onClick={() => setGuests((prev) => prev + 1)}
                        className="p-2 border rounded"
                    >
                        <Plus />
                    </button>
                </div>
            </div>


            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="ghost" onClick={handleReset}>
                    RESET
                </Button>
                <Button onClick={handleApply}>Apply</Button>
            </div>
        </div>
    )
}

