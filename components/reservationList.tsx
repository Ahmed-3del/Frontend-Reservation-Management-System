"use client"

import { useEffect, useState, useMemo } from "react"
import type { Reservation } from "../lib/mock-data"
import { Input } from "@/components/ui/input"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { CalendarIcon, FilterIcon, SearchIcon } from "lucide-react"
import ReservationCard from "./reservationCard"
import { ReservationModal } from "./reservationModal"

export function ReservationsList() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://679f90c424322f8329c40a52.mockapi.io/api/reservations");
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchData();
  }, []);



  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesSearch = reservation.hotel.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || reservation.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, reservations]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Reservations</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by hotel or guest name"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <FilterIcon className="text-gray-400" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredReservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onViewDetails={() => setSelectedReservation(reservation)}
          />
        ))}
      </div>
      {filteredReservations.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No reservations found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you&lsquo;re looking for.
          </p>
        </div>
      )}
      {selectedReservation && (
        <ReservationModal reservation={selectedReservation} onClose={() => setSelectedReservation(null)} />
      )}
    </div>
  )
}

