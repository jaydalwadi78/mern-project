import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import moment from 'moment';
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
} from '@mui/material';
import axios from 'axios';


const ShowUserRaffleList = (detail) => {
    const location = useLocation();
    const [tableData, setTableData] = useState([])
    const navigate = useNavigate();
    const { id } = useParams();

    console.log("id>>>", id);

    useEffect(() => {
        if (urlParams) {
            dispatch(getRafflebyId(urlParams.raffleid))
        }
    }, [urlParams])


    // const queryParameters = new URLSearchParams(window.location.search)

    ///console.log("queryParameters>>", queryParameters);

    // const search = useLocation().search;


    // useEffect(() => {
    //   if (urlParams) {
    //     console.log("urlParams>>", urlParams);
    //     //dispatch(getParticipantbyId(urlParams.raffleid))
    //   }
    // }, [urlParams])

    useEffect(() => {
        // console.log("location.state.participantresult", location.state.participantresult);
        setTableData(location.state.participantresult);
    }, [])

    const columns = [
        { field: 'raffleId', headerName: 'Raffle Name', valueGetter: (params) => { return params.row.raffleId.name; }, width: 150 },
        { field: 'raffleId', headerName: 'Raffle Id', valueGetter: (params) => { return params.row.raffleId }, width: 250 },
        { field: 'name', headerName: 'User Name', valueGetter: (params) => { return params.row.UserId }, width: 250 },
        // { field: 'pricelistId', headerName: 'Pricelist Id', valueGetter: (params) => { return 1; }, width: 130 },        
        {
            field: 'jointime', headerName: 'JoinTime', valueGetter: ({ value }) => value &&
                moment(value * 1000).format('DD-MM-YYYY , HH:mm'), width: 200
        },
    ]

    return (
        <>
            <Helmet>
                <title> User Raffle | Upcomingnft Raffle </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Raffle
                    </Typography>
                </Stack>

                <Grid item xs={12} md={6} lg={8}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={tableData}
                            columns={columns}
                            pageSize={5}
                            getRowId={(row) => row.autoparticipantId ? row.autoparticipantId : null}
                        />
                    </div>
                </Grid>
            </Container>
        </>
    )
}

export default ShowUserRaffleList