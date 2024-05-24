import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { routes } from './routes';
import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'



export const MainRoutes = () => {
  const elementRoutes = useRoutes(routes)
  return (
    <>
      {elementRoutes}
      <Toaster position="bottom-right" reverseOrder={true} />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainRoutes></MainRoutes>
    </BrowserRouter>
  </React.StrictMode>,
)