import { Box, Loader } from "@mantine/core";

const LoadingIndicator = () => {
    return ( 
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Loader />
        </Box>
     );
}
 
export default LoadingIndicator;