'use client'

import { ToastContainer } from 'react-toastify'
import { LoadingProvider } from './context/LoadingContext'
import GlobalLoader from './components/GlobalLoader'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <>
        {children}
        <GlobalLoader />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    </LoadingProvider>
  )
}
