import { Navigate, useLocation } from "react-router-dom"

// purpose of this code is to create a component called "Authorized" that checks if the user is authenticated before rendering its children

// "Navigate" function is used to redirect the user to a specific page

export const Authorized = ({ children }) => {
//     used to get the current URL location
    const location = useLocation()

    if (localStorage.getItem("app_user")) {
        return children
    }
    else {
        // location used as a parameter in the "to" property of the "Navigate" component if  user is not authenticated. The "replace" property: replace the current URL in the browser's history with the  URL to which the user is being redirected(login page)
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}