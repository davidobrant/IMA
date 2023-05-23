import { useQuery } from "@tanstack/react-query";
import routes from "../api/routes";
import { useEffect, useState } from "react";

const useUsers = () => {
    const [loading, setLoading] = useState<boolean>(false)
    
    const { 
        data: users, 
        isLoading: loadingUser 
    } = useQuery(['getUsers'], routes.getUsers)

    const { 
        data: activeUsers, 
        isLoading: loadingActiveUsers 
    } = useQuery(['getActiveUsers'], routes.getActiveUsers)
    
    const { 
        data: inactiveUsers, 
        isLoading: loadingInactiveUsers 
    } = useQuery(['getInactiveUsers'], routes.getInactiveUsers)
        
    const getUserById = (userId: number) => {
        return users?.find(user => user.userId === userId)
    }

    useEffect(() => {
        if (loadingUser || loadingActiveUsers || loadingInactiveUsers) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [loadingUser, loadingActiveUsers, loadingInactiveUsers])

    return {
        users, 
        activeUsers,
        inactiveUsers,
        loading,
        getUserById,
    }
}
 
export default useUsers;