import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AllScholarship from "../pages/AllScholarship/AllScholarship";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import PrivateRoute from "../privateRoute/PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Dashboard from "../layout/Dashboard";
import MyProfile from "../components/Dashboard/UserDashboard/MyProfile";
import MyApplication from "../components/Dashboard/UserDashboard/MyApplication";
import MyReviews from "../components/Dashboard/UserDashboard/MyReviews";
import ApplicationForm from "../components/Form/ApplicationForm";
import EditApplicationForm from "../components/Form/EditApplicationForm";
import ManageScholarship from "../components/Dashboard/ModeratorDashboard/ManageScholarship";
import AllReviews from "../components/Dashboard/ModeratorDashboard/AllReviews";
import AllAppliedScholarship from "../components/Dashboard/ModeratorDashboard/AllAppliedScholarship";
import AddScholarship from "../components/Dashboard/ModeratorDashboard/AddScholarship";
import ManageUsers from "../components/Dashboard/AdminDashboard/ManageUsers";
import AdminRoute from "./AdminRoute";
import CommonRoute from "./CommonRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/all-scholarship",
        element: <AllScholarship />,
      },
      {
        path: "/scholarship-details/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/application-form/:id",
        element: (
          <PrivateRoute>
            <ApplicationForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://scholarvista-server.vercel.app/scholarship-details/${params.id}`),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      //user routes
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "my-application",
        element: <MyApplication />,
      },
      {
        path: "my-reviews",
        element: <MyReviews />,
      },
      {
        path: "my-application/edit-application/:id",
        element: <EditApplicationForm />,
        loader: ({ params }) =>
          fetch(`https://scholarvista-server.vercel.app/applied-scholarships/${params.id}`),
      },
      {
        path: "manage-scholarships",
        element: (
          <PrivateRoute>
            <CommonRoute>
              <ManageScholarship />
            </CommonRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <PrivateRoute>
            <CommonRoute>
              <AllReviews />
            </CommonRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-applied-scholarship",
        element: (
          <PrivateRoute>
            <CommonRoute>
              <AllAppliedScholarship />
            </CommonRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-scholarship",
        element: (
          <PrivateRoute>
            <CommonRoute>
              <AddScholarship />
            </CommonRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
