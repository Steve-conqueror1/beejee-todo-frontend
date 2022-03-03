import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { api } from "./../../helpers/api";
import { useNavigate } from "react-router-dom";
import {useSession} from "../../context/session.context";
import {EditOutlined} from "@material-ui/icons";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        padding: "2rem 5rem",
        marginTop: "2rem",
    },
    button: {
        margin: "4rem 0",
    },
    btnContainer: {
        width: "70%",
        marginLeft: "15%",
    },
});

export interface UserProps {
    username: string;
    email: string;
}

export interface TableProps {
    username: string;
    email: string;
    status: string[];
    text: string;
    createdBy: UserProps;
}

export interface TaskResponse {
    data: TableProps[];
}

export const TodosTable: FC = () => {
    const classes = useStyles();
    const [tasks, setTasks] = React.useState<TableProps[]>();
    const navigate = useNavigate();
    const [session] = useSession()
    const {userType} = session


    const handleLinkClick = (to: string) => {
        navigate(to);
    };

    const getData = () => {
        api(null, process.env.REACT_APP_API_SERVER)
            .get<TableProps[]>("/tasks")
            .then((response: TableProps[]) => {
                setTasks(response);
            });
    };

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>USERNAME</TableCell>
                        <TableCell>EMAIL</TableCell>
                        <TableCell>TASK</TableCell>
                        <TableCell>STATUS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks &&
                        tasks.map((task, index) => (
                            <TableRow key={index}>
                                <TableCell>{task.createdBy.username}</TableCell>
                                <TableCell>{task.createdBy.email}</TableCell>
                                <TableCell>{task.status.join(" ")}</TableCell>
                                <TableCell>{task.text}{userType === "admin" && <Button  onClick={() => handleLinkClick("/tasks/update")}><EditOutlined color="primary"/> </Button>} </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <div className={classes.btnContainer}>
                <Button
                    onClick={() => handleLinkClick("/tasks/create")}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                >
                    Create Task
                </Button>
            </div>
        </TableContainer>
    );
};
