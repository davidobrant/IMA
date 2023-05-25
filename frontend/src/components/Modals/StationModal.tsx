import useComputors from "@/hooks/useComputors";
import useStation from "@/hooks/useStation";
import useUser from "@/hooks/useUser";
import { Box, Group, Modal, Text} from "@mantine/core";

const StationModal = ({ 
    opened, 
    close, 
    stationId 
}: { 
    opened: boolean, 
    close: () => void, 
    stationId: number 
}) => {
    const { station } = useStation(stationId)
    const { user } = useUser(station?.userId || 0)
    const { getComputorById } = useComputors()
    const computor = getComputorById(station?.computorId || 0)

    return ( 
        <Modal 
            opened={opened}
            onClose={close}
            withCloseButton={false}
            size={"xs"}
        >
            <Box mb={10}>
                <Text component="h3" align="center">Station {station?.stationId}</Text>
            </Box>
            <Box mb={20}>
                <Text component="h3">User</Text>
                {user ? 
                <>
                    <GroupItem title="User ID" text={user?.userId.toString()}/>
                    <GroupItem title="First Name" text={user?.firstName}/>
                    <GroupItem title="Last Name" text={user?.lastName}/>
                    <GroupItem title="Email" text={user?.email}/>
                </>
                :
                 <Text fs={"italic"} color="dimmed">Available...</Text>
                }
            </Box>
            <Box mb={20}>
                <Text component="h3">Computor</Text>
                {computor ? 
                <>
                    <GroupItem title="Computor ID" text={computor?.computorId.toString()} />
                    <GroupItem title="Serial Nr" text={computor?.serialNr} />
                    <GroupItem title="Type" text={computor?.type} />
                    <GroupItem title="Status" text={computor?.status} />
                </>
                : 
                    <Text fs={"italic"} color="dimmed">Available...</Text>
                }
            </Box>
        </Modal>
     );
}

const GroupItem = ({ title, text }: { title: string, text: string}) => {
    return (
        <Group position="apart">
            <Text>{title}</Text>
            <Text>{text}</Text>
        </Group>
    )
}
 
export default StationModal;