import useUsers from "@/hooks/useUsers";
import { ActionIcon, Box, Table, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Edit, HomeDown, UserX } from "tabler-icons-react";
import DeleteUserModal from "../Modals/DeleteUserModal";
import EditUserModal from "../Modals/EditUserModal";
import { IGetUserResponse } from "@/utils/types";
import useUserActions from "@/hooks/useUserActions";
import AddUser from "./AddUser";
import AdminSwitch from "./AdminSwitch";

const Users = () => {
    const [active, setActive] = useState<string | null>('all')
    const { users, activeUsers, inactiveUsers } = useUsers()
    const [openedEdit, { open: openEdit, close: closeEdit}] = useDisclosure()
    const [openedDelete, { open: openDelete, close: closeDelete}] = useDisclosure()
    const [current, setCurrent] = useState<number | undefined>(undefined)
    const { benchUser } = useUserActions()

    const handleDelete = (userId: number) => {
        setCurrent(userId)
        openDelete()
    }
    
    const handleEdit = (userId: number) => {
        setCurrent(userId)
        openEdit()
    }
    
    const handleBench = async (user: IGetUserResponse) => {
        if(!user.stationId) return
        try {
            await benchUser({ userId: user.userId, stationId: user.stationId })
        } catch (error) {
            console.log(error)
        }
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
                                <th>User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.userId}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <AdminSwitch user={user} />
                                    </td>
                                    <td>
                                        <ActionIcon 
                                            onClick={() => handleEdit(user.userId)}
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
                                            onClick={() => handleDelete(user.userId)}
                                            sx={({ colors }) => ({ 
                                                cursor: "pointer",
                                                color: colors.red[6],
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            })}
                                        >
                                            <UserX />
                                        </ActionIcon>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <AddUser />
                    {current ? <DeleteUserModal opened={openedDelete} close={closeDelete} current={current}/> : undefined}
                    {current ? <EditUserModal opened={openedEdit} close={closeEdit} current={current}/> : undefined}
                </Tabs.Panel>
                
                <Tabs.Panel value="active">
                    <Table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Station ID</th>
                                <th>Computor ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Bench</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeUsers?.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.userId}</td>
                                    <td>{user.stationId}</td>
                                    <td>{user.computorId || "-"}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <ActionIcon 
                                            onClick={() => handleBench(user)}
                                            sx={{ 
                                                cursor: "pointer",
                                                color: "green",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <HomeDown />
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
                                <th>User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inactiveUsers?.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.userId}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tabs.Panel>
            </Tabs>
        </Box>
     );
}
 
export default Users;