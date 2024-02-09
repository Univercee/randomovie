import { createBrowserRouter } from 'react-router-dom';
import indexView from '../views/index'
import error404View from '../views/error404' 
const router = createBrowserRouter([
    {
        path: "/",
        Component: indexView
    },
    {
        path: "*",
        Component: error404View
    }
], {
    basename: "/randomovie"
})
export default router