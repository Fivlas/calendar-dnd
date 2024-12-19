import { DateCellWrapperProps } from "react-big-calendar";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";

const CustomDateCellWrapper = (props: DateCellWrapperProps) => {
    const excludedClassNames = ["rbc-off-range-bg", "rbc-today"];
    const shouldHaveZIndex = !excludedClassNames.some(className => 
        (props.children.props.className || "").includes(className)
    );

    return (
        <ContextMenu>
            <ContextMenuTrigger 
                className={`w-full ${props.children.props.className} ${shouldHaveZIndex ? "z-[1]" : ""}`}>
                {props.children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem className="px-2.5 md:px-2" onClick={() => console.log(props.value as Date)}>
                    Add Event
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}

export default CustomDateCellWrapper;