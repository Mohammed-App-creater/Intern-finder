"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

interface LocationInputProps {
  formData: { location: string };
  handleInputChange: (field: string, value: string) => void;
}

export function LocationInput({ formData, handleInputChange }: LocationInputProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCities = async (query: string) => {
    if (query.length < 2) {
      setCities([]);
      return;
    }
    
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
      type City = { city: string; country: string };
      const results = data.data?.map(
        (city: City) => `${city.city}, ${city.country}`
      ) || [];
      setCities(results);
    } catch (err) {
      console.error("Error fetching cities:", err);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    fetchCities(value);
  };

  const handleSelectCity = (city: string) => {
    handleInputChange("location", city);
    setSearchQuery(""); 
    setCities([]); 
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between text-[var(--text-dark)]"
          >
            {formData.location || "Select or type a location"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Type or search location..."
              value={searchQuery}
              onValueChange={handleSearchChange}
            />
            <CommandList>
              {loading && <p className="p-2 text-sm text-[var(--text-light)]">Loading...</p>}
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {cities.map((loc) => (
                  <CommandItem
                    key={loc}
                    value={loc}
                    onSelect={() => handleSelectCity(loc)}
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