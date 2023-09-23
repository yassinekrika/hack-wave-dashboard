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

let items = [dashboard, communication, student, teacher, timeTable, resources]

const menuItems = {
  items
};

export default menuItems;
