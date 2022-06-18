import { MdSettings, MdDashboard } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { FaLock } from 'react-icons/fa';
const links = [
  {
    id: 1,
    text: 'Dashboard',
    path: '/',
    icon: <MdDashboard />,
  },
  {
    id: 2,
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
  {
    id: 3,
    text: 'Settings',
    path: 'settings',
    icon: <MdSettings />,
  },

  {
    id: 4,
    text: 'password',
    path: 'password',
    icon: <FaLock />,
  },
];

export default links;
