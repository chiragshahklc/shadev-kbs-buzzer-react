import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
// local imports
import App from "./App"
import "antd/dist/reset.css"
import router from "./router"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
