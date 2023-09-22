
import MainLayout from 'layout/MainLayout';
import Color from 'pages/components-overview/Color';
import DashboardDefault from 'pages/dashboard';
import SimplePage from 'pages/extra-pages/SamplePage'
import UserPage from 'pages/student/index';
import AntIcons from 'pages/components-overview/AntIcons';
import {Navigate} from 'react-router-dom'
import StudentList from 'pages/student/student-list/index';
import AddStudent from 'pages/student/add-student/index';
import TeacherList from 'pages/teacher/teacher-list/index';
import AddTeacher from 'pages/teacher/add-teacher/index';
import TimeTable from 'pages/time-table/index';
import Communication from 'pages/communication/index';

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
        },
        {
          path: 'add-student',
          element: <AddStudent />
        },
        {
          path: 'teacher',
          element: <TeacherList />
        },
        {
          path: 'add-teacher',
          element: <AddTeacher />
        },
        {
          path: 'time-table',
          element: <TimeTable />
        },
        {
          path: 'communication',
          element: <Communication />
        }
      ]
});

export default MainRoutes