import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './MainRouting'
import { RouterProvider } from 'react-router-dom'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import supabase from './Supabase'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <RouterProvider router ={router}/>
    </SessionContextProvider>
  </React.StrictMode>
)
  