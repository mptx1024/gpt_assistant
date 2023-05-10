import { useState } from 'react';

import Button from '@/components/Button';
import { Input } from '@/components/InputField';
import { useAppSelector } from '@/store/hooks';
import { useAppDispatch } from '@/store/hooks';
import { setSetting, selectSetting } from '@/store/settingSlice';

interface Props {
    toggleModal: () => void;
}
function AppSetting({ toggleModal }: Props) {
    const dispatch = useAppDispatch();
    const setting = useAppSelector(selectSetting);
    const [key, setKey] = useState(setting.apiKey || '');
    const handleSetKey = () => {
        dispatch(setSetting({ type: 'apiKey', value: key }));
        toggleModal();
    };
    return (
        <>
            <section className="debug-1 gap-2">
                <h3 className="font-semibold">Preference</h3>
                (headlessUI switch)
                <div>1. auto-generate title 2.attached message count</div>
            </section>
            <section className="debug-1">
                <h3 className="font-semibold">API Key</h3>
                <h5> a link to openAI site</h5>
                <Input
                    type="text"
                    placeholder="Enter Your API Key Here"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
            </section>
            <section className="debug-1">
                <h3 className="font-semibold">Data</h3>
                <div>export</div>
                <div>usage tables? https://www.hyperui.dev/components/application-ui/tables</div>
            </section>
            <section className="debug-1">
                <h3 className="font-semibold">Default Model Setting</h3>

                <div>model: List Box or menu</div>
                <div>temperature: use chatGPT to build a range slider</div>
            </section>
            <div className="debug-1">
                <Button
                    size={'lg'}
                    text="Save"
                    border={true}
                    shadow={true}
                    onClick={handleSetKey}
                />
            </div>
        </>
    );
}
export default AppSetting;
