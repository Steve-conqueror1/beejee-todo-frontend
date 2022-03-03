import React, {FC} from "react";
import { FormikValues, FormikHelpers, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "./../../helpers/api";
import { Alert } from "@material-ui/lab";
import { useSession} from "../../context/session.context";
import {taskValidationSchema} from "./taskValidationSchema";
import {TaskForm} from "./TaskForm";
import {Snackbar} from "@material-ui/core";
import {TableProps } from "../table/TodosTable";

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

type Params = {
    id?: string
}

export const TaskFormik: FC = () => {
    const [initialValues, setInitialValues] = React.useState<TaskProps>({ text: "" })
    const [session] = useSession();
    const {userId, token} = session
    const navigate = useNavigate();
    const { id } = useParams<Params>()

    const [open, setOpen] = React.useState(false);
    const [taskLoaded, setTaskLoaded] = React.useState(false);
    const [task, setTask] = React.useState<TableProps>();

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    navigate("/")
   };

       const getTask = (id: string) => {
        api(null, process.env.REACT_APP_API_SERVER2)
            .get<TableProps>(`/tasks/${id}`)
            .then((response: TableProps) => {
                setTask(response);
                setTaskLoaded(true)
            })
    };

       React.useEffect(() => {
           if(id){
             getTask(id)
           }
       }, [id])



       React.useEffect(() => {
        if(taskLoaded){
            setInitialValues({text: (task?.text) as string})
        }
       }, [taskLoaded])


    const handleSubmit = (values: FormikValues, actions: FormikHelpers<TaskProps>) => {
        const { setSubmitting } = actions;
        const method = id? 'put': 'post'
        const url = id ? `/tasks/${id}` : '/tasks'
        if(method==='put' && task?.text===values["text"]){
            navigate('/')
            return
        }
        let data;
        if(id){
            data = { user:userId, status: [task?.status[0], "отредактировано администратором"]}
        } else{
          data = { createdBy:userId}
        }
        api(token, process.env.REACT_APP_API_SERVER2)
            .init({
                body: JSON.stringify({...values, ...data}),
                headers: { "Content-Type": "application/json" },
            })
            [method]<TaskResponse>(url)
            .then(()=>{
                setOpen(true);
            })
            .catch(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" color="success">
                Task {id? "Updated" : "Created"} Successfully
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
