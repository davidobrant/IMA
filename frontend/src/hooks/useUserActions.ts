import routes from "@/api/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useUserActions = () => {
    const queryQlient = useQueryClient()
    const [loading, setLoading] = useState<boolean>()

    const { mutateAsync: moveUserToStation, isLoading: loadingMove } = useMutation(routes.moveUserToStation, {
        onSuccess: () => {
            queryQlient.invalidateQueries(['getStations']),
            queryQlient.invalidateQueries(['getInactiveUsers'])
        }
    })
    
    const { mutateAsync: moveUserToStationFromBench, isLoading: loadingMoveFromBench } = useMutation(routes.moveUserToStationFromBench, {
        onSuccess: () => {
            queryQlient.invalidateQueries(['getStations']),
            queryQlient.invalidateQueries(['getInactiveUsers'])
        }
    })
    
    const { mutateAsync: benchUser, isLoading: loadingBench } = useMutation(routes.benchUser, {
        onSuccess: () => {
            queryQlient.invalidateQueries(['getStations']),
            queryQlient.invalidateQueries(['getInactiveUsers'])
        }
    })

    useEffect(() => {
        if(loadingMove || loadingMoveFromBench || loadingBench) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [loadingMove, loadingMoveFromBench, loadingBench])


    return {
        moveUserToStation,
        moveUserToStationFromBench,
        benchUser,
        loading
    }
}
 
export default useUserActions;