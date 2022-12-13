import { createBrowserRouter } from "react-router-dom"
// local imports
import App from "./App"
import { ViewGame, Home } from "./components"

const router = createBrowserRouter([
  {
    path: "/new-game",
    element: <App />,
  },
  {
    path: "/view-game",
    element: <ViewGame />,
  },
  {
    path: "/",
    element: <Home />,
  },
])

export default router
