import { FormikValues, FormikHelpers, Formik } from "formik";
import { LoginForm } from "./LoginForm";
import { LoginValidationSchema } from "./LoginValidationSchema";
import { Grid } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
    username: String;
    password: String;
}

export const LoginFormik = () => {
    const initialValues: LoginFormProps = { username: "", password: "" };
    const navigate = useNavigate();

    const handleSubmit = (values: FormikValues, { resetForm }: FormikHelpers<LoginFormProps>) => {
        console.log("values", values);
        resetForm();
    };

    const handleLinkClick = (to: string) => {
        navigate(to);
    };

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={LoginValidationSchema}
                onSubmit={handleSubmit}
            >
                <LoginForm />
            </Formik>
            <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                    <Link onClick={() => handleLinkClick("/registration")} href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};
