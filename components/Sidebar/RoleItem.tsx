import { FiUser } from "react-icons/fi";

import { Role } from "@/types";

import SidebarCard from "./SidebarCard";
interface Props {
  role: Role;
  toggleModal: () => void;
  setCurrentRole: (role: Role) => void;
}
const RoleItem = (props: Props) => {
  const handleClick = () => {
    props.setCurrentRole(props.role);
    props.toggleModal();
  };

  return (
    <div onClick={handleClick}>
      <SidebarCard>
        <FiUser />
        <div> {props.role.roleName}</div>
      </SidebarCard>
    </div>
  );
};
export default RoleItem;
