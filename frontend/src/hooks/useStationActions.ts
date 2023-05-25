import routes from "@/api/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useStationActions = () => {
    const queryQlient = useQueryClient()
    const [loading, setLoading] = useState<boolean>()

    const { mutateAsync: moveComputorFromStation, isLoading: loadingMoveFromStation } = useMutation(routes.moveComputorFromStation, {
        onSuccess: () => {
            queryQlient.invalidateQueries(['getStations']),
            queryQlient.invalidateQueries(['getInactiveComputors']),
            queryQlient.invalidateQueries(['getActiveComputors']),
            queryQlient.invalidateQueries(['getComputors'])
        }
    })
    
    const { mutateAsync: moveComputorFromService, isLoading: loadingMoveFromService } = useMutation(routes.moveComputorFromService, {
        onSuccess: () => {
            queryQlient.invalidateQueries(['getStations']),
            queryQlient.invalidateQueries(['getInactiveComputors']),
            queryQlient.invalidateQueries(['getActiveComputors']),
            queryQlient.invalidateQueries(['getComputors'])
        }
    })
    
    const { mutateAsync: moveComputorToService, isLoading: loadingMoveToService } = useMutation(routes.moveComputorToService, {
        onSuccess: () => {
            queryQlient.invalidateQueries(['getStations']),
            queryQlient.invalidateQueries(['getInactiveComputors']),
            queryQlient.invalidateQueries(['getActiveComputors']),
            queryQlient.invalidateQueries(['getComputors'])
        }
    })
    
    const { mutateAsync: deleteComputor, isLoading: loadingDelete } = useMutation(routes.deleteComputor, {
        onSuccess: () => {
            queryQlient.invalidateQueries(['getStations']),
            queryQlient.invalidateQueries(['getInactiveComputors']),
            queryQlient.invalidateQueries(['getActiveComputors']),
            queryQlient.invalidateQueries(['getComputors'])
        }
    })
    
    const { mutateAsync: updateComputor, isLoading: loadingUpdate } = useMutation(routes.updateComputor, {
        onSuccess: () => {
            queryQlient.invalidateQueries(['getStations']),
            queryQlient.invalidateQueries(['getInactiveComputors']),
            queryQlient.invalidateQueries(['getActiveComputors']),
            queryQlient.invalidateQueries(['getComputors'])
        }
    })

    useEffect(() => {
        if(loadingMoveFromService || loadingMoveFromStation || loadingMoveToService) {
            setLoading(true)
        } else {
            setLoading(false)
        }

    }, [loadingMoveFromService, loadingMoveFromStation, loadingMoveToService])

    return {
        moveComputorFromStation,
        moveComputorFromService,
        moveComputorToService,
        deleteComputor,
        updateComputor,
        loading
    }
}

export default useStationActions