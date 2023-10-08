import { useActions } from "common/hooks/useAction";
import { authThunks } from "features/Login/model/authSlice";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { BaseResponseType, LoginDataType } from "common/types/types";

export const useLogin = () => {
  const { login } = useActions(authThunks);

  //Example usage Omit and Partial
  // type FormikErrorType = Partial<Omit<LoginDataType, "captcha">>;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    // Обычная валидация
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(3, "must be at least 3 characters long")
        .required("Required"),
    }),
    onSubmit: (data, formikHelpers: FormikHelpers<LoginDataType>) => {
      login({ data })
        //Валидация через createAsyncThunk т.к возвращяет промис
        .unwrap()
        .then(() => {
          console.log("this could be your validation");
        })
        .catch((data: BaseResponseType) => {
          const { fieldsErrors } = data;
          fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        });
    },
  });
  return { formik };
};
