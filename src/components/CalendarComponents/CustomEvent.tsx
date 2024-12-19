import { EventProps } from 'react-big-calendar'

const CustomEvent = (props : EventProps) => {
  return (
    <div className='bg-primary'>
      {/* @ts-ignore */}
        {props.event.title}
    </div>
  )
}

export default CustomEvent