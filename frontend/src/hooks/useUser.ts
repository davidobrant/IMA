import { useQuery } from "@tanstack/react-query";
import routes from "../api/routes";
import { useEffect, useState } from "react";

const useUser = (userId: number) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { data: user, isLoading: loadingUser } = useQuery(['getUser', userId], () => routes.getUser(userId))
        
    const { 
        data: station, 
        isLoading: loadingStation 
    } = useQuery(['getStationByUser', userId], () => routes.getStationByUserId(userId), {
        enabled: userId !== 0 || userId !== undefined
    })

    useEffect(() => {
        if (loadingUser || loadingStation) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [loadingUser, loadingStation])

    return {
        user, 
        station,
        loading
    }
}
 
export default useUser;