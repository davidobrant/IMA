import { Box, Button, Loader, Modal, Stack, Text, TextInput, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IconCircleCheck } from "@tabler/icons-react";
import { IRegisterBody } from "@/utils/types";
import useSignin from "@/hooks/useSignin";

const AddUser = () => {
    const [opened, { open, close }] = useDisclosure()
    const { classes, cx } = useStyles()
    const { addUser, loading } = useSignin()

    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirm: '',
        },
        validate: {
            firstName: (value) => value.length < 3 ? "Must be longer than 2 chars" : undefined,
            lastName: (value) => value.length < 3 ? "Must be longer than 2 chars" : undefined,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value.length < 8 ? "Password must be 8 chars or more" : undefined,
            confirm: (value, values) => value.length < 8 || value !== values.password ? 'Passwords did not match' : undefined,
        }
    })

    const onSubmit = async (body: IRegisterBody & { confirm: string}) => {        
        try {
            await addUser({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password,
            })
            form.reset()
            close()
        } catch (err) {
            console.log(err)
        }
    }
    
    return ( 
        <>
            <Box mt={20} mb={20} sx={{ display: "grid", placeContent: "center"}}>
                <Button onClick={open}>Add New User</Button>
            </Box>
            <Modal opened={opened} onClose={close} withCloseButton={false}>
                <Text align="center" component="h3" mb={20}>Add New User</Text>
                <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack 
                sx={({ colors, colorScheme, shadows }) => ({
                    width: "400px",
                    boxShadow: shadows.md,
                    padding: 20,
                    background: colorScheme === "dark" ? colors.dark[5] : colors.gray[2],
                })}
            >
                <TextInput 
                    className={cx(classes.input, {[classes.valid]: form.isValid('firstName')})}
                    placeholder="Enter First Name"
                    {...form.getInputProps('firstName')}
                    rightSection={form.isValid('firstName') ? <ConfirmedIcon /> : undefined}
                />
                <TextInput 
                    className={cx(classes.input, {[classes.valid]: form.isValid('lastName')})}
                    placeholder="Enter Last Name"
                    {...form.getInputProps('lastName')}
                    rightSection={form.isValid('lastName') ? <ConfirmedIcon /> : undefined}
                />
                <TextInput 
                    className={cx(classes.input, {[classes.valid]: form.isValid('email')})}
                    placeholder="Enter E-mail"
                    {...form.getInputProps('email')}
                    rightSection={form.isValid('email') ? <ConfirmedIcon /> : undefined}
                />
                <TextInput 
                    className={cx(classes.input, {[classes.valid]: form.isValid('password')})}
                    type="password"
                    placeholder="Enter Password"
                    {...form.getInputProps('password')}
                    rightSection={form.isValid('password') ? <ConfirmedIcon /> : undefined}
                />
                <TextInput 
                    className={cx(classes.input, {[classes.valid]: form.isValid('confirm')})}
                    type="password"
                    placeholder="Confirm Password"
                    {...form.getInputProps('confirm')}
                    rightSection={form.isValid('confirm') ? <ConfirmedIcon /> : undefined}
                />
                <Button 
                    type="submit"
                    disabled={loading}
                >
                    {!loading ? "Register" : <Loader size="xs" /> } 
                </Button>
            </Stack>
        </form>
            </Modal>
        </>
     );
}
 
export default AddUser;

export const ConfirmedIcon = () => {
    return <IconCircleCheck size={20} color="green"/>
}

const useStyles = createStyles(({ colors, fontSizes }) => ({
    input: {
        "& input": {
            textAlign: "center",
        },
    },
    valid: {
        "& input": {
            paddingLeft: 32
        }
    },
    link: {
        textDecoration: "none",
        color: colors.indigo[8]
    },
    header: {
        fontWeight: 700,
        fontSize: fontSizes.md,
        "& a": {
            fontWeight: 700,
            fontSize: fontSizes.md
        }
    }
}))
