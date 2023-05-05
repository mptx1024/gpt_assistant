import { useState } from "react";
import { memo } from "react";

import { HiOutlineXMark } from "react-icons/hi2";

import Button from "@/components/Button";
import { Input } from "@/components/InputField";
import ModalWrapper from "@/components/Modal";
import { setApiKey } from "@/store/apiKeySlice";
import { useAppDispatch } from "@/store/hooks";
interface Props {
    isOpen: boolean;
    toggleModal: () => void;
}
const SettingModal = memo(function SettingModal(props: Props) {
    const [key, setKey] = useState(localStorage.getItem("apiKey") || "");
    const dispatch = useAppDispatch();

    const handleSetKey = () => {
        dispatch(setApiKey(key));
        props.toggleModal();
    };
    const handleClickClose = () => {
        props.toggleModal();
    };

    return (
        <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
            <div
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className="flex max-h-[70vh] min-h-[30vh] w-full max-w-lg flex-col justify-between space-y-3 overflow-hidden rounded-xl bg-light-bg p-6 text-left shadow-xl dark:bg-dark-bg"
            >
                <div className="flex justify-end">
                    <Button
                        size="sm"
                        Icon={HiOutlineXMark}
                        onClick={handleClickClose}
                        shadow={true}
                    />
                </div>
                <h3 className="debug-1 text-2xl font-bold">Settings</h3>
                <p className="debug-1 py-4">
                    You have been selected for a chance to get one year of subscription to use
                    Wikipedia for free!
                </p>
                <div className="debug-1 my-2">
                    <Input
                        type="text"
                        placeholder="Enter Your API Key Here"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                </div>

                <div className="modal-action">
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
