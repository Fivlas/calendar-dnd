import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Navigate, ToolbarProps } from 'react-big-calendar';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { DatePicker } from '../ui/datePicker';
import { useEffect, useState } from 'react';

const CustomToolbar = (props: ToolbarProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>();

    const goToDayView = () => {
        props.onView('day');
    };
    const goToWeekView = () => {
        props.onView('week');
    };
    const goToMonthView = () => {
        props.onView('month');
    };

    const goToBack = () => {
        props.onNavigate(Navigate.PREVIOUS);
    };

    const goToNext = () => {
        props.onNavigate(Navigate.NEXT);
    };

    const goToToday = () => {
        props.onNavigate(Navigate.TODAY);
    };

    const goToSpecificDate = (newDate: Date) => {
        props.onNavigate(Navigate.DATE, newDate);
    };

    useEffect(() => {
        if (selectedDate) {
            goToSpecificDate(selectedDate);
        }
    }, [selectedDate]);

    return (
        <div className='flex items-center justify-between mb-3'>
            <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>{moment(props.date).format('DD MMMM YYYY')}</h4>
            <div className='flex gap-5'>
                <DatePicker setDate={setSelectedDate} date={selectedDate}/>
                <div className='gap-1 flex'>
                    <Button variant={'secondary'} onClick={goToBack}>&#8249;</Button>
                    <Button onClick={goToToday}>today</Button>
                    <Button variant={'secondary'} onClick={goToNext}>&#8250;</Button>
                </div>
                <Tabs defaultValue="month" className="flex justify-end">
                    <TabsList>
                        <TabsTrigger value="month" onClick={goToMonthView}>month</TabsTrigger>
                        <TabsTrigger value="week" onClick={goToWeekView}>week</TabsTrigger>
                        <TabsTrigger value="day" onClick={goToDayView}>day</TabsTrigger>
                    </TabsList>
                </Tabs>
                
                {/* TODO */}
                <Button>Add Event </Button>
            </div>
        </div>
    );
};

export default CustomToolbar;
