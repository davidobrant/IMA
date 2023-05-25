import { useQuery } from "@tanstack/react-query";
import routes from "../api/routes";
import { useEffect, useState } from "react";

const useStations = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const { 
        data: stations, 
        isLoading: loadingStations,
        isError: errorStations 
    } = useQuery(['getStations'], routes.getStations, {
        refetchInterval: 3000
    })

    const getStationByUserId = (userId: number) => {
        return stations?.find(s => s.userId === userId)
    }
    
    const getAvailableStations = () => {
        return stations?.filter(s => s.userId === null)
    }
        
    useEffect(() => {
        if (loadingStations) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [loadingStations])
    
    useEffect(() => {
        if (errorStations) {
            setError(true)
        } else {
            setError(false)
        }
    }, [errorStations])

    return {
        stations, 
        getStationByUserId,
        getAvailableStations,
        loading,
        error
    }
}
 
export default useStations;