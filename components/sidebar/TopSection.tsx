import { HiOutlineXMark } from 'react-icons/hi2';

import Button from '../Button';

interface Props {
    toggleSidebar: () => void;
}
const TopSection = (props: Props) => {
    return (
        <div className="flex h-[4rem] justify-between items-center px-5 py-3">
            <div className="flex shrink-0 items-baseline">
                <h1 className="whitespace-nowrap bg-gradient-to-r from-green-700 via-teal-500 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
                    GPT Assistant
                </h1>
                <span className="text-[0.7rem]">&nbsp;&nbsp; v1.1 </span>
            </div>
            <div className="border-color translate-x-[3.8rem] rounded-md border-2 sm:hidden">
                <Button
                    btnSize="md"
                    Icon={HiOutlineXMark}
                    iconEffect
                    onClick={props.toggleSidebar}
                />
            </div>
        </div>
    );
};
export default TopSection;
