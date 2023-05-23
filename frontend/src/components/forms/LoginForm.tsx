import { Stack, useMantineTheme, Button, createStyles, TextInput, Loader, PasswordInput} from "@mantine/core";
import { useForm } from "@mantine/form";
import useSignIn from "../../hooks/useSignin";
import { ILoginBody } from "../../utils/types";

const Login = () => {
    const { classes, cx } = useStyles()
    const { shadows } = useMantineTheme()
    const { login, loading } = useSignIn()

    const form = useForm({
      initialValues: {
          email: '',
          password: '',
      },
      validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        password: (value) => value.length < 8 ? "Invalid password" : undefined,
      }
    })

    const onSubmit = async (body: ILoginBody) => {
        try {
            await login(body)
        } catch (err) {
            console.log(err)
        }
        form.reset()
    }

    return ( 
      <form onSubmit={form.onSubmit(onSubmit)}>
         <Stack 
                sx={({ colors, colorScheme }) => ({
                    width: "400px",
                    boxShadow: shadows.md,
                    padding: 20,
                    background: colorScheme === "dark" ? colors.dark[5] : colors.gray[2],
                })}
            >
                <TextInput 
                    className={classes.input}
                    placeholder="Enter email"
                    {...form.getInputProps('email')}
                    />
                <PasswordInput 
                    className={cx(classes.input, classes.password)}
                    placeholder="Enter password"
                    {...form.getInputProps('password')}
                />
                <Button 
                    type="submit"
                    disabled={loading}
                >
                    {!loading ? "Login" : <Loader size="xs" /> } 
                </Button>
         </Stack>
        </form>
     );
}
 
export default Login;

const useStyles = createStyles(({ colors, fontSizes }) => ({
    input: {
        "& input": {
            textAlign: "center",
        }
    },
    password: {
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