import { useState } from "react";
import { memo } from "react";

import { Switch } from "@headlessui/react";
import { HiOutlineXMark } from "react-icons/hi2";

import Button from "@/components/Button";
import { Input } from "@/components/InputField";
import ModalWrapper from "@/components/Modal";
import { useAppSelector } from "@/store/hooks";
import { useAppDispatch } from "@/store/hooks";
import { setSetting, selectSetting } from "@/store/settingSlice";
interface Props {
    isOpen: boolean;
    toggleModal: () => void;
}
const SettingModal = memo(function SettingModal(props: Props) {
    const dispatch = useAppDispatch();
    const setting = useAppSelector(selectSetting);
    const [key, setKey] = useState(setting.apiKey || "");
    const handleSetKey = () => {
        dispatch(setSetting({ type: "apiKey", value: key }));
        props.toggleModal();
    };
    const handleClickClose = () => {
        props.toggleModal();
    };

    return (
        <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
            <div
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className="inset-0 flex h-full w-full flex-col gap-3 overflow-hidden bg-light-bg p-6 text-left dark:bg-dark-bg sm:h-[70vh] sm:max-w-xl sm:rounded-xl"
            >
                <div className="flex justify-end">
                    <Button
                        size="lg"
                        Icon={HiOutlineXMark}
                        onClick={handleClickClose}
                        shadow={true}
                    />
                </div>
                <h3 className="debug-1 border-b-2 border-gray-500 text-2xl font-bold ">Settings</h3>
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
                    <div>
                        usage tables? https://www.hyperui.dev/components/application-ui/tables
                    </div>
                </section>
                <section className="debug-1">
                    <h3 className="font-semibold">Default Model Setting</h3>

                    <div>model: List Box or menu</div>
                    <div>temperature: use chatGPT to build a range slider</div>
                </section>
                <div className="debug-1">
                    <Button
                        size={"lg"}
                        text="Save"
                        border={true}
                        shadow={true}
                        onClick={handleSetKey}
                    />
                </div>
            </div>
        </ModalWrapper>
    );
});
export default SettingModal;
