import { useState, useRef, useEffect } from "react";
import "../index.css"; 

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps {
  options: Option[];
  onSelect?: (option: Option) => void;
  value: Option;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, value }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-button">
        {selectedOption ? selectedOption.label : "Select an option"}
        <span className={`caret ${isOpen ? "caret-up" : "caret-down"}`}></span>
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`dropdown-item ${value.value === option.value ? "dropdown-item-highlight" : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
