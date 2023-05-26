import { useDragging } from "@/context/DraggingContext";
import { useShowTooltips } from "@/context/ShowTooltipsContext";
import useComputors from "@/hooks/useComputors";
import { IGetStationResponse } from "@/utils/types";
import { Box, Tooltip, createStyles } from "@mantine/core";
import { useState } from "react";
import { DeviceLaptop } from "tabler-icons-react";

const ComputorAvatar = ({ 
    station, 
    isRight, 
    dragOver 
}: { 
    station: IGetStationResponse, 
    isRight: boolean,
    dragOver: boolean
}) => {
    const { classes, cx } = useStyles()
    const { showComputors } = useShowTooltips()
    const [hover, setHover] = useState<boolean>(false)
    const { getComputorById } = useComputors() 
    const { setDraggingComputor } = useDragging()
    const [dragging, setDragging] = useState<boolean>(false)

    const computor = getComputorById(station.computorId)

    const onDragStart = (e: any, params: any) => {
        e.dataTransfer.setData("computorParams", JSON.stringify(params))
        setDragging(true)
        setDraggingComputor(true)
    }

    const onDragEnd = (e: any) => {
        setDragging(false)
        setDraggingComputor(false)
    }

    return ( 
        <Tooltip 
            label={computor?.serialNr} 
            opened={showComputors || hover} 
            events={{ hover: true, focus: true, touch: false}} 
            withArrow
        >
            <Box 
                className={
                    cx(classes.computorIcon, {
                        [classes.computorRight]: isRight, 
                        [classes.computorLeft]: !isRight,
                        [classes.dragOver]: dragOver,
                        [classes.dragging]: dragging
                        
                    })}
                draggable
                onDragStart={(e) => onDragStart(e, station)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onDragEnd={onDragEnd}
            >
                <DeviceLaptop size={40}/>
            </Box>
        </Tooltip>
     );
}
 
export default ComputorAvatar;

const useStyles = createStyles(() => ({
    computorIcon: {
        position: "absolute",
        cursor: "pointer"
    },
    computorRight: {
        transform: "rotate(-90deg)",
    },
    computorLeft: {
        transform: "rotate(90deg)"
    },
    computorText: {

    },
    dragOver: {
        userSelect: "none",
        pointerEvents: "none",

        "& .icon": {
            userSelect: "none",
            pointerEvents: "none",
        }
    },
    dragging: {
        opacity: .5
    }
}))