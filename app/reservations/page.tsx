import { Suspense } from "react"
import { ReservationsList } from "@/components/reservationList"
// import { mockReservations } from "../lib/mock-data"

export default function ReservationsPage() {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading reservations...</div>}>
        <ReservationsList  />
      </Suspense>
    </div>
  )
}

