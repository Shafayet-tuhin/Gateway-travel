import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Home from '../layout/Home';
import PlaceDetails from '../components/Homepage/Places/PlaceDetails';
import Login from '../components/Login&Registration/Login';
import Registrastion from '../components/Login&Registration/Registrastion';

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
    }
  ]);