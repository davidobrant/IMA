import { IGetStationResponse } from "@/utils/types";
import { Box, Tooltip, createStyles } from "@mantine/core";
import UserAvatar from "./UserAvatar";
import useProfile from "@/hooks/useProfile";
import { DeviceLaptop } from "tabler-icons-react";

const Station = ({ station, showComputors }: { station: IGetStationResponse, showComputors: boolean }) => {
    const { profile } = useProfile()
    const isActiveUser = !!(profile?.userId === station?.userId)
    const isRight = !!(station.stationId % 2 === 0)
    const { classes, cx } = useStyles()

    return ( 
        <>
            <Box 
                sx={{ 
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <Box className={cx(classes.computor)}>
                    <Tooltip label={station.computorId} opened={showComputors} withArrow>
                        <Box className={cx(classes.computorIcon, {[classes.computorRight]: isRight, [classes.computorLeft]: !isRight})}>
                            <DeviceLaptop size={40}/>
                        </Box>
                    </Tooltip>
                </Box>
                <Box className={cx(classes.avatar, {[classes.avatarRight]: isRight, [classes.avatarLeft]: !isRight})}>
                    <UserAvatar 
                        station={station} 
                        isActiveUser={isActiveUser}
                    />
                </Box>
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
    computorIcon: {
        position: "absolute",
    },
    computorRight: {
        transform: "rotate(-90deg)",
    },
    computorLeft: {
        transform: "rotate(90deg)"
    },
    computorText: {

    }
}))