import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Home from '../layout/Home';
import PlaceDetails from '../components/Homepage/Places/PlaceDetails';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path:'/details/:id',
      element: <PlaceDetails/>
    }
  ]);