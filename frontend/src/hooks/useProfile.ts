import routes from "@/api/routes"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const useProfile = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const {
        data: profile, 
        isLoading: loadingProfile,
    } = useQuery(['Profile'], routes.getProfile)

    useEffect(() => {
        if(loadingProfile) {
            setLoading(true)
        } else {
            setLoading(false)
        }

    }, [loadingProfile])

    return {
        profile,
        loading
    }
}

export default useProfile