import { createBrowserRouter } from "react-router";
import Nofound from "../components/Nofound";
import RootLayout from "../layouts/RootLayout";

import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";

import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
// import Dashboard from "../pages/Dashboard";
import SearchDonors from "../components/SearchDonors";
import AddBlog from "../pages/AddBlog";
import AllBloodDonationRequest from "../pages/AllBloodDonationRequest";
import AllUsers from "../pages/AllUsers";
import Blog from "../pages/blog";
import BlogDetails from "../pages/BlogDetails";
import ContentManagementPage from "../pages/contentManagement";
import DonationRequestDetails from "../pages/DonationRequestDetails";
import DonationRequests from "../pages/DonationRequests";
import DonorDashboard from "../pages/DonorDashboard";
import EditBlog from "../pages/EditBlog";
import EditDonationRequest from "../pages/EditDonationRequest";
import FundingPage from "../pages/FundingPage";
import MyDonationRequests from "../pages/MyDonationRequests";
import ProfilePage from "../pages/ProfilePage";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "blog",
        element: <Blog></Blog>,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails />,
      },

      { path: "/dashboard/addBlog/:id", element: <EditBlog /> },
      {
        path: "funding",
        element: (
          <PrivateRoute>
            <FundingPage />
          </PrivateRoute>
        ),
      },
      // {
      //   path: "AllUsers",
      //   element: <AllUsers></AllUsers>,
      // },
      // {
      //   path: "MyDonationRequests",
      //   element: <MyDonationRequests></MyDonationRequests>,
      // },
      // {
      //   path: "addBlog",
      //   element: (
      //     <PrivateRoute>
      //       <AddBlog></AddBlog>
      //     </PrivateRoute>
      //   ),
      // },

      //create donation request
      // {
      //   path: "DonationRequests",
      //   element: <DonationRequests></DonationRequests>,
      // },
      // {
      //   path: "ContentManagementPage",
      //   element: <ContentManagementPage></ContentManagementPage>,
      // },
      {
        path: "AllDonationRequests",
        element: <AllBloodDonationRequest></AllBloodDonationRequest>,
      },
      {
        path: "/donation-request/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/editDonationRequest/:id",
        element: <EditDonationRequest />,
      },

      {
        path: "/DonorSearch",
        element: <SearchDonors />,
      },
      {
        path: "registration",
        element: <Register></Register>,
      },

      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/MyDonationRequests",
            element: <MyDonationRequests></MyDonationRequests>,
          },
          {
            path: "/dashboard/DonationRequests",
            element: <DonationRequests></DonationRequests>,
          },
          {
            path: "/dashboard/ContentManagementPage",
            element: <ContentManagementPage></ContentManagementPage>,
          },
          {
            path: "/dashboard/profile",
            element: (
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            ),
          },

          {
            path: "/dashboard/donor-dashboard",
            element: (
              <PrivateRoute>
                <DonorDashboard />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/addBlog",
            element: <AddBlog></AddBlog>,
          },
          {
            path: "/dashboard/AllDonationRequests",
            element: <AllBloodDonationRequest></AllBloodDonationRequest>,
          },
          {
            path: "/dashboard/AllUsers",
            element: <AllUsers></AllUsers>,
          },

          {
            path: "/dashboard/funding",
            element: (
              <FundingPage />
            ),
          },
          // {
          //   path: "add-book",
          //   element: <AddBooks />,
          // },
          // {
          //   path: "all-users",
          //   element: <AllUsers />,
          // },
          // {
          //   path: "my-books",
          //   element: <MyBooks />,
          // },
          // {
          //   path: "my-requests",
          //   element: <MyBooks />,
          // },
        ],
      },
    ],
  },
  {
    path: "/*",
    Component: Nofound,
  },
]);

export default mainRoutes;
