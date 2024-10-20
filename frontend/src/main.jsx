import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Error from './pages/Error.jsx'
import Lights from './pages/Lights.jsx'
import Groups from './pages/Groups.jsx'
import Settings from './pages/Settings.jsx'
import GroupControls from './pages/GroupControls.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true,
        element: <Lights />
      },
      {
        path: "lights",
        element: <Lights />
      },
      {
        path: "groups",
        element: <Groups />
      },
      {
        path: "groups/:id",
        element: <GroupControls />
      },
      {
        path: "settings",
        element: <Settings />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
