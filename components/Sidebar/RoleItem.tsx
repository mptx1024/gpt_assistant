import { SystemPrompt } from '@/types';
import SidebarCard from './SidebarCard';
interface Props {
    role: SystemPrompt;
    toggleModal: () => void;
    setCurrentRole: (role: SystemPrompt) => void;
}
const RoleItem = (props: Props) => {
    const handleClick = () => {
        props.setCurrentRole(props.role);
        props.toggleModal();
    };
    return (
        <div onClick={handleClick}>
            <SidebarCard>
                <div> {props.role.role}</div>
            </SidebarCard>
        </div>
    );
};
export default RoleItem;
