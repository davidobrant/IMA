import useUserActions from "@/hooks/useUserActions";
import useUsers from "@/hooks/useUsers";
import { IGetUserResponse } from "@/utils/types";
import { Switch } from "@mantine/core";
import { useEffect, useState } from "react";

const AdminSwitch = ({ user } : { user: IGetUserResponse}) => {

    const [checked, setChecked] = useState<boolean>(false)
    const { admins } = useUsers()
    const { toggleAdmin } = useUserActions()

    useEffect(() => {
        if(user && admins) {
            setChecked(admins.some(a => a.userId === user.userId))
        }
    }, [user, admins])

    const onChange = async () => {
        if(!user?.userId) return
        try {
            await toggleAdmin({ userId: user.userId})
            setChecked(!checked)
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <Switch checked={checked} onChange={onChange} />
     );
}
 
export default AdminSwitch;