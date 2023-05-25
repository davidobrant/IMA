import { useShowTooltips } from "@/context/ShowTooltipsContext";
import { Box } from "@mantine/core";
import { ReactNode } from "react";
import { DeviceLaptop, UserCircle} from "tabler-icons-react";

const ToolBar = () => {

    const { 
        showComputors, 
        setShowComputors,
        showUsers, 
        setShowUsers,
    } = useShowTooltips()

    return ( 
        <>  
            <Box 
                sx={({ colorScheme, colors }) => ({
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: colorScheme === "dark" ? colors.dark[3] : colors.gray[4],
                    borderRadius: 4,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    padding: 4,
                    margin: 4,
                    gap: 2,
                })}
                >
                <ItemContainer show={showUsers}>
                    <UserCircle onClick={() => setShowUsers(!showUsers)}/>
                </ItemContainer>
                <ItemContainer show={showComputors}>
                    <DeviceLaptop onClick={() => setShowComputors(!showComputors)}/>
                </ItemContainer>
            </Box>
        </>
     );
}
 
export default ToolBar;

const ItemContainer = ({ children, show }: {children: ReactNode, show: boolean}) => {
    return (
        <Box
            sx={({ colors, colorScheme}) => ({
                background: show ? colorScheme === "dark" ? colors.dark[5] : colors.gray[3] : undefined,
                borderRadius: 4,
                display: "grid",
                placeContent: "center",
                cursor: "pointer",

                "&:hover": {
                    color: colorScheme === "dark" ? colors.teal[7] : colors.teal[6]
                }
            })}
        >{children}</Box>
    )
}