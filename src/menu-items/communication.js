import { UserOutlined, UserAddOutlined } from '@ant-design/icons'

const icons = {
    UserOutlined,
    UserAddOutlined
}

const communication = {
    id: "communication",
    title: "Communication",
    type: "group",
    children: [
        {
            id: "communication",
            title: "Email",
            type: "item",
            url: "/communication",
            icon: icons.UserOutlined
        }
    ]
}

export default communication