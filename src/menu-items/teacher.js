import { UserOutlined, UserAddOutlined } from '@ant-design/icons'

const icons = {
    UserOutlined,
    UserAddOutlined
}


const student = {
    id: "teacher",
    title: "Teachers",
    type: "group",
    children: [
        {
            id: "teachers",
            title: "Teacher",
            type: "item",
            url: "/teacher",
            icon: icons.UserOutlined
        },
        {
            id: "add-teachers",
            title: "Add Teacher",
            type: "item",
            url: "/add-teacher",
            icon: icons.UserAddOutlined
        }
    ]
}

export default student