"use client";

import { useState, useEffect } from "react";
import { Check, X, Filter, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import CancelationPopUp from "@/components/modules/mainpage/dialogeCancel";
import { FilterControls } from "@/components/modules/mainpage/FilterControls";
interface Reservation {
  id: string;
  user: string;
  guests: number;
  hotel: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  status: "pending" | "Approved" | "Cancelled";
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [hotelFilter, setHotelFilter] = useState<string>("");
  const [userFilter, setUserFilter] = useState<string>("");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<string | null>(
    null
  );
  const [cancellationReason, setCancellationReason] = useState("");

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [reservations]);

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        "https://679f90c424322f8329c40a52.mockapi.io/api/reservations"
      );
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      toast.error("Failed to fetch reservations");
    }
  };

  const applyFilters = () => {
    let filtered = reservations;
    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (reservation) => reservation.status === statusFilter
      );
    }

    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((reservation) => {
        const checkIn = new Date(reservation.checkIn);
        const checkOut = new Date(reservation.checkOut);
        return checkIn >= dateRange.from! && checkOut <= dateRange.to!;
      });
    }

    if (hotelFilter) {
      filtered = filtered.filter((reservation) =>
        reservation.hotel.toLowerCase().includes(hotelFilter.toLowerCase())
      );
    }

    if (userFilter) {
      filtered = filtered.filter((reservation) =>
        reservation.user.toLowerCase().includes(userFilter.toLowerCase())
      );
    }

    setFilteredReservations(filtered);
  };

  const handleStatusChange = async (
    reservationId: string,
    newStatus: string
  ) => {
    if (newStatus === "Cancelled") {
      setSelectedReservation(reservationId);
      setCancelDialogOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `https://679f90c424322f8329c40a52.mockapi.io/api/reservations/${reservationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.id === reservationId
              ? {
                ...reservation,
                status: newStatus as "pending" | "Approved" | "Cancelled",
              }
              : reservation
          )
        );
        toast.success("Reservation status updated successfully");
      } else {
        console.error("Failed to update reservation status");
        toast.error("Failed to update reservation status");
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
      toast.error("Error updating reservation status");
    }
  };

  const handleCancellation = async () => {
    if (!selectedReservation || !cancellationReason.trim()) return;

    try {
      const response = await fetch(
        `https://679f90c424322f8329c40a52.mockapi.io/api/reservations/${selectedReservation}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Cancelled",
            cancellationReason: cancellationReason,
          }),
        }
      );

      if (response.ok) {
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.id === selectedReservation
              ? { ...reservation, status: "Cancelled" }
              : reservation
          )
        );
        setCancelDialogOpen(false);
        setCancellationReason("");
        setSelectedReservation(null);
        toast.success("Reservation cancelled successfully");
      } else {
        console.error("Failed to cancel reservation");
        toast.error("Failed to cancel reservation");
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      toast.error("Error cancelling reservation");
    }
  };

  const handleDelete = async (id: string) => {
    console.log("delete id", id);
    if (!id) return;

    try {
      const response = await fetch(
        `https://679f90c424322f8329c40a52.mockapi.io/api/reservations/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Reservation deleted successfully");
      } else {
        console.error("Failed to delete reservation");
        toast.error("Failed to delete reservation");
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast.error("Error deleting reservation");
    }
  };

  return (
    <div className="container mx-auto w-full px-4 py-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">
          Reservations Dashboard
        </h1>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Apply filters to narrow down reservations
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 flex flex-col ">
                <FilterControls
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  hotelFilter={hotelFilter}
                  setHotelFilter={setHotelFilter}
                  userFilter={userFilter}
                  setUserFilter={setUserFilter}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex  ">
          <FilterControls
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateRange={dateRange}
            setDateRange={setDateRange}
            hotelFilter={hotelFilter}
            setHotelFilter={setHotelFilter}
            userFilter={userFilter}
            setUserFilter={setUserFilter}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Hotel Name</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">
                    {reservation.id}
                  </TableCell>
                  <TableCell>{reservation.user}</TableCell>
                  <TableCell>{reservation.guests}</TableCell>
                  <TableCell>{reservation.hotel}</TableCell>
                  <TableCell>{reservation.roomType}</TableCell>
                  <TableCell>{reservation.checkIn}</TableCell>
                  <TableCell>{reservation.checkOut}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        {
                          "bg-yellow-100 text-yellow-800":
                            reservation.status === "pending",
                          "bg-green-100 text-green-800":
                            reservation.status === "Approved",
                          "bg-red-100 text-red-800":
                            reservation.status === "Cancelled",
                        }
                      )}
                    >
                      {reservation.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {reservation.status !== "Cancelled" && (
                          <>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(reservation.id, "Approved")
                              }
                            >
                              <Check className="mr-2 h-4 w-4" />
                              <span>Approve</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(reservation.id, "Cancelled")
                              }
                            >
                              <X className="mr-2 h-4 w-4" />
                              <span>Cancel</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                handleDelete(reservation.id);
                              }}
                            >
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem onClick={() => {
                          handleDelete(reservation.id);
                        }}>
                          <span className="text-red-500">Delete</span>

                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      <CancelationPopUp
        cancelDialogOpen={cancelDialogOpen}
        setCancelDialogOpen={setCancelDialogOpen}
        cancellationReason={cancellationReason}
        setCancellationReason={setCancellationReason}
        setSelectedReservation={setSelectedReservation}
        handleCancellation={handleCancellation}
      />
    </div>
  );
}
