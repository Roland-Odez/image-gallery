import { Outlet } from "react-router-dom"


const RouteLayout = () => {
    return (
        <div className="overflow-hidden bg-light h-screen">
            {<Outlet />}
        </div>
    )
}

export default RouteLayout