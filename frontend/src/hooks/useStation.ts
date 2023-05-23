import { useQuery } from "@tanstack/react-query";
import routes from "../api/routes";
import { useEffect, useState } from "react";

const useStation = (stationId: number) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { 
        data: station, 
        isLoading: loadingStations 
    } = useQuery(['getStation', stationId], () => routes.getStation(stationId), {
        enabled: stationId !== 0
    })
        
    useEffect(() => {
        if (loadingStations) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [loadingStations])

    return {
        station, 
        loading
    }
}
 
export default useStation;