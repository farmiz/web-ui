import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormFieldComponentChangeEvent } from "@/interfaces/form";
import { FC, useState } from "react";

interface DatePickerProps {
  fieldKey: string;
  label?: string;
  value?: any;
  onChange: ({ target }: FormFieldComponentChangeEvent) => void;
  disabled?: boolean;
  formatDate?: (date: string | Date) => string;
  disableDate: (date: any) => boolean;
}
const DatePicker: FC<DatePickerProps> = ({
  fieldKey,
  onChange,
  disabled,
  label,
  value,
  formatDate,
  disableDate,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "appearance-none w-full bg-gray-50 text-gray-700 border rounded py-[.6rem] px-4 leading-tight",
            !value && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          {value ? (
            (formatDate && formatDate("2023-08-01")) ||
            format(new Date(value), "dd/MM/yyyy")
          ) : (
            <span>{label || "Pick a date"}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(val: any) => {
            onChange({ target: { name: fieldKey, value: val } });
            setIsCalendarOpen(false);
          }}
          disabled={(date) => disableDate(date)}
          fromYear={1960}
          toYear={2060}
          captionLayout="dropdown-buttons"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
