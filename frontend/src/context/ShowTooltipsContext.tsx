import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface Props {
    showComputors: boolean,
    setShowComputors: Dispatch<SetStateAction<boolean>>,
    showUsers: boolean,
    setShowUsers: Dispatch<SetStateAction<boolean>>,
}

export const ShowTooltipsContext = createContext({} as Props)

export const useShowTooltips = () => {
    return useContext(ShowTooltipsContext)
}

export const ShowTooltipsProvider = ({ children }: {children: ReactNode}) => {

    const [showUsers, setShowUsers] = useState<boolean>(false)
    const [showComputors, setShowComputors] = useState<boolean>(false)

    return (
        <ShowTooltipsContext.Provider
            value={{
                showComputors, 
                setShowComputors,
                showUsers, 
                setShowUsers,
            }}
        >
            {children}
        </ShowTooltipsContext.Provider>
    )
}