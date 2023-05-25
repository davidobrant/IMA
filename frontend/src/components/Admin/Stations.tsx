import useStations from "@/hooks/useStations";
import { ActionIcon, Box, Table } from "@mantine/core";
import { InfoSquare } from "tabler-icons-react";
import StationModal from "../Modals/StationModal";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const Stations = () => {
    const { stations } = useStations()
    const [opened, { open, close }] = useDisclosure()
    const [current, setCurrent] = useState<number>(0)

    const handleInfo = (stationId: number) => {
        setCurrent(stationId)
        open()
    }

    return ( 
        <Box>
            <Table>
                <thead>
                    <tr>
                        <th>Station ID</th>
                        <th>User ID</th>
                        <th>Computor ID</th>
                        <th>Status</th>
                        <th>Info</th>
                    </tr>
                </thead>
                <tbody>
                    {stations?.map(station => (
                        <tr key={station.stationId}>
                            <td>{station.stationId}</td>
                            <td>{station.userId || "-"}</td>
                            <td>{station.computorId || "-"}</td>
                            <td>{station.status}</td>
                            <td>
                                <ActionIcon onClick={() => handleInfo(station?.stationId)}>
                                    <InfoSquare size={32}/>
                                </ActionIcon>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <StationModal opened={opened} stationId={current} close={close}/>
        </Box>
     );
}
 
export default Stations;