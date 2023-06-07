import SettingTabWrapper from '@/features/settings/SettingTabWrapper';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleAppSetting } from '@/store/uiSlice';
import { AiOutlineGithub } from 'react-icons/ai';
import { HiOutlineCog8Tooth } from 'react-icons/hi2';
import SettingModal from '../../features/settings/SettingModal';
import Button from '../Button';
const BottomSection = () => {
    const isAppSettingOpen = useAppSelector((state) => state.ui.appSettingOpen);
    const dispatch = useAppDispatch();
    const toggleSettingModal = () => {
        dispatch(toggleAppSetting());
    };
    return (
        <div className="flex w-full items-center justify-start">
            <Button
                onClick={toggleSettingModal}
                Icon={HiOutlineCog8Tooth}
                btnSize="lg"
                btnStyles=""
            />
            <Button Icon={AiOutlineGithub} btnSize="lg" />
            <SettingModal
                isOpen={isAppSettingOpen}
                toggleModal={toggleSettingModal}
                title="Setting"
            >
                {/* <AppSetting toggleModal={toggleSettingModal} /> */}
                <SettingTabWrapper toggleModal={toggleSettingModal} />
            </SettingModal>
        </div>
    );
};

export default BottomSection;
