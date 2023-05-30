import { useCallback, useState } from 'react';

import { HiOutlineCog8Tooth } from 'react-icons/hi2';

import AppSetting from '../../features/settings/AppSetting';
import SettingModal from '../../features/settings/SettingModal';
import Button from '../Button';

const BottomSection = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const toggleSettingModal = useCallback(() => {
        setIsSettingsOpen(!isSettingsOpen);
    }, [isSettingsOpen]);
    return (
        <div className="">
            <Button
                onClick={toggleSettingModal}
                Icon={HiOutlineCog8Tooth}
                size="lg"
                // text={'Settings'}
                border={true}
                shadow={true}
            />
            <SettingModal
                isOpen={isSettingsOpen}
                toggleModal={toggleSettingModal}
                title="App Setting"
            >
                <AppSetting toggleModal={toggleSettingModal} />
            </SettingModal>
        </div>
    );
};

export default BottomSection;
