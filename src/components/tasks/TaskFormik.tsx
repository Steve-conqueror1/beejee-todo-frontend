import React from "react";
import { FormikValues, FormikHelpers, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { api } from "./../../helpers/api";
import { Alert } from "@material-ui/lab";
import {Session, useSession} from "../../context/session.context";
import {taskValidationSchema} from "./taskValidationSchema";
import {TaskForm} from "./TaskForm";
import {Snackbar} from "@material-ui/core";


export interface User {
    email: string;
    username: string;
    password: string;
    userType: string;
}

interface TaskProps {
    text: String;
}

type TaskResponse = {
    text: string;
    status: string[];
    createdBy: string;
    id: string;
};

export const TaskFormik = () => {
    const initialValues: TaskProps = { text: "" };
    const [session] = useSession();
    const {userId, token} = session
    const navigate = useNavigate();

     const [open, setOpen] = React.useState(false);

     const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    navigate("/")
  };

    const handleSubmit = (values: FormikValues, actions: FormikHelpers<TaskProps>) => {
        const { setSubmitting } = actions;
        api(token, process.env.REACT_APP_API_SERVER)
            .init({
                body: JSON.stringify({...values, createdBy: userId }),
                headers: { "Content-Type": "application/json" },
            })
            .post<TaskResponse>("/tasks")
            .then(()=>{
                setOpen(true);
            })
            .catch((response: Response) => {
                setSubmitting(false);
            });
    };

    return (
        <>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert severity="success">
                Task Created Successfully
              </Alert>
            </Snackbar>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={taskValidationSchema}
                onSubmit={handleSubmit}
            >
                <TaskForm />
            </Formik>
            </>
    );
};
