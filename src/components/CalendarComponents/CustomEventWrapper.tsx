import { EventWrapperProps } from "react-big-calendar";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";

const CustomEventWrapper = (props: EventWrapperProps & { children?: React.ReactNode }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent>
        {/* @ts-ignore */}
        <ContextMenuItem className="px-2.5 md:px-2" onClick={() => console.log(props.event.id)}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default CustomEventWrapper;
