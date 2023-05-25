import { useQuery } from "@tanstack/react-query";
import routes from "../api/routes";
import { useEffect, useState } from "react";

const useUsers = () => {
    const [loading, setLoading] = useState<boolean>(false)
    
    const { 
        data: users, 
        isLoading: loadingUsers 
    } = useQuery(['getUsers'], routes.getUsers)
    
    const { 
        data: admins, 
        isLoading: loadingAdmins 
    } = useQuery(['getAdmins'], routes.getAdmins)

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
        if (loadingUsers || loadingActiveUsers || loadingInactiveUsers) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [loadingUsers, loadingActiveUsers, loadingInactiveUsers])

    return {
        users, 
        activeUsers: activeUsers?.sort((a,b) => a.userId - b.userId),
        inactiveUsers,
        loading,
        getUserById,
        admins,
    }
}
 
export default useUsers;