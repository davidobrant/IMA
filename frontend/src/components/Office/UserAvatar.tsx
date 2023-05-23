import useUserActions from "@/hooks/useUserActions";
import useUsers from "@/hooks/useUsers";
import { IGetStationResponse } from "@/utils/types";
import { Avatar, Tooltip, createStyles } from "@mantine/core";
import { useState } from "react";

const UserAvatar = ({ station, isActiveUser }: { station: IGetStationResponse, isActiveUser: boolean }) => {
    const { classes, cx } = useStyles()
    const { getUserById } = useUsers()
    const user = getUserById(Number(station.userId))
    const initials = `${user?.firstName?.toString()[0]?.toUpperCase()}${user?.lastName?.toString()[0]?.toUpperCase()}`
    const [dragging, setDragging] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)
    const { moveUserToStation, moveUserToStationFromBench } = useUserActions()

    const onDragStart = (e: any, params: any) => {
        if(!user) {
            return;
        }
        setDragging(true)
        e.dataTransfer.setData("userParams", JSON.stringify(params))
    }

    const onDragOver = (e: any) => {
        e.preventDefault()
        setHover(true)
    }
    
    const onDrop = async (e: any, params: IGetStationResponse) => {
        const data = JSON.parse(e.dataTransfer.getData("userParams"))
        setHover(false)
        try {
            if(data.stationId) {
                await moveUserToStation({ userId: data.userId, fromStation: data.stationId, toStation: params.stationId})
            } 
            if(!data.stationId) {
                await moveUserToStationFromBench({ userId: data.userId, toStation: params.stationId})
            }
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <Tooltip label={user ? `${user.firstName} ${user.lastName}` : "Available"} withArrow>
            <Avatar 
                draggable={!!user}
                onDragStart={(e) => onDragStart(e, {...user, ...station})}
                onDragOver={(e) => onDragOver(e)}
                onDragEnter={() => setHover(true)}
                onDragLeave={() => setHover(false)}
                onDragEnd={() => setDragging(false)}
                onDrop={(e) => onDrop(e, station)}
                variant="unstyled"
                radius={"xl"}
                className={cx(
                    classes.avatar, {
                        [classes.active]: isActiveUser, 
                        [classes.available]: !user, 
                        [classes.dragging]: dragging, 
                        [classes.hover]: hover, 
                    
                    })}
            >
                {user ? initials : null}
            </Avatar>
        </Tooltip>
    );
}
 
export default UserAvatar;

const useStyles = createStyles(({ colors, colorScheme, shadows }) => ({
    avatar: {
        background: colorScheme === "dark" ? colors.cyan[9] : colors.cyan[5],
        cursor: "pointer",
        letterSpacing: 1.3,
        boxShadow: colorScheme === "dark" ? "0 0 2px 2px rgba(255, 255, 255, .3)": "0 0 2px 2px rgba(0, 0, 0, .3)",
        border: colorScheme === "dark" ? "1px solid white" : "1px solid rgba(0,0,0,.1)",
        userSelect: "none",

        "& .mantine-Avatar-placeholderIcon": {
            userSelect: "none",
            pointerEvents: "none"
        },

        "&:hover": {
            transform: "scale(1.1)"
        }
    },
    active: {
        background: colorScheme === "dark" ? colors.red[7] : colors.red[5]
    },
    available: {
        background: colorScheme === "dark" ? colors.green[7] : colors.green[4]
    },
    dragging: {
        opacity: .5
    },
    hover: {
        transform: "scale(1.2)"
    }
}))

function moveUserToStationFromBench(arg0: { userId: any; toStation: number; }) {
    throw new Error("Function not implemented.");
}
