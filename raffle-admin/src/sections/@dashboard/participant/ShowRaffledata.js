import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import {
    fetchparticipants,
    RaffleSelector,
} from "../../../store/reducers/raffleSlice";

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

const ShowRaffleList = (detail) => {
    const dispatch = useDispatch();
    const { raffleParticipants } = useSelector(RaffleSelector);
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchparticipants(id));
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
            field: "username",
            headerName: "User Name",
            valueGetter: (params) => {
                return params.row.UserId
                    ? params.row.UserId.name
                    : "User Not Exist";
            },
            width: 250,
        },
        {
            field: "autoparticipantId",
            headerName: "Ticket No",
            valueGetter: (params) => {
                return 1;
            },
            width: 150,
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
                <title> Participant | Upcoming Raffle </title>
            </Helmet>

            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Typography variant="h4" gutterBottom>
                        Participants
                    </Typography>
                </Stack>

                <Grid item xs={12} md={6} lg={8}>
                    <div style={{ height: 540, width: "100%" }}>
                        <DataGrid
                            rows={raffleParticipants}
                            columns={columns}
                            pageSize={50}
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

export default ShowRaffleList;
