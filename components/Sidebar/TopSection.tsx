import { HiOutlineXMark } from 'react-icons/hi2';

import Button from '../Button';

interface Props {
    toggleSidebar: () => void;
}
const TopSection = (props: Props) => {
    return (
        <div className="relative flex h-[4rem] items-center justify-between px-5 py-3">
            <h1 className="bg-gradient-to-tr from-cyan-300  to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
                AI Assistant
            </h1>
            <Button size="md" Icon={HiOutlineXMark} shadow={true} onClick={props.toggleSidebar} />
        </div>
    );
};
export default TopSection;
