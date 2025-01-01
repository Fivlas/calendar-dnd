import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Navigate, ToolbarProps } from 'react-big-calendar';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { DatePicker } from '../ui/datePicker';
import { useEffect, useState } from 'react';

type ViewTypes = "day" | "week" | "month" | "agenda";

const CustomToolbar: React.FC<ToolbarProps<EventData, object>> = (props) => {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [view, setView] = useState<ViewTypes>('month');

    const handleViewChange = (view: ViewTypes) => {
        props.onView(view);
        setView(view);
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

    const renderDate = () => {
        const date = props.date;
        switch (view) {
            case "day":
                return moment(date).format('dddd, MMMM D');
            case "week":
                const isSameMonth = moment(date).isSame(moment(date).add(1, "week"), "month");
                return moment(date).format("MMMM D") + ' - ' + moment(date).add(1, "week").format(`${isSameMonth ? "D" : "MMMM D"}`);
            case "month":
                return moment(date).format('MMMM YYYY');
            case "agenda":
                return moment(date).format('DD/MM/YYYY') + ' - ' + moment(date).add(1, "week").format('DD/MM/YYYY');
            default:
                return '';
        }
    };

    useEffect(() => {
        if (selectedDate) {
            goToSpecificDate(selectedDate);
        }
    }, [selectedDate]);


    return (
        <div className='flex flex-col'>
            <h4 className='text-center scroll-m-20 text-xl font-semibold tracking-tight'>
                {renderDate()}
            </h4>
            <div className='flex items-center justify-between mb-3'>
                <div className='flex flex-col md:flex-row gap-3'>
                    <div className='gap-1 flex'>
                        <Button variant={'secondary'} onClick={goToBack}>&#8249;</Button>
                        <Button onClick={goToToday}>today</Button>
                        <Button variant={'secondary'} onClick={goToNext}>&#8250;</Button>
                    </div>
                    <DatePicker setDate={setSelectedDate} date={selectedDate} />
                </div>

                <div className='flex flex-col md:flex-row gap-3'>
                    <Tabs defaultValue="month">
                        <TabsList>
                            <TabsTrigger value="month" onClick={() => handleViewChange("month")}>month</TabsTrigger>
                            <TabsTrigger value="week" onClick={() => handleViewChange("week")}>week</TabsTrigger>
                            <TabsTrigger value="day" onClick={() => handleViewChange("day")}>day</TabsTrigger>
                            <TabsTrigger value="agonda" onClick={() => handleViewChange("agenda")}>list</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default CustomToolbar;
