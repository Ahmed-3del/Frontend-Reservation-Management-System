import type { Reservation } from "../lib/mock-data"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UsersIcon, BedDoubleIcon, UserIcon, MapPinIcon } from "lucide-react"

interface ReservationModalProps {
  reservation: Reservation
  onClose: () => void
}

export function ReservationModal({ reservation, onClose }: ReservationModalProps) {
  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Approved: "bg-green-100 text-green-800 border-green-300",
    Cancelled: "bg-red-100 text-red-800 border-red-300",
  }[reservation.status]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{reservation.hotel}</span>
            <span className={`${statusColor} text-xs font-semibold px-2 py-1 rounded-full`}>{reservation.status}</span>
          </DialogTitle>
          <DialogDescription>Reservation Details</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4 text-gray-500" />
            <p>
              <strong>Guest:</strong> {reservation.user}
            </p>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            <p>
              <strong>Check-in:</strong> {reservation.checkIn}
            </p>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            <p>
              <strong>Check-out:</strong> {reservation.checkOut}
            </p>
          </div>
          <div className="flex items-center">
            <BedDoubleIcon className="mr-2 h-4 w-4 text-gray-500" />
            <p>
              <strong>Room Type:</strong> {reservation.roomType}
            </p>
          </div>
          <div className="flex items-center">
            <UsersIcon className="mr-2 h-4 w-4 text-gray-500" />
            <p>
              <strong>Guests:</strong> {reservation.guests}
            </p>
          </div>
          {reservation.cancellationReason && (
            <div className="flex items-start text-red-600">
              <MapPinIcon className="mr-2 h-4 w-4 mt-1" />
              <p>
                <strong>Cancellation Reason:</strong> {reservation.cancellationReason}
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

