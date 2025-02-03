import type { Reservation } from "../lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, UsersIcon, BedDoubleIcon } from "lucide-react"

interface ReservationCardProps {
  reservation: Reservation
  onViewDetails: () => void
}

export default function ReservationCard({ reservation, onViewDetails }: ReservationCardProps) {
  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Approved: "bg-green-100 text-green-800 border-green-300",
    Cancelled: "bg-red-100 text-red-800 border-red-300",
  }[reservation.status]

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-lg font-semibold truncate">{reservation.hotel}</span>
          <Badge variant="outline" className={`${statusColor} font-medium`}>
            {reservation.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Check-in: {reservation.checkIn}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Check-out: {reservation.checkOut}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BedDoubleIcon className="mr-2 h-4 w-4" />
            <span>Room: {reservation.roomType}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <UsersIcon className="mr-2 h-4 w-4" />
            <span>Guests: {reservation.guests}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="outline" onClick={onViewDetails}>
          View Details
        </Button>
        {reservation.cancellationReason && (
          <p className="text-sm text-red-600">Cancelled: {reservation.cancellationReason}</p>
        )}
      </CardFooter>
    </Card>
  )
}

