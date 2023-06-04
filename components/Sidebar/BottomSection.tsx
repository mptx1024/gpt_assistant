import SettingTabWrapper from '@/features/settings/SettingTabWrapper';
import { useCallback, useState } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import { HiOutlineCog8Tooth } from 'react-icons/hi2';
import SettingModal from '../../features/settings/SettingModal';
import Button from '../Button';
const BottomSection = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const toggleSettingModal = useCallback(() => {
        setIsSettingsOpen(!isSettingsOpen);
    }, [isSettingsOpen]);
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
                isOpen={isSettingsOpen}
                toggleModal={toggleSettingModal}
                title="App Setting"
            >
                {/* <AppSetting toggleModal={toggleSettingModal} /> */}
                <SettingTabWrapper toggleModal={toggleSettingModal} />
            </SettingModal>
        </div>
    );
};

export default BottomSection;
