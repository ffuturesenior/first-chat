import Login from '../pages/login'
import registration from '../pages/registration'
import Registration from '../pages/registration'
import Main from '../pages/main'
import UserProfile from '../pages/userProfile'
import UserSearch from '../pages/UserSearch'
import Chat from '../pages/Chat'


export const publicRoutes=[
    {path:'/login',Component:Login},
    {path:'/registration',Component:Registration}
]


export const userRoutes=[
    {path:'/login',Component:Login},
    {path:'/registration',Component:Registration},
    {path:'/',Component:Main},
    {path:'/userprofile/:id',Component:UserProfile},
    {path:'/usersearch',Component:UserSearch},
    {path:'/p2pchat/:id&:opponent',Component:Chat}
]


