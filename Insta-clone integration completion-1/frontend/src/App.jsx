import { RouterProvider } from "react-router"
import { router } from "./AppRoutes"
import { AuthProvider } from "./features/auth/auth.context"
import "./features/shared/global.css"
import { PostContextProvider } from "./features/posts/post.context"


function App() {

  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App