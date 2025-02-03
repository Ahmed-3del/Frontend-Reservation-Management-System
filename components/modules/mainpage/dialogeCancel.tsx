/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function CancelationPopUp({cancelDialogOpen, setCancelDialogOpen, cancellationReason, setCancellationReason, setSelectedReservation, handleCancellation}: any) {
  return (
    <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cancel Reservation</DialogTitle>
        <DialogDescription>
          Please provide a reason for cancelling this reservation.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Textarea
          placeholder="Enter cancellation reason..."
          value={cancellationReason}
          onChange={(e) => setCancellationReason(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => {
          setCancelDialogOpen(false)
          setCancellationReason("")
          setSelectedReservation(null)
        }}>
          Cancel
        </Button>
        <Button onClick={handleCancellation} disabled={!cancellationReason.trim()}>
          Confirm Cancellation
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default CancelationPopUp