import { useDragging } from "@/context/DraggingContext";
import useStationActions from "@/hooks/useStationActions";
import useUserActions from "@/hooks/useUserActions";
import { Box, Loader, Tooltip } from "@mantine/core";
import { useState } from "react";
import { HomeDown } from "tabler-icons-react";

const DropZone = () => {
    const [hover, setHover] = useState<boolean>(false)
    const { benchUser, loading } = useUserActions()
    const { moveComputorToService } = useStationActions()
    const { 
        draggingUser, 
        setDraggingUser, 
        draggingComputor, 
        setDraggingComputor 
    } = useDragging()
    
    const onDragOver = (e: any) => {
        e.preventDefault()
        setHover(true)
    }

    const onDrop = async (e: any) => {
        setHover(false)
        let userData;
        let computorData;
        if(draggingUser) {
            userData = JSON.parse(e.dataTransfer.getData('userParams'))
            setDraggingUser(false)
        }
        if(draggingComputor) {
            computorData = JSON.parse(e.dataTransfer.getData('computorParams'))
            setDraggingComputor(false)
        }
        if(!userData?.stationId && !computorData?.stationId) {
            return
        }
        if(userData) {
            try {
                await benchUser({ userId: userData?.userId, stationId: userData?.stationId})
            } catch (error) {
                console.log(error)
            }
        }
        if(computorData) {
            try {
                await moveComputorToService({ fromStation: computorData?.stationId})
            } catch (error) {
                
            }
        }
    }

    return ( 
        <Box
            sx={{
                position: "absolute",
                bottom: 12,
                left: "50%",
                transform: "translateX(-50%)",
            }}
        >
            <Tooltip label={"Dropzone"} withArrow>
                <Box
                    sx={({ colorScheme, colors}) => ({
                        height: 48,
                        width: 48,
                        background: colorScheme === "dark" ? hover ? colors.green[9] : colors.dark[9] : hover ? colors.green[5] : colors.gray[5],
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: colorScheme === "dark" ? "0 0 2px 2px rgba(255, 255, 255, .3)": "0 0 2px 2px rgba(0, 0, 0, .3)",
                        transform: hover ? "scale(1.1)" : undefined,
                        overflow: "hidden",
                        
                        "& .icon": {
                            userSelect: "none",
                            pointerEvents: "none"
                        },

                        "&:hover": {
                            transform: "scale(1.1)",
                            background: colorScheme === "dark" ? colors.green[9] : colors.green[5],
                        }
                    })}
                    onDragOver={(e) => onDragOver(e)}
                    onDragLeave={() => setHover(false)}
                    onDrop={(e) => onDrop(e)}
                >
                    {!loading ? <HomeDown /> : <Loader /> }
                </Box>
            </Tooltip>
                        </Box>
     );
}
 
export default DropZone;