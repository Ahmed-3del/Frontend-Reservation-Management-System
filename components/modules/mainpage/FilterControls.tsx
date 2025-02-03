import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface FilterControlsProps {
  statusFilter: string
  setStatusFilter: (value: string) => void
  dateRange: { from: Date | undefined; to: Date | undefined }
  setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void
  hotelFilter: string
  setHotelFilter: (value: string) => void
  userFilter: string
  setUserFilter: (value: string) => void
}

export function FilterControls({
  statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,
  hotelFilter,
  setHotelFilter,
  userFilter,
  setUserFilter,
}: FilterControlsProps) {
  return (
    <div className=" flex flex-row items-center justify-center space-x-4" >
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Approved">Approved</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      <Input
        placeholder="Filter by hotel name"
        value={hotelFilter}
        onChange={(e) => setHotelFilter(e.target.value)}
        className="w-full"
      />

      <Input
        placeholder="Filter by user name"
        value={userFilter}
        onChange={(e) => setUserFilter(e.target.value)}
        className="w-full"
      />
    </div>
  )
}

