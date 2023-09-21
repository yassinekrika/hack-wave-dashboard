
import MainLayout from 'layout/MainLayout';
import Color from 'pages/components-overview/Color';
import DashboardDefault from 'pages/dashboard';
import SimplePage from 'pages/extra-pages/SamplePage'
import UserPage from 'pages/student/index';
import AntIcons from 'pages/components-overview/AntIcons';
import {Navigate} from 'react-router-dom'
import StudentList from 'pages/student/student-list/index';

// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = (logged) => ({
  path: '/',
    element: logged ? <MainLayout /> : <Navigate to='/login' />,
      children: [
        {
          path: '/',
          element: <DashboardDefault />
        },
        {
          path: 'color',
          element: <Color />
        },
        {
          path: 'dashboard',
          children: [
            {
              path: 'default',
              element: <DashboardDefault />
            }
          ]
        },
        {
          path: 'sample-page',
          element: <SimplePage />
        },
        {
          path: 'student-list',
          element: <UserPage />
        },
        {
          path: 'icon/ant',
          element: <AntIcons />
        },
        {
          path: 'student',
          element: <StudentList />
        }
      ]
});

export default MainRoutes