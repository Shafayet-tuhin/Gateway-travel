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
    },{
      path: "/cancel",
      element: <Cancel/>,
    },

     {
          path: "dashboard",
          element: <DashboardLayout/>,
          children:[
            {
              path:"home",
              element: <DashHome/>
            }
          ]
     }
  ]);