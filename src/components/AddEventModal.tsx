import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DateTimePicker24h } from "./ui/dateAndTimePicker";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Transition, Variants } from "motion/react";

type AddEventModalProps = {
    isOpen: boolean;
    onClose: () => void;
    modalData: any;
};

const AddEventModal = ({ isOpen, onClose, modalData }: AddEventModalProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        undefined
    );
    const [selectedDate2, setSelectedDate2] = useState<Date | undefined>(
        undefined
    );

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

    const customVariants: Variants = {
        initial: {
            opacity: 0,
            scale: 0.95,
            y: 40,
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: 40,
        },
    };

    const customTransition: Transition = {
        type: "spring",
        bounce: 0,
        duration: 0.25,
    };

    // <Dialog open={isOpen}>
    //     <DialogContent className="sm:max-w-md">
    //         <DialogHeader>
    //             <DialogTitle>Add Event</DialogTitle>
    //             <DialogDescription>
    //                 Add Event to this calendar so you don't forget about the upcoming event.
    //             </DialogDescription>
    //         </DialogHeader>
    //         <div className="flex flex-col justify-between items-start gap-5">
    //             <div className="grid gap-2">
    //                 <Label htmlFor="date">Start Date</Label>
    //                 {/* Pass `selectedDate` as `date` and `setSelectedDate` as `setDate` */}
    //                 <DateTimePicker24h setDate={setSelectedDate} date={selectedDate} />
    //             </div>
    //             <div className="grid gap-2">
    //                 <Label htmlFor="date">End Date</Label>
    //                 <DateTimePicker24h setDate={setSelectedDate2} date={selectedDate2} />
    //             </div>
    //             <Button type="button" size="sm" onClick={handleSubmit}>
    //                 <span>Add Event</span>
    //                 <Copy />
    //             </Button>
    //         </div>
    //     </DialogContent>
    // </Dialog>
    return (
        <Dialog
            variants={customVariants}
            transition={customTransition}
            open={isOpen}
        >
            <DialogContent className="w-full max-w-md bg-white p-6 dark:bg-zinc-900">
                <DialogHeader>
                    <DialogTitle className="text-zinc-900 dark:text-white">
                        Add Event
                    </DialogTitle>
                    <DialogDescription className="text-zinc-600 dark:text-zinc-400">
                        Add Event to this calendar so you don't forget about the
                        upcoming event.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col justify-between items-start gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="date">Start Date</Label>
                        <DateTimePicker24h
                            setDate={setSelectedDate}
                            date={selectedDate}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date">End Date</Label>
                        <DateTimePicker24h
                            setDate={setSelectedDate2}
                            date={selectedDate2}
                        />
                    </div>
                    <Button type="button" size="sm" onClick={handleSubmit}>
                        <span>Add Event</span>
                        <Copy />
                    </Button>
                </div>
                <DialogClose />
            </DialogContent>
        </Dialog>
    );
};

export default AddEventModal;
