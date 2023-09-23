// project import
import dashboard from './dashboard';
import support from './support';
import student from './student';
import teacher from './teacher'
import timeTable from './timeTable';
import communication from './communication';
import resources from './resources';
import { useSelector } from 'react-redux';



// ==============================|| MENU ITEMS ||============================== //

const currentUser = JSON.parse(localStorage.getItem('user'));
let items = [];
switch(currentUser.role.role) {
  case 'ADMIN':
    items = [dashboard, communication, student, teacher, timeTable, resources]
    break;
  case 'TEACHER':
  case 'STUDENT':
    items = [dashboard, communication, timeTable, resources];
    break;
}
const menuItems = {
  items
};

export default menuItems;
