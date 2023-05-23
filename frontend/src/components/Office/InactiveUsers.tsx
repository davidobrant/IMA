import useUsers from "@/hooks/useUsers";
import { Avatar, Box, Tooltip} from "@mantine/core";
import UserAvatarInactive from "./UserAvatarInactive";
import useProfile from "@/hooks/useProfile";
import { UserCircle } from "tabler-icons-react";
import { useState } from "react";

const InactiveUsers = () => {
    const { inactiveUsers } = useUsers()
    const { profile } = useProfile()
    const [showUsers, setShowUsers] = useState<boolean>(false)

    return ( 
        <Box 
            sx={{ 
                position: "absolute",
                bottom: 0,
                padding: 12,
                display: "flex",
                alignItems: "center",
                userSelect: "none",
            }}
        >
            <Tooltip label={'The "Bench"'} withArrow>
                <Box
                    sx={({ colorScheme, colors}) => ({
                        height: 40,
                        width: 40,
                        background: colorScheme === "dark" ? colors.dark[9] : colors.gray[5],
                        marginRight: 12,
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: colorScheme === "dark" ? "0 0 2px 2px rgba(255, 255, 255, .3)": "0 0 2px 2px rgba(0, 0, 0, .3)",
                        cursor: "pointer",
                        userSelect: "none",

                        "&:hover": {
                            transform: "scale(1.1)",
                            background: colorScheme === "dark" ? colors.yellow[9] : colors.yellow[5],
                        }
                    })}
                    onClick={() => setShowUsers(!showUsers)}
                >
                    <UserCircle />
                </Box>
            </Tooltip>
            <Box
                sx={({ colorScheme, colors, shadows }) => ({
                    position: "absolute",
                    top: 6,
                    left: 6,
                    fontSize: ".7rem",
                    fontWeight: 600,
                    color: colorScheme === "dark" ? colors.dark[7]: colors.gray[8] ,
                    background: colorScheme === "dark" ? colors.yellow[6]: colors.yellow[5],
                    borderRadius: "50%",   
                    width: "1.1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: shadows.xs,
                    userSelect: "none",
                    pointerEvents: "none",
                })}
            >
                {inactiveUsers ? inactiveUsers.length : 0}
            </Box>
            {showUsers ? <Avatar.Group>
                {inactiveUsers ? inactiveUsers.map((user) => {
                    const isActiveUser = !!(profile?.userId === user?.userId)
                    return (
                        <UserAvatarInactive key={user.userId} isActiveUser={isActiveUser} user={user}/>
                    )
                }): undefined} 
            </Avatar.Group> : undefined}
        </Box>
     );
}
 
export default InactiveUsers;