"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function SearchBar() {
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchCities = async (query: string) => {
    if (query.length < 2) {
      setCities([]);
      setShowSuggestions(false);
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
      setShowSuggestions(true);
    } catch (err) {
      console.error("Error fetching cities:", err);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    fetchCities(value);
  };

  const handleSelectCity = (city: string) => {
    setLocation(city);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (location.length >= 2 && cities.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSearch = () => {
    // Implement your search functionality here
    console.log("Searching for:", keyword, "in location:", location);
    setShowSuggestions(false);
  };

  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-2 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light w-4 h-4" />
        <Input 
          placeholder="Company title or keyword" 
          className="pl-10 h-12" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="flex-1 relative min-w-48" ref={locationRef}>
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light w-4 h-4" />
        <div className="relative">
          <Input 
            placeholder="Florence, Italy" 
            className="pl-10 h-12" 
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            onFocus={handleInputFocus}
          />
          
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
              <Command>
                <CommandInput
                  placeholder="Type or search location..."
                  value={location}
                  onValueChange={handleLocationChange}
                />
                <CommandList>
                  {loading && <p className="p-2 text-sm text-light">Loading...</p>}
                  <CommandEmpty>No location found.</CommandEmpty>
                  <CommandGroup>
                    {cities.map((loc) => (
                      <CommandItem
                        key={loc}
                        value={loc}
                        onSelect={() => handleSelectCity(loc)}
                        className="cursor-pointer"
                      >
                        {loc}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>
      </div>

      <Button 
        className="h-12 px-8 bg-primary text-white hover:bg-primary/90"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
}