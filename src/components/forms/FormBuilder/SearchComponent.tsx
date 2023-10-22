import React, { useState } from "react";

interface SearchComponentProps {
    isMulti: boolean;
    isSearchable: boolean;
    options: any;
}
const SearchComponent: React.FC<SearchComponentProps> = ({ isMulti, isSearchable, options }) => {
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  const handleOptionSelect = (option: any) => {
    if (isMulti) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleOptionRemove = (option: any) => {
    setSelectedOptions(selectedOptions.filter((selected: any) => selected.value !== option.value));
  };

  const renderOptions = () => {
    return options.map((option: any) => (
      <div
        key={option.value}
        className="cursor-pointer p-2 hover:bg-gray-200"
        onClick={() => handleOptionSelect(option)}
      >
        {option.label}
      </div>
    ));
  };

  const renderSelectedOptions = () => {
    if (isMulti) {
      return selectedOptions.map((option: any) => (
        <div
          key={option.value}
          className="bg-blue-500 text-white p-2 m-1 rounded"
        >
          {option.label}
          <button
            onClick={() => handleOptionRemove(option)}
            className="ml-2"
          >
            X
          </button>
        </div>
      ));
    } else {
      return selectedOptions.length > 0 ? (
        <div className="bg-blue-500 text-white p-2 m-1 rounded">
          {selectedOptions[0].label}
          <button onClick={() => setSelectedOptions([])}>Clear</button>
        </div>
      ) : null;
    }
  };

  return (
    <div>
      {isSearchable && (
        <input
          type="text"
          className="p-2 border rounded w-full mb-2"
          placeholder="Search..."
        />
      )}
      {isMulti ? renderSelectedOptions() : renderSelectedOptions()}
      <div className="border rounded">
        {renderOptions()}
      </div>
    </div>
  );
};

export default SearchComponent;
