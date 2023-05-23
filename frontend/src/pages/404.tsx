import { Box, Stack, Text } from "@mantine/core";
import Link from "next/link";

const NotFound = () => {
    return ( 
        <Stack>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text>Not Found</Text>
                <Link href="/">Back home</Link> 
            </Box>
        </Stack>
     );
}
 
export default NotFound;