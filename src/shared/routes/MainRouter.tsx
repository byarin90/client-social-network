import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../../App.css'
import Login from '../../pages/login';

const router = createBrowserRouter([
  { path: "/", Component: Login,},
]);

const MainRouter = (): JSX.Element => {

  return (
    <RouterProvider router={router} />
  )
}

export default MainRouter
