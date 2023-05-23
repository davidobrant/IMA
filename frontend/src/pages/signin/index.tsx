import { Box, SegmentedControl, createStyles } from "@mantine/core";
import { useState } from "react";
import LoginForm from "../../components/forms/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm";

const Signin = () => {
    const { classes } = useStyles()
    const [component, setComponent] = useState<string>('login')
    return ( 
        <Box className={classes.container} >
            <SegmentedControl 
                value={component}
                onChange={setComponent}
                data={[
                    {
                        value: 'login',
                        label: 'Login'
                    }, 
                    {
                        value: 'register',
                        label: 'Register'
                    }
                ]}
                fullWidth
            />
            {component === 'login' ? <LoginForm /> : undefined}
            {component === 'register' ? <RegisterForm /> : undefined}
        </Box>
     );
}
 
export default Signin;

const useStyles = createStyles(({ colors, colorScheme }) => ({
    container: {
        background: colorScheme === "dark" ? colors.dark[5] : colors.gray[2],
        marginTop: 80,
        padding: 4,
        borderRadius: 4,
    }
}))
