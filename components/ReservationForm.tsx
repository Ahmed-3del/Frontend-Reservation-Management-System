/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useContext, useState } from "react";
import { Calendar, HotelIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import SearchDestination from "./SearchDestination";
import GuestsRoomsPicker from "./GuestsRoomPicker";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
// import {CalendarComponent} from "@components/ui/calendar"
export default function ReservationForm(
  {
    setReservations,
  }: {
    setReservations: (reservations: any) => void;
  }
) {
  const { user } = useContext(AuthContext);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guestsRooms, setGuestsRooms] = useState({
    roomType: "single",
    guests: 1,
  });
  const [selectedDestination, setSelectedDestination] = useState<{
    id: number;
    name: string;
    type: string;
    location: string;
  } | null>(null);

  const onsubmit = (
    e: React.MouseEvent<HTMLButtonElement>,
    {
      checkIn,
      checkOut,
      selectedDestination,
      guestsRooms,
    }: {
      checkIn: Date;
      checkOut: Date;
      selectedDestination: {
        id: number;
        name: string;
        type: string;
        location: string;
      };
      guestsRooms: {
        roomType: string;
        guests: number;
      };
    }
  ) => {
    e.preventDefault();
    const roomType = guestsRooms.roomType;
    const guests = guestsRooms.guests;
    const hotel = selectedDestination.name;
    async function postData(url = "") {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          checkIn: format(checkIn, "yyyy-MM-dd"),
          checkOut: format(checkOut, "yyyy-MM-dd"),
          hotel,
          roomType,
          guests,
          user: user ? user.username : "guest",
          status: "pending",
        }),
      });
      return response.json();
    }
    postData(
      "https://679f90c424322f8329c40a52.mockapi.io/api/reservations"
    ).then((data) => {
      setReservations((prev: any) => [...prev,data]); 
      toast.success("Reservation Successful");
    });
  };
  const router = useRouter();
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2">
        <div className="flex-1">
          <SearchDestination onSelect={setSelectedDestination} />
        </div>

        <div className="flex-1 flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full text-muted-foreground justify-start text-left font-normal h-12",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "MMM dd, yyyy") : "Check in"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                disabled={(date: Date) =>
                  date < new Date() || (checkOut ? date >= checkOut : false)
                }
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full text-muted-foreground justify-start text-left font-normal h-12",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "MMM dd, yyyy") : "Check out"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date: Date) =>
                  date < new Date() || (checkIn ? date <= checkIn : false)
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests and Rooms */}
        <div className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-start text-muted-foreground text-left font-normal h-12"
                )}
              >
                <HotelIcon className="mr-2 h-4 w-4" />
                {guestsRooms.roomType} · {guestsRooms.guests} guests
                <Users className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-0">
              <GuestsRoomsPicker
                onApply={setGuestsRooms}
                
                onClose={() => {
                  console.log("close");
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        {user ? (
          <Button
            onClick={(e) =>
              onsubmit(e, {
                checkIn: checkIn!,
                checkOut: checkOut!,
                selectedDestination: selectedDestination!,
                guestsRooms: guestsRooms,
              })
            }
            type="submit"
            className="h-12 px-8 text-base"
          >
            Apply
          </Button>
        ) : (
          <>
            <Button
              onClick={() => router.push("/login")}
              variant="default"
              size="lg"
              className="hidden sm:flex "
            >
              Log in to Apply
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
