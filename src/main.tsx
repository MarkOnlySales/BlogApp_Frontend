import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, Navigate, createBrowserRouter } from 'react-router-dom'

import Loader from '@components/loader/loader'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


function wait (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const Login = lazy(() => 
  wait(1000).then(() => import('@pages/auth/login'))
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    </>
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes by default
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
