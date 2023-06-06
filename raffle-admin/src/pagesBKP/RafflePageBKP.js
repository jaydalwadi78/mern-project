import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useDispatch, useSelector } from "react-redux";
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
    TableContainer,
    TablePagination,
} from "@mui/material";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import {
    RaffleListHead,
    RaffleListToolbar,
} from "../sections/@dashboard/raffle";
import {
    getRaffle,
    getNewPriceList,
    RaffleSelector,
    getRafflesAdmin
} from "../store/reducers/raffleSlice";
import {
    Web3Selector,
    disconnect,
    web3instance,
    clearMessage,
} from "../store/reducers/web3Slice";
import contractAbi from "../contract/abi.json";
const contractAddress = "0x4d53770dECd430F5FB6c04bcc9d56f050AcDac53";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
    // { id: 'no', label: 'No' },
    { id: "autoraffleId", label: "Raffle Id" },
    { id: "name", label: "Raffle Name", alignRight: false },
    { id: "raffletype", label: "Raffle Type", alignRight: false },
    { id: "winingamount", label: "Wining Amount", alignRight: false },
    { id: "total", label: "Participants Size", alignRight: false },
    { id: "actions", label: "Actions", alignRight: false, width: 400 },
    {
        id: "Participants",
        label: "Participants",
        alignRight: false,
        width: 400,
    },
    { id: "Winner", label: "Winner", alignRight: false, width: 400 },
    // { id: 'contractaction', label: 'Contract Action', alignRight: false, width: 400 },
    // { id: 'gamestart', label: 'Game Status', alignRight: false, width: 400 },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(
            array,
            (_user) =>
                _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function RafflePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { raffles, newprices, loading, isSuccess, recordsTotal } =
        useSelector(RaffleSelector);
    const { web3, isLoading, address, isloginLoading, isLoginerror } =
        useSelector(Web3Selector);
    const [open, setOpen] = useState(null);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("desc");
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState("autoraffleId");
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // const { urlParams } = useParams();
    // console.log("urlParams>>", urlParams);

    useEffect(() => {

        let newPostdata = { skip: 0, limit: 5, currentPage: 1 }
        dispatch(getRafflesAdmin(newPostdata))

        //dispatch(getRafflesAdmin());
    }, []);

    // console.log("raffles>>>", raffles);
    // console.log("recordsTotal>>>", recordsTotal);

    //console.log("selected>>>>", selected);

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = raffles.map((n) => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        // alert("newPage" + newPage);
        // let newPostdata = { skip: 0, limit: 5, currentPage: newPage + 1 }
        // dispatch(getRaffle(newPostdata))
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
        //console.log("filterName>>>", event.target.value);
    };

    const handleParticipants = async (data, rid) => {
        navigate(`/dashboard/fetchparticipants/${rid}`, {
            state: { participantresult: data },
        });
    };

    const handleContractAction = async (autoraffleId, _id) => {
        // alert(autoraffleId);
        // alert(_id);
        dispatch(getNewPriceList(_id));
        //await newprices;
        // console.log("newprices>>", await newprices);
        // console.log("newprices>>newprices[0]", await newprices[0]);

        const myContract = await new web3.eth.Contract(
            contractAbi,
            contractAddress
        );
        let price = web3.utils.toWei(String(newprices[0].price), "ether");
        let price2 = web3.utils.toWei(String(newprices[0].price2), "ether");
        let price3 = web3.utils.toWei(String(newprices[0].price3), "ether");
        let ticketno = newprices[0].ticketno;
        let ticketno2 = newprices[0].ticketno2;
        let ticketno3 = newprices[0].ticketno3;
        const address = "0xbB85c48384c2f1544B228512A29589B2c78586ba";
        const _raffleid = autoraffleId;
        const _priceList = [
            [1, ticketno, price],
            [2, ticketno2, price2],
            [3, ticketno3, price3],
        ];
        await myContract.methods.createRaffle(_raffleid, _priceList).send({
            from: address,
        });
    };

    const handleGameStatus = async (autoraffleId) => {
        // alert(autoraffleId);
        // alert(_id);
        //dispatch(getNewPriceList(_id))
        //await newprices;

        // console.log("newprices>>", await newprices);
        // console.log("newprices>>newprices[0]", await newprices[0]);

        const myContract = await new web3.eth.Contract(
            contractAbi,
            contractAddress
        );
        const address = "0xbB85c48384c2f1544B228512A29589B2c78586ba";
        const _raffleid = autoraffleId;
        await myContract.methods.gameStatus(_raffleid).send({
            from: address,
        });
    };

    const handleSubmit = async (id) => {
        navigate(`/dashboard/editraffle/${id}`, { replace: true });
    };

    const handleWinner = async (data, rid) => {
        navigate(`/dashboard/fetchwinner/${rid}`, {
            state: { participantresult: data },
        });
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - recordsTotal) : 0;
    const filteredUsers = applySortFilter(
        raffles,
        getComparator(order, orderBy),
        filterName
    );
    const isNotFound = !filteredUsers.length && !!filterName;

    return (
        <>
            <Helmet>
                <title> Raffles | Upcoming Raffle </title>
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
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate("/dashboard/addraffle");
                        }}
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        New Raffle
                    </Button>
                </Stack>

                <Card>
                    <RaffleListToolbar
                        selected={selected}
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <RaffleListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={raffles.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((row, index) => {
                                            const {
                                                _id,
                                                id,
                                                name,
                                                total,
                                                raffletype,
                                                winingamount,
                                                autoraffleId,
                                                participantcount,
                                                participants,
                                            } = row;
                                            const selectedUser =
                                                selected.indexOf(_id) !== -1;

                                            // console.log("filteredUsers>>>><<<<", filteredUsers);
                                            return (
                                                <TableRow
                                                    hover
                                                    key={index}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    selected={selectedUser}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={
                                                                selectedUser
                                                            }
                                                            onChange={(event) =>
                                                                handleClick(
                                                                    event,
                                                                    _id
                                                                )
                                                            }
                                                        />
                                                    </TableCell>
                                                    {/* <TableCell align="left">{index + 1}</TableCell> */}
                                                    <TableCell align="left">
                                                        {autoraffleId}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            spacing={2}
                                                        >
                                                            <Typography
                                                                variant="subtitle2"
                                                                noWrap
                                                            >
                                                                {winingamount}{" "}
                                                                {name}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {raffletype == 0
                                                            ? "Free"
                                                            : "Paid"}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {winingamount}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {total}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <MenuItem
                                                            onClick={(e) =>
                                                                handleSubmit(
                                                                    _id
                                                                )
                                                            }
                                                        >
                                                            <Iconify
                                                                icon={
                                                                    "eva:edit-fill"
                                                                }
                                                                sx={{ mr: 2 }}
                                                            />
                                                            Edit
                                                        </MenuItem>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Button
                                                            variant="contained"
                                                            onClick={(e) =>
                                                                handleParticipants(
                                                                    participants,
                                                                    _id
                                                                )
                                                            }
                                                        >
                                                            Participants [
                                                            {participantcount}]
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Button
                                                            variant="contained"
                                                            onClick={(e) =>
                                                                handleWinner(
                                                                    participants,
                                                                    _id
                                                                )
                                                            }
                                                        >
                                                            Winner
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{ height: 53 * emptyRows }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                colSpan={6}
                                                sx={{ py: 3 }}
                                            >
                                                <Paper
                                                    sx={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        paragraph
                                                    >
                                                        Not found
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No results found for
                                                        &nbsp;
                                                        <strong>
                                                            &quot;{filterName}
                                                            &quot;
                                                        </strong>
                                                        .
                                                        <br /> Try checking for
                                                        typos or using complete
                                                        words.
                                                    </Typography>
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[25, 50, 100]}
                        component="div"
                        count={raffles.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        "& .MuiMenuItem-root": {
                            px: 1,
                            typography: "body2",
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem>
                    <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: "error.main" }}>
                    <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}
