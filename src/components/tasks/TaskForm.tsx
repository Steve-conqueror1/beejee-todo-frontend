import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "formik";
import { TextInput } from "../inputs/shared/inputs/TextInput";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const TaskForm: React.FC = () => {
    const classes = useStyles();

    return (
        <Form noValidate className={classes.form}>
            <TextInput label="Task" name="text" placeholder="Enter Task" required />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Send Task
            </Button>
        </Form>
    );
};