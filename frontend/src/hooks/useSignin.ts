import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import routes from '../api/routes'
import { useRouter } from 'next/navigation'

const useSignIn = () => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

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

    const { mutateAsync: logoutMn, isLoading: logoutLoading } = useMutation(routes.logout)

    const logout = async () => {
        try {
            await logoutMn()
        } catch (err) {
            console.log(err)
        }
        router.push('/signin')
    }

    useEffect(() => {
        if(loginLoading || registerLoading || logoutLoading) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [loginLoading, registerLoading, logoutLoading])

    return {
        login, 
        loading,
        register,
        logout
    }
}
 
export default useSignIn;