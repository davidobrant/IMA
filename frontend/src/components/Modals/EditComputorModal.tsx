import useComputors from "@/hooks/useComputors";
import useStationActions from "@/hooks/useStationActions";
import { Box, Button, Group, Modal, Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect} from "react";

const EditComputorModal = ({ opened, close, current }: { opened: boolean, close: () => void, current: number}) => {
    const { getComputorById } = useComputors()
    const computor = getComputorById(current)
    const { updateComputor, loading } = useStationActions()
    
    const form = useForm({
        initialValues: {
            serialNr: '',
            type: '',
            status: '',
        },
        validate: {
            serialNr: (value) => value.length < 5 ? "Must be longer than 6 chars" : undefined,
        }
    })
    
    const onSubmit = async (values: { serialNr: string, type: string, status: string }) => {
        if(!current) return
        try {
            await updateComputor({ computorId: current, serialNr: values.serialNr, type: values.type, status: values.status })
            form.reset()
            close()
        } catch (error: any) {
            if(error?.response?.status === 405) {
                form.setFieldError('serialNr', "Serial number already in use...")
            }
            console.log(error)
        }
    }

    useEffect(() => {
        if(computor) {
            form.setFieldValue('serialNr', computor?.serialNr)
            form.setFieldValue('type', computor?.type)
            form.setFieldValue('status', computor?.status)
        }
        // eslint-disable-next-line
    }, [computor])

    const onClose = () => {
        form.reset()
        close()
    }

    return ( 
        <>
            <Modal opened={opened} onClose={onClose} withCloseButton={false}>
                <Text sx={{ textAlign: "center" }}>Edit Computor</Text>
                <Box>
                    <form onSubmit={form.onSubmit(onSubmit)}>
                        <TextInput mb={12}
                            label="Serial Number"
                            {...form.getInputProps('serialNr')}
                            />
                        <Select mb={12}
                            data={['laptop', 'desktop']}
                            label="Type"
                            {...form.getInputProps('type')}
                            />
                        <Select mb={12}
                            data={['working', 'service']}
                            label="Status"
                            {...form.getInputProps('status')}
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
 
export default EditComputorModal;