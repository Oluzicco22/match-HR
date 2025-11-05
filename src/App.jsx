import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import CreatePasswordPage from "./pages/CreatePasswordPage.jsx";

import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// optional pages you can create later
import Employees from "./pages/Employees.jsx";
import Hire from "./pages/Hire.jsx";
import Settings from "./pages/Settings.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        errorElement: <p>This is a page for error</p>,
        children: [
            {
                path: "register",
                element: <RegisterPage/>
            },
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordPage/>
            },
            {
                path: "create-password",
                element: <CreatePasswordPage/>
            }
        ],
    },
    // Protected dashboard section
    {
        path: "/dashboard",
        element: <ProtectedRoute/>, // check login
        children: [
            {
                path: "",
                element: <DashboardLayout/>,
                children: [
                    {
                        index: true,
                        element: <Dashboard/>
                    }, // /dashboard
                    {
                        path: "employees",
                        element: <Employees/>
                    }, // /dashboard/employees
                    {
                        path: "hire",
                        element: <Hire/>
                        // /dashboard/hire
                    },
                    {
                        path: "settings",
                        element: <Settings/>
                        // /dashboard/settings
                    },
                ],
            },
        ],
    },
]);

function App() {

    return <RouterProvider router={routes}/>
}

export default App
