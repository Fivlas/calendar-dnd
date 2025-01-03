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
import { DialogContext } from "./dialog";

type DateTimePicker24hProps = {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    modal?: boolean;
};

export const DateTimePicker24h = React.forwardRef<HTMLButtonElement, DateTimePicker24hProps>(
    ({ date, setDate, modal = false }, ref) => {
    const context = modal ? React.useContext(DialogContext) : null;
    const dialogRef = context?.dialogRef;
    const [isOpen, setIsOpen] = React.useState(false);

    const hours = Array.from({ length: 24 }, (_, i) => i); // Array of 24 hours (0-23)
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // Array of minutes in 5-minute intervals

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleTimeChange = (type: "hour" | "minute", value: string) => {
        if (date && !isNaN(date.getTime())) {
            const newDate = new Date(date);
            if (type === "hour") {
                newDate.setHours(parseInt(value, 10));
            } else if (type === "minute") {
                newDate.setMinutes(parseInt(value, 10));
            }
            setDate(newDate);
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
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date && !isNaN(date.getTime()) ? (
                        format(date, "MM/dd/yyyy HH:mm") // Display date and time
                    ) : (
                        <span>MM/DD/YYYY HH:mm</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" container={dialogRef?.current}>
                <div className="sm:flex">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                    />
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                        <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                                {hours.reverse().map((hour) => (
                                    <Button
                                        key={hour}
                                        size="icon"
                                        variant={
                                            date && date.getHours() === hour
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
                                        {hour.toString().padStart(2, "0")}
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
                                {minutes.map((minute) => (
                                    <Button
                                        key={minute}
                                        size="icon"
                                        variant={
                                            date && date.getMinutes() === minute
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
});
