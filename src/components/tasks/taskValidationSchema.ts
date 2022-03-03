import * as Yup from "yup";

export const taskValidationSchema = Yup.object().shape({
    text: Yup.string().required("Please enter task"),
});
