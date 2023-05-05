import { HiOutlineCog6Tooth } from "react-icons/hi2";

import Button from "../Button";

const BottomSection = () => {
    return (
        <div className="mt-auto flex flex-col border-t  border-red-700 py-3">
            <label
                htmlFor="setting-modal"
                className="text-md btn m-1 mx-2 flex cursor-pointer items-center justify-start gap-5 rounded-md px-2 py-1 hover:bg-gray-700"
            >
                <HiOutlineCog6Tooth className="h-4 w-4" />
                Settings
            </label>
        </div>
    );
};

export default BottomSection;
