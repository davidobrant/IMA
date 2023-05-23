import { Box, Stack } from "@mantine/core";
import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import { usePathname } from 'next/navigation'
import ToggleSchemeIcon from "./toggleSchemeIcon";
import { getAuthenticatedUser } from "@/utils/getAuthenticatedUser";
import useSignIn from "@/hooks/useSignin";
import LoadingIndicator from "./LoadingIndicator";

const Layout = ({ children }: { children: ReactNode}) => {
    const pathname = usePathname()
    const user = getAuthenticatedUser()
    const { logout, loading } = useSignIn()

    useEffect(() => {
        if(!user) {
            logout()
        }
    }, [user, logout])

    if(pathname === '/signin') {
        return (
            <Stack>
                <Box 
                    sx={{ 
                        position: "absolute",
                        top: 8,
                        right: -52
                    }}
                >
                    <ToggleSchemeIcon />
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexGrow: 1,
                    marginTop: 20
                }}>
                    {children}
            </Box>
        </Stack>
        )
    }

    return ( 
        <Stack>
            <Navbar />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexGrow: 1,
                marginTop: 20,
            }}>
                {!loading ? children : <LoadingIndicator />}
            </Box>
        </Stack>
     );
}
 
export default Layout;