import Button from '@/components/Button';
import { AiOutlineDownload } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import { useAppDispatch,  } from '@/store/hooks';
import { removeAllChats } from '@/store/chatsSlice';
import { removeAllRoles } from '@/store/rolesSlice';

interface Props {}
const DataSetting = (props: Props) => {
    const handleClickDeleteChats = () => {};

    const handleClickDeleteRoles = () => {};

    const handleClickDownload = () => {};
    return (
        <div
            id="data-setting"
            className=" flex flex-col gap-3 overflow-auto px-10 py-5 sm:gap-5 sm:px-16"
        >
            <div id="download" className="flex items-center justify-between">
                <span className="text-title block">Download Data</span>
                <Button btnSize="md" Icon={AiOutlineDownload} iconStyles="stroke-1" border />
            </div>
            <div id="delete-chats" className="flex items-center justify-between">
                <span className="text-title block">Delete All Chats</span>
                <Button
                    btnSize="md"
                    Icon={HiOutlineTrash}
                    iconStyles="stroke-1 !text-red-500"
                    btnStyles="hover:!border-red-500"
                    border
                />
            </div>
            <div id="delete-roles" className="flex items-center justify-between">
                <span className="text-title block">Delete All Roles</span>
                <Button
                    btnSize="md"
                    Icon={HiOutlineTrash}
                    iconStyles="stroke-1 !text-red-500"
                    btnStyles="hover:!border-red-500"
                    border
                />
            </div>
        </div>
    );
};
export default DataSetting;
