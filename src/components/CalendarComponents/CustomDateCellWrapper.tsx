import { DateCellWrapperProps } from "react-big-calendar";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { useStore } from "@/store/openModal";

const CustomDateCellWrapper = (props: DateCellWrapperProps) => {
    const { toggleCreateModal, setModalData} = useStore();

    const excludedClassNames = ["rbc-off-range-bg", "rbc-today"];
    const shouldHaveZIndex = !excludedClassNames.some((className) =>
        (props.children.props.className || "").includes(className)
    );

    const clickHanlder = () => {
        toggleCreateModal();
        setModalData(props);
    }

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger
                    className={`pointer-events-auto ${props.children.props.className} ${
                        shouldHaveZIndex ? "" : ""
                    }`}
                >
                    {props.children}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem
                        className="px-2.5 md:px-2"
                        onClick={clickHanlder} // Toggle modal when clicked
                    >
                        Add Event
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </>
    );
};

export default CustomDateCellWrapper;
