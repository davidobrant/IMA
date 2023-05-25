import { useDragging } from "@/context/DraggingContext"
import { useShowTooltips } from "@/context/ShowTooltipsContext"
import { IGetComputorResponse } from "@/utils/types"
import { Avatar, Box, Tooltip, createStyles } from "@mantine/core"
import { useState } from "react"
import { DeviceLaptop } from "tabler-icons-react"

const ComputorAvatarInactive = ({
    computor,
}: { 
    computor: IGetComputorResponse,
}) => {
    const { classes, cx } = useStyles()
    const { showComputors } = useShowTooltips()
    const [hover, setHover] = useState<boolean>(false)
    const { setDraggingComputor } = useDragging()

    const onDragStart = (e: any, params: any) => {
        e.dataTransfer.setData("computorParams", JSON.stringify(params))
        setDraggingComputor(true)
    }

    return (  
        <Tooltip 
            label={computor?.serialNr} 
            opened={hover} 
            events={{ hover: true, focus: true, touch: false}} 
            withArrow
        >
            <Avatar 
                className={classes.avatar}
                >
                <Box 
                    className={cx(classes.computorIcon)}
                    draggable
                    onDragStart={(e) => onDragStart(e, computor)}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}    
                >
                    <DeviceLaptop size={28}
                />
                </Box>
            </Avatar>
        </Tooltip>
    );
}
 
export default ComputorAvatarInactive;

const useStyles = createStyles(({ colorScheme, colors }) => ({
    avatar: {
        boxShadow: colorScheme === "dark" ? "0 0 2px 2px rgba(255, 255, 255, .3)": "0 0 2px 2px rgba(0, 0, 0, .3)",
        border: colorScheme === "dark" ? "1px solid white" : "1px solid rgba(0,0,0,.1)",
        borderRadius: "50%",
        background: colorScheme === "dark" ? colors.dark[5] : colors.gray[4],

        "&:hover": {
            transform: "scale(1.1)"
        }
    },
    computorIcon: {
        position: "absolute",
        cursor: "pointer",
        color: colorScheme === "dark" ? colors.dark[0] : colors.gray[9],
        background: "transparent"
    },
}))