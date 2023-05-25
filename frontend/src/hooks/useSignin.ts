import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import routes from '../api/routes'
import { useRouter } from 'next/navigation'

const useSignIn = () => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const { mutateAsync: login, isLoading: loginLoading } = useMutation(routes.login, {
        onSuccess: () => {
            router.push('/')
        }
    })

    const { mutateAsync: register, isLoading: registerLoading } = useMutation(routes.register, {
        onSuccess: () => {
            router.push('/')
        }
    })
    
    const { mutateAsync: addUser, isLoading: addUserLoading } = useMutation(routes.addUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['getUsers']),
            queryClient.invalidateQueries(['getActiveUsers']),
            queryClient.invalidateQueries(['getInactiveUsers'])
        }
    })

    const { mutateAsync: logoutMn, isLoading: logoutLoading } = useMutation(routes.logout)

    const logout = async () => {
        router.push('/signin')
        return
        try {
            await logoutMn()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(loginLoading || registerLoading || logoutLoading || addUserLoading) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [loginLoading, registerLoading, logoutLoading, addUserLoading])

    return {
        login, 
        loading,
        register,
        logout,
        addUser
    }
}
 
export default useSignIn;