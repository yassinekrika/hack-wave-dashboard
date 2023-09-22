import { UserOutlined, UserAddOutlined } from '@ant-design/icons'

const icons = {
    UserOutlined,
    UserAddOutlined
}


const student = {
    id: "user",
    title: "Users",
    type: "group",
    children: [
        {
            id: "users",
            title: "Student",
            type: "item",
            url: "/student",
            icon: icons.UserOutlined
        },
        {
            id: "add-users",
            title: "Add Student",
            type: "item",
            url: "/add-student",
            icon: icons.UserAddOutlined
        }
    ]
}

export default student