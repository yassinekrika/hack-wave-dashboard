import { UserOutlined, UserAddOutlined } from '@ant-design/icons'

const icons = {
    UserOutlined,
    UserAddOutlined
}


const resources = {
    id: "resources",
    title: "Resources",
    type: "group",
    children: [
        {
            id: "resources",
            title: "Courses",
            type: "item",
            url: "/resources",
            icon: icons.UserOutlined
        },
      
    ]
}

export default resources