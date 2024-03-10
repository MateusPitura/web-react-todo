//screen
import Login from './screen/login/Login.tsx'
import Home from './screen/home/Home.tsx'
import Cadastro from './screen/cadastro/Cadastro.tsx'

const { createBrowserRouter} = require('react-router-dom')

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/cadastro',
        element: <Cadastro/>
    }
])

export default router