import { IGetStationResponse } from "@/utils/types";
import { Box, createStyles } from "@mantine/core";
import UserAvatar from "./UserAvatar";
import useProfile from "@/hooks/useProfile";
import ComputorAvatar from "./ComputorAvatar";
import { useState } from "react";
import { useDragging } from "@/context/DraggingContext";
import useStationActions from "@/hooks/useStationActions";

const Station = ({ station }: { station: IGetStationResponse }) => {
    const { profile } = useProfile()
    const isActiveUser = !!(profile?.userId === station?.userId)
    const isRight = !!(station.stationId % 2 === 0)
    const { classes, cx } = useStyles()
    const [hover, setHover] = useState<boolean>(false)
    const { draggingUser, draggingComputor, setDraggingComputor } = useDragging()
    const { moveComputorFromStation, moveComputorFromService } = useStationActions()

    const onDragOver = (e:any, params: any) => {
        if(draggingUser) return
        e.preventDefault()
        setHover(true)
    }
    
    const onDrop = async (e: any, params: any) => {
        if(!draggingComputor) return
        setHover(false)
        setDraggingComputor(false)
        const data = JSON.parse(e.dataTransfer.getData("computorParams"))
        try {
            if(data?.stationId) {
                await moveComputorFromStation({ computorId: data.computorId, fromStation: data.stationId, toStation: params.stationId })
            } else {
                await moveComputorFromService({ computorId: data.computorId, toStation: params.stationId})
            }
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <>
            <Box 
                sx={({ colors, colorScheme }) =>({ 
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    background: hover ? colorScheme === "dark" ? colors.green[7] : colors.green[3] : undefined,
                })}
                onDragOver={(e) => onDragOver(e, station)}
                onDragLeave={() => setHover(false)}
                onDrop={(e) => onDrop(e, station)}
            >
                <Box className={cx(classes.computor)} >
                    {station.computorId ? 
                        <ComputorAvatar 
                            station={station} 
                            isRight={isRight} 
                            dragOver={hover}
                        /> 
                    : undefined}
                </Box>
            </Box>
            <Box className={cx(classes.avatar, {[classes.avatarRight]: isRight, [classes.avatarLeft]: !isRight})}>
                <UserAvatar 
                    station={station} 
                    isActiveUser={isActiveUser}
                />
            </Box>
        </>
     );
}
 
export default Station;

const useStyles = createStyles(() => ({
    avatar: {
        position: "absolute",
        top: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "translateY(-50%)"
    },
    avatarRight: {
        right: -60
    },
    avatarLeft: {
        left: -60
    },
    computor: {
        position: "absolute",
        top: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "translateY(-50%)",
    }, 
}))