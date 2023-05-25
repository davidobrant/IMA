import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface Props {
    draggingUser: boolean,
    setDraggingUser: Dispatch<SetStateAction<boolean>>,
    draggingComputor: boolean,
    setDraggingComputor: Dispatch<SetStateAction<boolean>>,
}

export const DraggingContext = createContext({} as Props)

export const useDragging = () => {
    return useContext(DraggingContext)
}

export const DraggingProvider = ({ children }: {children: ReactNode}) => {

    const [draggingUser, setDraggingUser] = useState<boolean>(false)
    const [draggingComputor, setDraggingComputor] = useState<boolean>(false)

    return (
        <DraggingContext.Provider
            value={{
                draggingComputor, 
                setDraggingComputor,
                draggingUser, 
                setDraggingUser,
            }}
        >
            {children}
        </DraggingContext.Provider>
    )
}