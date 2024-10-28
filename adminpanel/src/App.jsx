import React from 'react';
import './App.css'

import { createBrowserRouter } from 'react-router-dom';

import { RouterProvider } from "react-router-dom";

import AdminLogin from './components/UI/AdminLogin';
import Dashboard from './components/UI/Dashboard';
import AdminRegister from './components/UI/AdminRegister';
import AdminLayout from './components/UI/AdminLayout';
import AdminList from './components/UI/AdminList';
import AdminUpdate from './components/UI/AdminUpdate';
import ProtectedRoute from './store/ProtectedRoute';
import AdminLogout from './components/UI/AdminLogout';
function App() {
  const router = createBrowserRouter([
   
  {
    path:'/',
    element:<AdminLayout/>,
    children:[
      {
        path:'/',
        element:<AdminLogin/>
      },
      {
        path:'adminlogin',
        element:<AdminLogin/>
      },
      {
        path:'adminregister',
        element:<AdminRegister/>
      },
      {
        path:'admindashboard',
        element:
          (
            <ProtectedRoute>
             <Dashboard/>
           </ProtectedRoute>
          ),
      },
      {
        path:'adminlist',
        element:
          (
            <ProtectedRoute>
             <AdminList/>
            </ProtectedRoute>
          ),
      },
      {
        path:'adminupdate/:id/edit',
        element:
          (
            <ProtectedRoute>
             <AdminUpdate/>
            </ProtectedRoute>
          ),
      },
      {
        path:'/logout',
        element:<AdminLogout/>
      },
    ]
  }
   
 ]);
return <RouterProvider router={router}/>
}

export default App
