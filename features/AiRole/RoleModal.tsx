import { HiOutlineXMark } from "react-icons/hi2";

import Button from "@/components/Button";
import ModalWrapper from "@/components/Modal";
import { Role } from "@/types";

interface Props {
    isOpen: boolean;
    role?: Role;
    isTemplate?: boolean;
    toggleModal: () => void;
    handleClickUse: () => void;
    handleClickEdit?: () => void;
    handleClickDelete?: () => void;
}

const RoleModal = (props: Props) => {
    return (
        <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
            <div
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className="flex max-h-[70vh] min-h-[30vh] w-full max-w-lg flex-col justify-between space-y-3 overflow-hidden rounded-xl bg-light-bg p-6 text-left shadow-xl dark:bg-dark-bg"
            >
                <div>
                    <div className="flex justify-end">
                        <Button
                            size="sm"
                            Icon={HiOutlineXMark}
                            onClick={props.toggleModal}
                            shadow={true}
                        />
                    </div>
                    <h3 className="text-lg font-bold text-light-text dark:text-dark-text sm:text-xl">
                        {props.role?.roleName}
                    </h3>
                </div>
                <p className="h-[50%] max-h-[70%] overflow-y-scroll text-base text-light-text dark:text-dark-text">
                    {props.role?.prompt}
                </p>
                <div id="btn-group" className="flex gap-2">
                    <Button
                        size="lg"
                        text={"Use"}
                        onClick={props.handleClickUse}
                        shadow={true}
                        border={true}
                    />
                    {!props.isTemplate && (
                        <Button
                            size="lg"
                            text={"Edit"}
                            onClick={props.handleClickEdit}
                            shadow={true}
                            border={true}
                        />
                    )}
                    {!props.isTemplate && (
                        <Button
                            size="lg"
                            text={"Delete"}
                            onClick={props.handleClickDelete}
                            shadow={true}
                            border={true}
                        />
                    )}
                </div>
            </div>
        </ModalWrapper>
    );
};
export default RoleModal;
