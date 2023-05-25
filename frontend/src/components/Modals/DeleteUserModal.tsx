import useUserActions from "@/hooks/useUserActions";
import { Button, Group, Modal, Text } from "@mantine/core";

const DeleteUserModal = ({ opened, close, current }: { opened: boolean, close: () => void, current: number | undefined}) => {

    const { deleteUser } = useUserActions()

    const confirmDelete = async () => {
        if(!current) return
        try {
            await deleteUser(current)
            close()
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <>
            <Modal opened={opened} onClose={close} withCloseButton={false}>
                <Text sx={{ textAlign: "center" }}>Are you suuure...?</Text>
                <Group position="apart" mt={12} mb={12}>
                    <Button onClick={close}>Cancel</Button>
                    <Button onClick={confirmDelete} color={"red"}>Delete</Button>
                </Group>
            </Modal>
        </>
     );
}
 
export default DeleteUserModal;