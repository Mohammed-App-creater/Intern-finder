import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CommonSelectorProps {
  label?: string;
  placeholder?: string;
  addButtonText?: string;
  initialItems?: string[];
  onItemsChange?: (items: string[]) => void;
  className?: string;
}

export default function CommonSelector({
  label = "Items",
  placeholder = "Add new item",
  addButtonText = "Add",
  initialItems = [],
  onItemsChange,
  className = "",
}: CommonSelectorProps) {
  const [items, setItems] = useState(initialItems);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const removeItem = (item: string) => {
    const newItems = items.filter((s) => s !== item);
    setItems(newItems);
    onItemsChange?.(newItems);
  };

  const addItem = () => {
    if (input.trim() && !items.includes(input.trim())) {
      const newItems = [...items, input.trim()];
      setItems(newItems);
      setInput("");
      onItemsChange?.(newItems);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className={`w-full max-w-md ${className}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <Card className="mt-1 border rounded-none  shadow-none p-0">
        <CardContent className="p-2 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-teal-700 text-sm border"
              >
                {item}
                <button
                  onClick={() => removeItem(item)}
                  className="cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="ml-auto text-gray-500 hover:text-gray-700"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform cursor-pointer ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </CardContent>

        {open && (
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder={placeholder}
            />
            <Button size="sm" onClick={addItem}>
              {addButtonText}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
