import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const MainLayout = lazy(() => import("@layout/MainLayout/MainLayout"));
const Home = lazy(() => import("@pages/Home/Home"));
const OneUserPost= lazy(() => import("@Components/Posts/OneUserPost/OneUserPost"));
const UserProfile = lazy(() => import("@pages/UserProfile/UserProfile"));
import { PageSuspenseFallback } from '@Components/feedback';
import { Error } from '@pages/index';
import ProtectedRoutes from '@Components/Auth/ProtectedRoutes';




function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Suspense
        fallback={"Loading..."
          // <div style={{ marginTop: "10%" }}>
          //   <LottieHandler type="loading" message="Loading please wait..." />
          // </div>
        }
      >
      
        <MainLayout />
      </Suspense>,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <PageSuspenseFallback>
            <Home />
          </PageSuspenseFallback>,
        },
       {
        path:"/post/:id",
        element:<PageSuspenseFallback>
          <OneUserPost/>
        </PageSuspenseFallback>
       },
       {
        path:"profile",
        element:
        <ProtectedRoutes>
        <PageSuspenseFallback>
          <UserProfile/>
        </PageSuspenseFallback>
        </ProtectedRoutes>
       },
      { path:"profile/post/:id",
       element:<PageSuspenseFallback>
           <OneUserPost/>
       </PageSuspenseFallback>
       },
       { path:"profile/:username/:id",
        element:<PageSuspenseFallback>
            <UserProfile/>
        </PageSuspenseFallback>
        },
    
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter
