import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { DateTimePicker24h } from "./ui/dateAndTimePicker";

type AddEventModalProps = {
    isOpen: boolean;
    onClose: () => void;
    modalData: any; // You can improve this with more specific types like EventData
};

const AddEventModal = ({ isOpen, onClose, modalData }: AddEventModalProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedDate2, setSelectedDate2] = useState<Date | null>(null);

    useEffect(() => {
        if (modalData && modalData.value) {
            setSelectedDate(new Date(modalData.value));
        }
    }, [modalData]);

    const handleSubmit = () => {
        if (selectedDate) {
            console.log("Event date:", selectedDate);
            // Here you can implement your save logic, like saving the event data
            onClose();
        }
    };

    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Event</DialogTitle>
                    <DialogDescription>
                        Add Event to this calendar so you don't forget about the upcoming event.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col justify-between items-start gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="date">Start Date</Label>
                        {/* Pass `selectedDate` as `date` and `setSelectedDate` as `setDate` */}
                        {/* @ts-ignore */}
                        <DateTimePicker24h setDate={setSelectedDate} date={selectedDate} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date">End Date</Label>
                        {/* @ts-ignore */}
                        <DateTimePicker24h setDate={setSelectedDate2} date={selectedDate2} />
                    </div>
                    <Button type="button" size="sm" onClick={handleSubmit}>
                        <span>Add Event</span>
                        <Copy />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild onClick={onClose}>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddEventModal;
