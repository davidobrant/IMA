import { Box, createStyles, Text } from "@mantine/core";
import Station from "./Station";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import StationModal from "../Modals/StationModal";
import useStations from "@/hooks/useStations";

const Stations = () => {
    const { classes, cx } = useStyles()
    const [opened, { close, toggle}] = useDisclosure()
    const [current, setCurrent] = useState<number>(0)
    const { stations } = useStations()

    const openModal = (stationId: number) => {
        setCurrent(stationId)
        toggle()
    }

    return ( 
        <Box>
            {stations ? stations.map((station) => {
                const isTop = !!(station.stationId % 4 === 1 || station.stationId % 4 === 2)
                return (
                <Box key={station.stationId} className={cx(classes.station)}>
                    <Text 
                        className={cx(classes.stationLabel, {[classes.isTop]: isTop, [classes.isBottom]: !isTop})}
                        onClick={() => openModal(station.stationId)}
                    >
                        {station.stationId}
                    </Text>
                    <Station station={station} />
                </Box>
            )}) : undefined}
            <StationModal opened={opened} close={close} stationId={current}/>
        </Box>
     );
}
 
export default Stations;

const useStyles = createStyles(({ colors, colorScheme, fontSizes, shadows }) => ({
    stationLabel: {
        position: "absolute",
        background: colorScheme === "dark" ? colors.dark[3]: colors.gray[0],
        width: "100%",
        textAlign: "center",
        cursor: "pointer",
        fontSize: fontSizes.sm,
        boxShadow: shadows.md,
        userSelect: "none",

        "&:hover": {
            background: colorScheme === "dark" ? colors.teal[8]: colors.teal[3],
        },
    },
    isTop: {
        bottom: "100%",
        borderRadius: "1rem 1rem 0 0",
    },
    isBottom: {
        top: "100%",
        borderRadius: "0 0 1rem 1rem",
    },
    station: {
        position: "absolute",
        height: 99,
        width: 90,
        background: colorScheme === "dark" ? colors.dark[4]: colors.gray[4],
        boxShadow: shadows.sm,

        "&:nth-of-type(n)": {
            transform: "translate(-50%,-50%)",
            top: 100,
            left: 100,
        },
        
        "&:nth-of-type(1)": {
            top: 150,
            left: 200 
        },
        "&:nth-of-type(2)": {
            top: 150,
            left: 300 
        },
        "&:nth-of-type(3)": {
            top: 250,
            left: 200 
        },
        "&:nth-of-type(4)": {
            top: 250,
            left: 300 
        },
        "&:nth-of-type(5)": {
            top: 450,
            left: 200 
        },
        "&:nth-of-type(6)": {
            top: 450,
            left: 300 
        },
        "&:nth-of-type(7)": {
            top: 550,
            left: 200 
        },
        "&:nth-of-type(8)": {
            top: 550,
            left: 300 
        },

        "&:nth-of-type(9)": {
            top: 150,
            left: 550 
        },
        "&:nth-of-type(10)": {
            top: 150,
            left: 650 
        },
        "&:nth-of-type(11)": {
            top: 250,
            left: 550 
        },
        "&:nth-of-type(12)": {
            top: 250,
            left: 650 
        },
        "&:nth-of-type(13)": {
            top: 450,
            left: 550 
        },
        "&:nth-of-type(14)": {
            top: 450,
            left: 650 
        },
        "&:nth-of-type(15)": {
            top: 550,
            left: 550 
        },
        "&:nth-of-type(16)": {
            top: 550,
            left: 650 
        },
        
        "&:nth-of-type(17)": {
            top: 150,
            left: 900 
        },
        "&:nth-of-type(18)": {
            top: 150,
            left: 1000 
        },
        "&:nth-of-type(19)": {
            top: 250,
            left: 900 
        },
        "&:nth-of-type(20)": {
            top: 250,
            left: 1000 
        },
        "&:nth-of-type(21)": {
            top: 450,
            left: 900 
        },
        "&:nth-of-type(22)": {
            top: 450,
            left: 1000 
        },
        "&:nth-of-type(23)": {
            top: 550,
            left: 900 
        },
        "&:nth-of-type(24)": {
            top: 550,
            left: 1000 
        },
    }
}))