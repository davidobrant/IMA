import useSignIn from "@/hooks/useSignin";
import { ActionIcon, Box} from "@mantine/core";
import Link from "next/link";
import { Logout} from 'tabler-icons-react'
import ToggleSchemeIcon from "./toggleSchemeIcon";
import useProfile from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import { getAuthenticatedUser } from "@/utils/getAuthenticatedUser";
import { useEffect } from "react";

const Navbar = () => {
    const router = useRouter()
    const { logout } = useSignIn()
    const { profile } = useProfile()
    const authUser = getAuthenticatedUser()

    const isAdmin = !!profile?.roles?.includes("ADMIN")

    useEffect(() => {
        if(!authUser?.token || !authUser?.userId) {
            logout()
        }
    }, [logout, authUser])

    return ( 
        <nav>
            <Box sx={({ colorScheme, colors }) => ({
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 12,
                paddingBottom: 12,
                borderBottom: `1px solid ${colorScheme === "dark" ? colors.dark[4] : colors.gray[2]}`
            })}>
                <Box 
                    sx={{
                        paddingLeft: 20,
                        cursor: "pointer"
                    }}
                    onClick={() => router.push('/')}
                >
                    IMA
                </Box>
                <Box sx={{
                    display: "flex",
                    gap: "2rem"
                }}>
                    <Link href={"/"}>Home</Link>
                    <Link href={"/mydesk"}>My Desk</Link>
                    <Link href={"/office"}>Office</Link>
                    {isAdmin ? <Link href={"/admin"}>Admin</Link> : undefined}
                </Box>
                <Box sx={{
                    paddingRight: 20,
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <ToggleSchemeIcon />
                    <ActionIcon 
                        size="md"
                        sx={{ 
                            position: "absolute",
                            right: 12,
                        }}
                        onClick={() => logout()}
                    >
                        <Logout />
                    </ActionIcon>
                </Box>
            </Box>
        </nav>
     );
}
 

export default Navbar;