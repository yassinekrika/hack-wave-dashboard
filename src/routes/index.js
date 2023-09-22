import { useRoutes } from 'react-router-dom';

import { useSelector } from 'react-redux'

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const user = useSelector((state) => state.user.currentUser)
  return useRoutes([MainRoutes(user), LoginRoutes(user)]);
}