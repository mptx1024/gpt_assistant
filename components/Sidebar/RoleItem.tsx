import { SystemPrompt } from '@/types';
import SidebarCard from './SidebarCard';

interface Props {
    role: SystemPrompt;
}
const RoleItem = (props: Props) => {
    const onClickRole = () => {};
    return (
        <SidebarCard>
            <div>{props.role.role}</div>
        </SidebarCard>
    );
};
export default RoleItem;
