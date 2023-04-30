import { SystemPrompt } from '@/types';
import RoleItem from './RoleItem';
const RoleList = (props: { roles: SystemPrompt[] }) => {
    // const [currentChat, setCurrentChat] = useState<string>('');

    return (
        <div className={`debug-2 flex flex-col gap-2 my-2 h-1/2`}>
            <p>AI Roles</p>
            {props.roles?.map((role) => (
                <RoleItem key={role.id} role={role} />
            ))}
        </div>
    );
};

export default RoleList;

// transition-transform  ease-in duration-300 ${
//     isSidebarOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
// }
