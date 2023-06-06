import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import {
    findUserAllRaffleById,
    RaffleSelector,
} from "../../../store/reducers/raffleSlice";
import moment from "moment";
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    Grid,
    TableContainer,
    TablePagination,
} from "@mui/material";
import axios from "axios";

const ShowUserRaffleList = (detail) => {
    const dispatch = useDispatch();
    const { userRaffles } = useSelector(RaffleSelector);
    const { id } = useParams();

    useEffect(() => {
        dispatch(findUserAllRaffleById(id));
    }, []);

    const columns = [
        {
            field: "raffleId",
            headerName: "Raffle Name",
            valueGetter: (params) => {
                return (
                    params.row.raffleId.winingamount +
                    " " +
                    params.row.raffleId.name
                );
            },
            width: 150,
        },
        {
            field: "name",
            headerName: "User Name",
            valueGetter: (params) => {
                return params.row.UserId.name;
            },
            width: 250,
        },
        {
            field: "jointime",
            headerName: "JoinTime",
            valueGetter: ({ value }) =>
                value && moment(value * 1000).format("DD-MM-YYYY , HH:mm"),
            width: 200,
        },
    ];

    return (
        <>
            <Helmet>
                <title> User Raffle | Upcomingnft Raffle </title>
            </Helmet>

            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Typography variant="h4" gutterBottom>
                        Raffle
                    </Typography>
                </Stack>

                <Grid item xs={12} md={6} lg={8}>
                    <div style={{ height: 640, width: "100%" }}>
                        <DataGrid
                            rows={userRaffles}
                            columns={columns}
                            pageSize={25}
                            getRowId={(row) =>
                                row.autoparticipantId
                                    ? row.autoparticipantId
                                    : null
                            }
                        />
                    </div>
                </Grid>
            </Container>
        </>
    );
};

export default ShowUserRaffleList;
