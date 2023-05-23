import { useQuery } from "@tanstack/react-query";
import routes from "../api/routes";
import { useEffect, useState } from "react";

const useUser = (userId: number) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { data: user, isLoading: loadingUser } = useQuery(['getUser', userId], () => routes.getUser(userId))
        
    useEffect(() => {
        if (loadingUser) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [loadingUser])

    return {
        user, 
        loading
    }
}
 
export default useUser;