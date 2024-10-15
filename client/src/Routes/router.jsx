import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Home from '../layout/Home';
import PlaceDetails from '../components/Homepage/Places/PlaceDetails';
import Login from '../components/Login&Registration/Login';
import Registrastion from '../components/Login&Registration/Registrastion';
import Success from '../components/shared/payment page/Success';
import Cancel from '../components/shared/payment page/Cancel';
import DashboardLayout from '../layout/DashboardLayout';
import DashHome from '../components/DashBoard/DashHome';
import Mybooking from '../components/DashBoard/Mybooking';
import GeminiChat from '../components/Homepage/GeminiChat';
import Dashboard from '../components/DashBoard/Admin/Dashboard';
import AllUsers from '../components/DashBoard/Admin/AllUsers';
import AllBookings from '../components/DashBoard/Admin/AllBookings';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path:'/details/:id',
      element: <PlaceDetails/>,
      loader:({params}) => fetch(`http://localhost:3000/places/${params.id}`)
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/registration",
      element: <Registrastion/>,
    },
    {
      path: "/success",
      element: <Success/>,
    },
    {
      path: "/cancel",
      element: <Cancel/>,
    },
    {
      path:'/chat',
      element: <PrivateRoute> <GeminiChat/> </PrivateRoute>,
    },

     {
          path: "dashboard",
          element: <PrivateRoute> <DashboardLayout/> </PrivateRoute>,
          children:[
            {
              path:"home",
              element: <DashHome/>
            },
            {
              path:"booking",
              element: <Mybooking/>
            },
            {
              path:'adminDash',
              element: <AdminRoute><Dashboard/></AdminRoute>
            },
            {
              path:'alluser',
              element: <AdminRoute> <AllUsers/></AdminRoute>
            },
            {
              path:'allbooking',
              element: <AdminRoute> <AllBookings/> </AdminRoute>
            }
          ]
     }
  ]);