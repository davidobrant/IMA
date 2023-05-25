import useComputors from "@/hooks/useComputors";
import { ActionIcon, Box, Table, Tabs } from "@mantine/core";
import { useState } from "react";
import AddComputor from "./AddComputor";
import { DeviceLaptopOff, Edit, HomeDown } from "tabler-icons-react";
import useStationActions from "@/hooks/useStationActions";
import { useDisclosure } from "@mantine/hooks";
import DeleteComputorModal from "../Modals/DeleteComputorModal";
import EditComputorModal from "../Modals/EditComputorModal";

const Computors = () => {
    const { computors, activeComputors, inactiveComputors } = useComputors()
    const [active, setActive] = useState<string | null>('all')
    const { moveComputorToService } = useStationActions()
    const [current, setCurrent] = useState<number | undefined>(undefined)
    const [openedEdit, { open: openEdit, close: closeEdit}] = useDisclosure()
    const [openedDelete, { open: openDelete, close: closeDelete}] = useDisclosure()

    const handleToService = async (computorId?: number) => {
        if(!computorId) return
        try {
            await moveComputorToService({ fromStation: computorId})
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (computorId: number) => {
        setCurrent(computorId)
        openEdit()
    }
    
    const handleDelete = (computorId: number) => {
        setCurrent(computorId)
        openDelete()
    }

    return ( 
        <Box>

            <Tabs value={active} onTabChange={setActive}>
                <Tabs.List grow>
                    <Tabs.Tab value="all">All</Tabs.Tab>
                    <Tabs.Tab value="active">Active</Tabs.Tab>
                    <Tabs.Tab value="inactive">Inactive</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="all">
                    <Table>
                        <thead>
                            <tr>
                                <th>Computor ID</th>
                                <th>Serial Nr</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {computors?.map(computor => (
                                <tr key={computor.computorId}>
                                    <td>{computor.computorId}</td>
                                    <td>{computor.serialNr}</td>
                                    <td>{computor.type}</td>
                                    <td>{computor.status}</td>
                                    <td>
                                        <ActionIcon 
                                            onClick={() => handleEdit(computor.computorId)}
                                            sx={{ 
                                                cursor: "pointer",
                                                color: "teal",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Edit />
                                        </ActionIcon>
                                    </td>
                                    <td>
                                        <ActionIcon 
                                            onClick={() => handleDelete(computor.computorId)}
                                            sx={{ 
                                                cursor: "pointer",
                                                color: "red",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <DeviceLaptopOff />
                                        </ActionIcon>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {current ? <DeleteComputorModal opened={openedDelete} close={closeDelete} current={current}/> : undefined}
                    {current ? <EditComputorModal opened={openedEdit} close={closeEdit} current={current}/> : undefined}
                    <AddComputor />
                </Tabs.Panel>

                <Tabs.Panel value="active">
                    <Table>
                        <thead>
                            <tr>
                                <th>Computor ID</th>
                                <th>Station ID</th>
                                <th>User ID</th>
                                <th>Serial Nr</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Service</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeComputors?.map(computor => (
                                <tr key={computor.computorId}>
                                    <td>{computor.computorId}</td>
                                    <td>{computor.stationId}</td>
                                    <td>{computor.userId || "-"}</td>
                                    <td>{computor.serialNr}</td>
                                    <td>{computor.type}</td>
                                    <td>{computor.status}</td>
                                    <td>
                                        <ActionIcon onClick={() => handleToService(computor?.stationId)} >
                                            <HomeDown color="green"/>
                                        </ActionIcon>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tabs.Panel>

                <Tabs.Panel value="inactive">
                    <Table>
                        <thead>
                            <tr>
                                <th>Computor ID</th>
                                <th>Serial Nr</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inactiveComputors?.map(computor => (
                                <tr key={computor.computorId}>
                                    <td>{computor.computorId}</td>
                                    <td>{computor.serialNr}</td>
                                    <td>{computor.type}</td>
                                    <td>{computor.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tabs.Panel>
            </Tabs>
        </Box>
     );
}
 
export default Computors;