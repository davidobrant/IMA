import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";

const ToggleSchemeIcon = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme() 

    return ( 
        <ActionIcon
            onClick={() => toggleColorScheme()}
            size="sm"
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
                position: "absolute",
                right: 60
            })}
        >
            {colorScheme === 'dark' ? <Sun /> : <MoonStars />}
        </ActionIcon>
     );
}
 
export default ToggleSchemeIcon;