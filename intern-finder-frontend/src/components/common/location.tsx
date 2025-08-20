"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function LocationInput({ formData, handleInputChange }: any) {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = async (query: string) => {
    if (query.length < 2) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=${query}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      const data = await res.json();
      const results = data.data.map(
        (city: any) => `${city.city}, ${city.country}`
      );
      setCities(results);
    } catch (err) {
      console.error("Error fetching cities:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Label
        htmlFor="location"
        className="text-sm font-medium text-[var(--text-dark)] mb-2 block"
      >
        Location
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between text-[var(--text-light)]"
          >
            {formData.location || "Select or type a location"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Type or search location..."
              value={formData.location}
              onValueChange={(val) => {
                handleInputChange("location", val);
                fetchCities(val);
              }}
            />
            <CommandList>
              {loading && <p className="p-2 text-sm text-[var(--text-light)]">Loading...</p>}
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {cities.map((loc) => (
                  <CommandItem
                    key={loc}
                    value={loc}
                    onSelect={() => handleInputChange("location", loc)}
                  >
                    {loc}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}