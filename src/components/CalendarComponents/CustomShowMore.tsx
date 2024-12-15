import { ShowMoreProps } from 'react-big-calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import moment from 'moment';
import { Separator } from '../ui/separator';

const CustomShowMore = (props: ShowMoreProps) => {
    console.log(props)
    return (
        <Popover>
            <PopoverTrigger>
                <div className='rbc-show-more !text-primary'>+{props.count} more</div>
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