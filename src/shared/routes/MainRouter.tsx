import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../../App.css'
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp/index';

const router = createBrowserRouter([
  {
    path: "/",
    Component: SignIn
  },
  {
    path: "/sign-up",
    Component: SignUp
  },
]);

const MainRouter = (): JSX.Element => {

  return (
    <RouterProvider router={router} />
  )
}

export default MainRouter
