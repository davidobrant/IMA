import { Avatar, Box, Tooltip} from "@mantine/core";
import { DeviceLaptop} from "tabler-icons-react";
import { useState } from "react";
import useComputors from "@/hooks/useComputors";
import ComputorAvatarInactive from "./ComputorAvatarInactive";

const InactiveComputors = () => {
    const { inactiveComputors } = useComputors()
    const [showComputors, setShowComputors] = useState<boolean>(false)

    return ( 
        <Box 
            sx={{ 
                position: "absolute",
                bottom: 0,
                right: 0,
                padding: 12,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                userSelect: "none",
            }}
        >
            <Tooltip label={'"Service"'} withArrow>
                <Box
                    sx={({ colorScheme, colors}) => ({
                        height: 40,
                        width: 40,
                        background: colorScheme === "dark" ? colors.dark[9] : colors.gray[5],
                        marginRight: 12,
                        borderRadius: 4,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: colorScheme === "dark" ? "0 0 2px 2px rgba(255, 255, 255, .3)": "0 0 2px 2px rgba(0, 0, 0, .3)",
                        cursor: "pointer",
                        userSelect: "none",

                        "&:hover": {
                            transform: "scale(1.1)",
                            background: colorScheme === "dark" ? colors.grape[9] : colors.grape[5],
                        }
                    })}
                    onClick={() => setShowComputors(!showComputors)}
                >
                    <DeviceLaptop />
                </Box>
            </Tooltip>
            <Box
                sx={({ colorScheme, colors, shadows }) => ({
                    position: "absolute",
                    top: 6,
                    right: 12,
                    fontSize: ".7rem",
                    fontWeight: 600,
                    color: colorScheme === "dark" ? colors.dark[7]: colors.gray[8] ,
                    background: colorScheme === "dark" ? colors.grape[6]: colors.grape[5],
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
                {inactiveComputors ? inactiveComputors.length : 0}
            </Box>
            {showComputors ? 
            <Box sx={{
                position: "absolute",
                right: 80,
                top: 12,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
            }}>
                <Avatar.Group>
                    {inactiveComputors ? inactiveComputors.map((computor) => {
                        return (
                            <ComputorAvatarInactive key={computor.computorId} computor={computor} />
                            )
                        }): undefined} 
                </Avatar.Group> 
            </Box>
            : undefined}
        </Box>
     );
}
 
export default InactiveComputors;