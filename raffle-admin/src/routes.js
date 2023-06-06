import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import UserPage from "./pages/UserPage";
import EditUserForm from "./sections/@dashboard/user/EditUserForm";
import ShowUserRaffleList from "./sections/@dashboard/user/ShowUserRaffleList";
import AddUserForm from "./sections/@dashboard/user/AddUser";

import LoginPage from "./pages/LoginPage";
import CompletedPage from "./pages/CompletedPage";
import Page404 from "./pages/Page404";
import DashboardAppPage from "./pages/DashboardAppPage";
import RafflePage from "./pages/RafflePage";
import AddRaffleForm from "./sections/@dashboard/raffle/AddRaffle";
import EditRaffleForm from "./sections/@dashboard/raffle/EditRaffle";
import PriceListPage from "./pages/PriceListPage";
import AddPriceListForm from "./sections/@dashboard/pricelist/AddPricelist";
import EditPriceListForm from "./sections/@dashboard/pricelist/EditPricelist";
import ShowRaffleList from "./sections/@dashboard/participant/ShowRaffledata";
import ParticipantsPage from "./pages/ParticipantsPage";
import Protected from "./sections/auth/login/Protected";
import ShowWinnerList from "./sections/@dashboard/winner/ShowWinnerdata";

export default function Router() {
    const routes = useRoutes([
        {
            path: "/",
            element: <LoginPage />,
        },
        {
            path: "/dashboard",
            element: <Protected Component={DashboardLayout} />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                {
                    path: "app",
                    element: <Protected Component={DashboardAppPage} />,
                },
                {
                    path: "user",
                    element: <Protected Component={UserPage} />
                },
                {
                    path: "adduser",
                    element: <Protected Component={AddUserForm} />,
                },
                {
                    path: "edituser/:id",
                    element: <Protected Component={EditUserForm} />,
                },
                {
                    path: "raffle",
                    element: <Protected Component={RafflePage} />,
                },
                {
                    path: "addraffle",
                    element: <Protected Component={AddRaffleForm} />,
                },
                {
                    path: "editraffle/:id",
                    element: <Protected Component={EditRaffleForm} />,
                },
                {
                    path: "pricelist",
                    element: <Protected Component={PriceListPage} />,
                },
                {
                    path: "addpricelist",
                    element: <Protected Component={AddPriceListForm} />,
                },
                {
                    path: "editpricelist/:id",
                    element: <Protected Component={EditPriceListForm} />,
                },
                {
                    path: "participants",
                    element: <Protected Component={ParticipantsPage} />,
                },
                {
                    path: "fetchparticipants/:id",
                    element: <Protected Component={ShowRaffleList} />,
                },
                {
                    path: "fetchraffles/:id",
                    element: <Protected Component={ShowUserRaffleList} />,
                },
                {
                    path: "fetchwinner/:id",
                    element: <Protected Component={ShowWinnerList} />,
                },
                {
                    path: "completed",
                    element: <Protected Component={CompletedPage} />,
                }
            ],
        },
    ]);
    return routes;
}
