import { useCallback, useState } from 'react';

import Spinner from '@/components/icons/spinner1.svg';
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
        <div className="flex w-full items-center justify-start gap-3">
            <Button
                onClick={toggleSettingModal}
                Icon={HiOutlineCog8Tooth}
                size="lg"
                btnStyles=""
                // text={'Settings'}
                // border={true}
            />
            {/* <div className="debug-1"> */}
            <Spinner className=" debug-2" />
            {/* </div> */}
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
