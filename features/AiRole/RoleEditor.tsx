import { useState } from "react";

import { HiOutlineXMark } from "react-icons/hi2";

import Button from "@/components/Button";
import ModalWrapper from "@/components/Modal";
import { Role } from "@/types";
import { addOrEditRole } from "@/utils/roles";

interface Props {
  isOpen: boolean;
  toggleModal: () => void;
  role?: Role;
}
const RoleEditor = (props: Props) => {
  const [title, setTitle] = useState<string>(
    props.role ? props.role.roleName : ""
  );
  const [prompt, setPrompt] = useState<string>(
    props.role ? props.role.prompt : ""
  );
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleClickSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addOrEditRole(prompt, title, props.role);
    setTitle("");
    setPrompt("");
    props.toggleModal();
  };
  const inputClasses =
    "my-3 w-full overflow-hidden rounded-lg border-slate-300 p-2 focus:border-transparent focus:ring-2 focus:ring-cyan-700";

  return (
    <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
      <div
        onClick={(e) => e.stopPropagation()} // prevent modal from closing
        className="absolute flex w-full max-w-lg flex-col space-y-4 overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl"
      >
        <div className="">
          <Button
            size="sm"
            icon={HiOutlineXMark}
            onClick={props.toggleModal}
            className="mr-0 ml-auto"
          />
        </div>
        <div>
          <p className="text-xl text-slate-800">Assistant Role</p>
        </div>
        <form onSubmit={(e) => handleClickSave(e)}>
          <div>
            <label className="text-base text-gray-700">Title</label>
            <input
              required
              type="text"
              placeholder=""
              value={title}
              onChange={handleTitleChange}
              className={inputClasses}
            />
            <label className="text-base text-gray-700">
              Prompt Insturction
            </label>

            <textarea
              required
              value={prompt}
              placeholder=""
              onChange={handlePromptChange}
              className={inputClasses}
            />
          </div>
          {/* <button type='submit'>save</button> */}
          <Button
            size="lg"
            type={"submit"}
            text={"Save"}
            className="w-20 bg-blue-800"
          />
        </form>
      </div>
    </ModalWrapper>
  );
};
export default RoleEditor;
