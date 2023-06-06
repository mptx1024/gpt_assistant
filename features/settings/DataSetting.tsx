import Button from '@/components/Button';
import { removeAllChats } from '@/store/chatsSlice';
import { useAppDispatch } from '@/store/hooks';
import { removeAllRoles } from '@/store/rolesSlice';
import { AiOutlineDownload } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';

interface Props {}
const DataSetting = (props: Props) => {
    const dispatch = useAppDispatch();
    const handleClickDeleteChats = () => {
        dispatch(removeAllChats());
    };

    const handleClickDeleteRoles = () => {
        dispatch(removeAllRoles());
    };

    const handleClickDownload = () => {};
    return (
        <div
            id="data-setting"
            className="flex flex-col gap-3 overflow-auto px-10 py-5 sm:gap-5 sm:px-16"
        >
            <div id="download" className="flex items-center justify-between">
                <span className="text-title block">Download Data</span>
                <Button
                    btnSize="md"
                    Icon={AiOutlineDownload}
                    iconStyles="stroke-1"
                    border
                    onClick={handleClickDownload}
                />
            </div>
            <div id="delete-chats" className="flex items-center justify-between">
                <span className="text-title block">Delete All Chats</span>
                <Button
                    btnSize="md"
                    Icon={HiOutlineTrash}
                    iconStyles="stroke-1 !text-red-500"
                    btnStyles="hover:!border-red-500"
                    border
                    onClick={handleClickDeleteChats}
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
                    onClick={handleClickDeleteRoles}
                />
            </div>
        </div>
    );
};
export default DataSetting;
