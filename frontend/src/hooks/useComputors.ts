import routes from "@/api/routes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

const useComputors = (computorId?: number) => {
    const [loading, setLoading] = useState<boolean>(false)
    const queryQlient = useQueryClient()

    const { 
        data: computors,
        isLoading: loadingComputors,
        isError: errorComputors
    } = useQuery(["getComputors"], routes.getComputors)
    
    const { 
        data: activeComputors,
        isLoading: loadingActiveComputors,
        isError: errorActiveComputors
    } = useQuery(["getActiveComputors"], routes.getActiveComputors)
    
    const { 
        data: inactiveComputors,
        isLoading: loadingInactiveComputors,
        isError: errorInactiveComputors
    } = useQuery(["getInactiveComputors"], routes.getInactiveComputors)
    
    const { 
        data: computor,
        isLoading: loadingComputor,
        isError: errorComputor
    } = useQuery(["getComputor", computorId], () => routes.getComputor(computorId), {
        enabled: !!computorId
    })

    const getComputorById = useCallback((computorId: number) => {
        return computors?.find(c => c.computorId === computorId)
    }, [computors])

    const { mutateAsync: addComputor, isLoading: loadingAddComputor } = useMutation(routes.addComputor, {
        onSuccess: () => {
            queryQlient.invalidateQueries(['getComputors'])
        }
    })

    useEffect(() => {
        if(loadingComputor || loadingComputors) {
            setLoading(true)
        } else {
            setLoading(false)
        }

    }, [loadingComputor, loadingComputors])

    return {
        computors, 
        activeComputors: activeComputors?.sort((a,b) => a.computorId - b.computorId),
        inactiveComputors,
        computor, 
        loading,
        getComputorById,
        addComputor,
    }
}

export default useComputors