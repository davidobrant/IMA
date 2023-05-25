import useComputors from "@/hooks/useComputors";
import { Box, Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

const AddComputor = () => {
    const [opened, { open, close }] = useDisclosure()
    const { addComputor } = useComputors()

    const form = useForm({
        initialValues: {
            serialNr: '',
            type: 'laptop',
            status: 'working',
        },
        validate: {
            serialNr: (value) => value.length > 5 ? null : "6 chars min",
        }
    })

    const onSubmit = async (values: any) => {
        try {
            await addComputor({ serialNr: values.serialNr.toUpperCase(), type: values.type, status: values.status })
            close()
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <>
            <Box mt={20} sx={{ display: "grid", placeContent: "center"}}>
                <Button onClick={open}>
                    Add new Computor
                </Button>
            </Box>
            <Modal opened={opened} onClose={close} withCloseButton={false} >
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <TextInput mt={20}
                        label="Serial Number"
                        {...form.getInputProps('serialNr')}
                    />
                    <Select  mt={20}
                        data={['laptop', 'desktop']}
                        label="Type"
                        {...form.getInputProps('type')}
                        />
                    <Select  mt={20}
                        data={['working', 'service']}
                        label="Status"
                        {...form.getInputProps('status')}
                    />
                    <Group position="apart"  mt={20}>
                        <Button onClick={close} color="pink">Cancel</Button>
                        <Button type="submit">Add</Button>
                    </Group>
                </form>
            </Modal>
        </>
     );
}
 
export default AddComputor;