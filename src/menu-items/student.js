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
        }
    ]
}

export default student