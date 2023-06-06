import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    getDashboardData,
    RaffleSelector,
} from "../store/reducers/raffleSlice";

// sections
import { AppWidgetSummary } from "../sections/@dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { totalRaffles, totalUsers, totalParticipants } =
        useSelector(RaffleSelector);
    const [authenticated, setauthenticated] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
    }, []);

    useEffect(() => {
        dispatch(getDashboardData());
    }, []);

    if (!authenticated) {
        if (!totalRaffles) {
            navigate("/", { replace: true });
        }
    } else {
        return (
            <>
                <Helmet>
                    <title> Dashboard | Upcoming Raffle </title>
                </Helmet>

                <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Hi, Welcome back
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary
                                title="Total Raffles"
                                total={totalRaffles}
                                icon={"ant-design:android-filled"}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary
                                title="Total Users"
                                total={totalUsers}
                                color="info"
                                icon={"ant-design:apple-filled"}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary
                                title="Total Participants"
                                total={totalParticipants}
                                color="warning"
                                icon={"ant-design:windows-filled"}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }
}
