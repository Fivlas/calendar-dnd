import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { DialogContext } from "./dialog";

type DateTimePickerProps = React.ComponentProps<typeof DayPicker> & {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    modal?: boolean;
};

export const DatetimePicker = React.forwardRef<HTMLButtonElement, DateTimePickerProps>(
    ({ value, onChange, modal, ...props }, ref) => {
        const context = modal ? React.useContext(DialogContext) : null;
        const dialogRef = context?.dialogRef;

        const [isOpen, setIsOpen] = React.useState(false);

        const hours = Array.from({ length: 24 }, (_, i) => i);

        const handleDateSelect = (selectedDate: Date | undefined) => {
            onChange?.(selectedDate);
        };

        const handleTimeChange = (type: "hour" | "minute", value: string) => {
            if (value) {
                const newDate = value ? new Date(value) : new Date();
                if (type === "hour") {
                    newDate.setHours(parseInt(value));
                } else if (type === "minute") {
                    newDate.setMinutes(parseInt(value));
                }
                onChange?.(newDate);
            }
        };

        return (
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={ref}
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? (
                            format(value, "MM/dd/yyyy hh:mm")
                        ) : (
                            <span>MM/DD/YYYY hh:mm</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" container={dialogRef?.current}>
                    <div className="sm:flex">
                        <Calendar
                            mode="single"
                            selected={value}
                            onSelect={handleDateSelect}
                            initialFocus
                        />
                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                            <ScrollArea className="w-64 sm:w-auto">
                                <div className="flex sm:flex-col p-2">
                                    {hours.map((hour) => (
                                        <Button
                                            key={hour}
                                            size="icon"
                                            variant={
                                                value && value.getHours() === hour
                                                    ? "default"
                                                    : "ghost"
                                            }
                                            className="sm:w-full shrink-0 aspect-square"
                                            onClick={() =>
                                                handleTimeChange(
                                                    "hour",
                                                    hour.toString()
                                                )
                                            }
                                        >
                                            {hour}
                                        </Button>
                                    ))}
                                </div>
                                <ScrollBar
                                    orientation="horizontal"
                                    className="sm:hidden"
                                />
                            </ScrollArea>
                            <ScrollArea className="w-64 sm:w-auto">
                                <div className="flex sm:flex-col p-2">
                                    {Array.from(
                                        { length: 12 },
                                        (_, i) => i * 5
                                    ).map((minute) => (
                                        <Button
                                            key={minute}
                                            size="icon"
                                            variant={
                                                value &&
                                                value.getMinutes() === minute
                                                    ? "default"
                                                    : "ghost"
                                            }
                                            className="sm:w-full shrink-0 aspect-square"
                                            onClick={() =>
                                                handleTimeChange(
                                                    "minute",
                                                    minute.toString()
                                                )
                                            }
                                        >
                                            {minute.toString().padStart(2, "0")}
                                        </Button>
                                    ))}
                                </div>
                                <ScrollBar
                                    orientation="horizontal"
                                    className="sm:hidden"
                                />
                            </ScrollArea>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }
);

DatetimePicker.displayName = "DatetimePicker";
