import { FaRegCheckCircle } from "react-icons/fa";
import { ImUser } from "react-icons/im";

const Icons = (props) => {
  let icons = {
    FaRegCheckCircle: (
      <FaRegCheckCircle
        style={{ opacity: props.opacity }}
        color={props.color}
        size={props.size}
      />
    ),
    ImUser: (
      <ImUser
        style={{ opacity: props.opacity }}
        color={props.color}
        size={props.size}
      />
    ),
  };

  return icons[props.name];
};

export default Icons;
