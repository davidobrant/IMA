import { IGetUserResponse } from "@/utils/types";
import { Avatar, Tooltip, createStyles } from "@mantine/core";
import { useState } from "react";

const UserAvatarInactive = ({ user, isActiveUser }: { user: IGetUserResponse, isActiveUser: boolean }) => {
    const { classes, cx } = useStyles()
    const initials = `${user?.firstName?.toString()[0]?.toUpperCase()}${user?.lastName?.toString()[0]?.toUpperCase()}`
    const [dragging, setDragging] = useState<boolean>(false)

    const onDragStart = (e: any, params: any) => {
        if(!user) {
            return;
        }
        setDragging(true)
        e.dataTransfer.setData("userParams", JSON.stringify(params))
    }

    return ( 
        <Tooltip label={user ? `${user.firstName} ${user.lastName}` : "Available"} withArrow>
            <Avatar 
                draggable={!!user}
                onDragStart={(e) => onDragStart(e, user)}
                onDragEnd={() => setDragging(false)}
                variant="unstyled"
                radius={"xl"}
                className={cx(
                    classes.avatar, {
                        [classes.active]: isActiveUser, 
                        [classes.available]: !user, 
                        [classes.dragging]: dragging,                     
                    })}
            >
                {user ? initials : null}
            </Avatar>
        </Tooltip>
    );
}
 
export default UserAvatarInactive;

const useStyles = createStyles(({ colors, colorScheme, shadows }) => ({
    avatar: {
        background: colorScheme === "dark" ? colors.dark[5] : colors.gray[4],
        cursor: "pointer",
        letterSpacing: 1.3,
        boxShadow: colorScheme === "dark" ? "0 0 2px 2px rgba(255, 255, 255, .3)": "0 0 2px 2px rgba(0, 0, 0, .3)",
        border: colorScheme === "dark" ? "1px solid white" : "1px solid rgba(0,0,0,.1)",

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