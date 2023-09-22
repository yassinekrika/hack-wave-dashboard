import { UserOutlined, UserAddOutlined } from '@ant-design/icons'

const icons = {
    UserOutlined,
    UserAddOutlined
}


const timeTable = {
    id: "time-table",
    title: "Time Table",
    type: "group",
    children: [
        {
            id: "time",
            title: "Schadule",
            type: "item",
            url: "/time-table",
            icon: icons.UserOutlined
        }
    ]
}

export default timeTable