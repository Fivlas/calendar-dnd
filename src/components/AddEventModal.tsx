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
import { useCallback, useEffect, useState } from "react";
import { DateTimePicker24h } from "./ui/dateAndTimePicker";

type AddEventModalProps = {
    isOpen: boolean;
    onClose: () => void;
    modalData: any;
};

const AddEventModal = ({ isOpen, onClose, modalData }: AddEventModalProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedDate2, setSelectedDate2] = useState<Date | undefined>(undefined);

    useEffect(() => {
        if (modalData && modalData.value) {
            setSelectedDate(new Date(modalData.value));
            console.log(modalData.value);
        }
    }, [modalData]);

    const handleSubmit = useCallback(() => {
        if (selectedDate) {
            console.log("Event date:", selectedDate);
            onClose();
        }
    }, [selectedDate, selectedDate2]);

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
                        <DateTimePicker24h setDate={setSelectedDate} date={selectedDate} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date">End Date</Label>
                        <DateTimePicker24h setDate={setSelectedDate2} date={selectedDate2} />
                    </div>
                    <Button type="button" size="sm" onClick={handleSubmit}>
                        <span>Add Event</span>
                        <Copy />
                    </Button>
                </div>
                {/* <DialogFooter className="sm:justify-start">
                    <DialogClose asChild onClick={onClose}>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
};

export default AddEventModal;
