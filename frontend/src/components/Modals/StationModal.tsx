import useStation from "@/hooks/useStation";
import { Modal} from "@mantine/core";

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
    
    return ( 
        <Modal 
            opened={opened}
            onClose={close}
            withCloseButton={false}
        >
            {station?.stationId}
        </Modal>
     );
}
 
export default StationModal;