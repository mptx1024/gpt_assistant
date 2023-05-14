import { HiOutlineXMark } from 'react-icons/hi2';

import Button from '../Button';

interface Props {
    toggleSidebar: () => void;
}
const TopSection = (props: Props) => {
    return (
        <div className="relative flex h-[4rem] items-center justify-between px-5 py-3">
            <h1 className="text-xl font-semibold">AI Assistant</h1>
            <Button size="md" Icon={HiOutlineXMark} shadow={true} onClick={props.toggleSidebar} />
        </div>
    );
};
export default TopSection;
