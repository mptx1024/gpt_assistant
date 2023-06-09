import { AiOutlineDownload } from 'react-icons/ai';
import { BsLightbulb } from 'react-icons/bs';
import { HiOutlineTrash } from 'react-icons/hi';

import Button from '@/components/Button';
import InfoBar from '@/components/InfoBar';
import { removeAllChats } from '@/store/chatsSlice';
import { useAppDispatch } from '@/store/hooks';
import { removeAllRoles } from '@/store/rolesSlice';

const DataSetting = () => {
    const dispatch = useAppDispatch();
    const handleClickDeleteChats = () => {
        dispatch(removeAllChats());
    };

    const handleClickDeleteRoles = () => {
        dispatch(removeAllRoles());
    };

    const handleClickDownload = () => {
        alert('Work in progress!');
    };
    return (
        <div
            id="data-setting"
            className="flex flex-col gap-3 overflow-auto px-10 py-5 sm:gap-5 sm:px-16"
        >
            <InfoBar>
                <BsLightbulb />
                <p className="text-sm font-medium">Your data is locally stored in your browser</p>
            </InfoBar>
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
