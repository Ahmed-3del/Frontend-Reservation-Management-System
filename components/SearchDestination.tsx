
"use client"

import { useState, useMemo } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { popularDestinations } from "@/lib/mock-data"



interface SearchDestinationProps {
  onSelect: (destination: (typeof popularDestinations)[0]) => void
}
export default function SearchDestination({ onSelect }: SearchDestinationProps) {
  const [open, setOpen] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<(typeof popularDestinations)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDestinations = useMemo(() => {
    if (!searchQuery) return popularDestinations

    const query = searchQuery.toLowerCase()
    return popularDestinations.filter(
      (destination) =>
        destination.name.toLowerCase().includes(query))
  }, [searchQuery])

  const handleSelect = (destination: (typeof popularDestinations)[0]) => {
    setSelectedDestination(destination)
    setSearchQuery("")
    setOpen(false)
    onSelect(destination)
  }

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-start text-left font-normal h-12"
          >
            <Search className="mr-2 h-4 w-4 text-muted-foreground shrink-0 opacity-50" />
            {selectedDestination ? (
              <span className="flex items-center">
                <span className="font-medium text-muted-foreground">{selectedDestination.name}</span>
              </span>
            ) : (
              <span className="text-muted-foreground">Search hotels...</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[300px] p-0"
          align="start"
          side="bottom"
          sideOffset={4}
          alignOffset={0}
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search destinations..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty className="py-6 text-center text-sm">
                No destinations found for &quot;{searchQuery}&quot;
              </CommandEmpty>
              <CommandGroup heading="Popular Destinations">
                {filteredDestinations.map((destination) => (
                  <CommandItem
                    key={destination.id}
                    onSelect={() => handleSelect(destination)}
                    className="py-3 px-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-blue-500 mt-1 shrink-0" />
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{destination.name}</span>
                
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}