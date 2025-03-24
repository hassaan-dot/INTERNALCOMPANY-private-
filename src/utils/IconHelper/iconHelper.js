import { FaBeer, FaHome } from 'react-icons/fa';
import { MdStar } from 'react-icons/md';

const Ionicon_com = ({ type, name, size = 25, color = '#ffff', style }) => {
  let IconComponent;

  switch (type) {
    case 'FontAwesome':
      IconComponent = FaBeer; 
      break;
    case 'MaterialIcons':
      IconComponent = MdStar;
      break;
    default:
      IconComponent = FaHome; 
  }

  return <IconComponent size={size} color={color} style={style} />;
};

export default Ionicon_com;
