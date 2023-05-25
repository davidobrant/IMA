import useUserActions from "@/hooks/useUserActions";
import useUsers from "@/hooks/useUsers";
import { Box, Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect} from "react";

const EditUserModal = ({ opened, close, current }: { opened: boolean, close: () => void, current: number}) => {
    const { getUserById } = useUsers()
    const user = getUserById(current)
    const { updateUser, loading } = useUserActions()
    
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validate: {
            firstName: (value) => value.length < 3 ? "Must be longer than 2 chars" : undefined,
            lastName: (value) => value.length < 3 ? "Must be longer than 2 chars" : undefined,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        }
    })
    
    const onSubmit = async (values: { firstName: string, lastName: string, email: string }) => {
        if(!current) return
        try {
            await updateUser({ userId: current, firstName: values.firstName, lastName: values.lastName, email: values.email })
            close()
        } catch (error: any) {
            if(error?.response?.status === 405) {
                form.setFieldError('email', "Email already in use...")
            }
            console.log(error)
        }
    }

    useEffect(() => {
        if(user) {
            form.setFieldValue('firstName', user?.firstName)
            form.setFieldValue('lastName', user?.lastName)
            form.setFieldValue('email', user?.email)
        }
        // eslint-disable-next-line
    }, [user])

    const onClose = () => {
        form.reset()
        close()
    }

    return ( 
        <>
            <Modal opened={opened} onClose={onClose} withCloseButton={false}>
                <Text sx={{ textAlign: "center" }}>Edit User</Text>
                <Box>
                    <form onSubmit={form.onSubmit(onSubmit)}>
                        <TextInput mb={12}
                            label="First Name"
                            {...form.getInputProps('firstName')}
                            />
                        <TextInput mb={12}
                            label="Last Name"
                            {...form.getInputProps('lastName')}
                            />
                        <TextInput mb={12}
                            label="Email"
                            {...form.getInputProps('email')}
                        />
                        <Group position="apart" mt={12} mb={12}>
                            <Button onClick={close} color="red">Cancel</Button>
                            <Button type="submit" color={"teal"}>Save</Button>
                        </Group>
                    </form>
                </Box>
            </Modal>
        </>
     );
}
 
export default EditUserModal;