import { HiOutlineXMark } from "react-icons/hi2";

import Button from "../Button";

interface Props {
    toggleSidebar: () => void;
}
const TopSection = (props: Props) => {
    return (
        <div className="my-1 flex h-16 items-center justify-between p-5">
            <h1 className="text-xl font-semibold">AI Assistant</h1>
            <Button size="md" Icon={HiOutlineXMark} shadow={true} onClick={props.toggleSidebar} />
        </div>
    );
};
export default TopSection;
