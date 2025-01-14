import { ShowMoreProps } from 'react-big-calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import moment from 'moment';
import { Separator } from '../ui/separator';

const CustomShowMore = (props: ShowMoreProps) => {
    return (
        <Popover>
            <PopoverTrigger>
                <div className='relative rbc-show-more !text-primary !z-10'>+{props.count} more</div>
            </PopoverTrigger>
            <PopoverContent>
                {moment(props.slotDate).format("D MMMM YYYY")}
                <Separator className="my-1" />
                {props.remainingEvents.map((event, index) => (
                    <p key={index} className='cursor-pointer'>{event.title}</p>
                ))}
            </PopoverContent>
        </Popover>
    )
}

export default CustomShowMore