import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import type { ItemType } from "@/types/ItemType";
import { formatDate } from "@/utils/formatDate";
import { useItems } from "@/hooks/useItems";
import useDebounce from "@/hooks/useDebounce";

type ItemAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
};

const ItemAutocomplete = ({
  value,
  onChange,
  placeholder = "Search items...",
  className = "",
}: //setItems,
ItemAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value);

  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(inputValue, 300);

  useEffect(() => {
    setInputValue(value);
    setIsOpen(false);
  }, [value]);

  //might cause error
  const { data: itemsData, isLoading } = useItems(
    1,
    9999999,
    debouncedSearch.length >= 2 ? debouncedSearch : "",
    "__all"
  );

  const suggestions = itemsData?.data || [];

  useEffect(() => {
    if (debouncedSearch.length >= 2) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedSearch, suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleSuggestionClick = (item: ItemType) => {
    //for input
    setInputValue(item.name);

    onChange(item.name);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
      />

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[var(--border-color)] rounded-md shadow-lg max-h-60 overflow-auto">
          {isLoading ? (
            <div className="p-3 text-sm text-center text-gray-500">
              Loading...
            </div>
          ) : suggestions.length === 0 ? (
            <div className="p-3 text-sm text-center text-gray-500">
              No items found
            </div>
          ) : (
            suggestions.map((item: ItemType) => (
              <div
                key={item.id}
                onClick={() => handleSuggestionClick(item)}
                className="p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Expires: {formatDate(new Date(item.expiryDate))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ItemAutocomplete;
