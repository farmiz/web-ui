import React, { useState, useEffect, ChangeEvent, useRef } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomSearchableSelectProps {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder: string;
}

const CustomSearchableSelect: React.FC<CustomSearchableSelectProps> = ({
  options,
  onSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const selectRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // Function to close the dropdown when clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !(selectRef.current as any).contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={selectRef}>
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder={placeholder}
        value={selectedOption?.label || searchTerm} // Display selected option or the typed search term
        onClick={() => setIsOpen(true)}
        onChange={handleInputChange}
      />
      {isOpen && (
        <div className="absolute mt-2 w-full border border-t-0 rounded-b max-h-40 overflow-y-auto z-10 bg-white shadow-sm">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}

          {!filteredOptions.length && <p className="text-center text-gray-400">No result found</p>}
        </div>
      )}
      {selectedOption && (
        <div className="absolute top-0 right-0 -mr-4 mt-4 p-2 rounded-full bg-blue-500 text-white cursor-pointer hover-bg-blue-600">
          <span onClick={() => setSelectedOption(null)}>X</span>
        </div>
      )}
    </div>
  );
};

export default CustomSearchableSelect;
