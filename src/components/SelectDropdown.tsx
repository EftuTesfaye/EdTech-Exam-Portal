import { FormEvent } from "react";

export type SelectOption = {
  label: string | number;
  value: string | number;
};

type DropdownProps = {
  title: string;
  items: SelectOption[];
  handleSelect: (e: FormEvent<HTMLSelectElement>) => void;
  styles?: any;
  value?: string | number;
};

function SelectDropdown({ title, items, handleSelect, value }: DropdownProps) {
  return (
    <div className="w-full sm:w-auto">
      <label
        htmlFor="select"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {title}
      </label>

      <select
        onChange={handleSelect}
        id="select"
        value={value ? value : items[0]?.value || ''}
        className="appearance-none block w-full bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-200"
      >
        {items.map((option, index) => (
          <option
            key={index}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectDropdown;
