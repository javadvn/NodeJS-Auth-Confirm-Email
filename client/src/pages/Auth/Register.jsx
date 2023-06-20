import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import { paperStyle } from "./AuthStyles";
import { singUpValidations } from "./validations";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const RegisterPage = () => {
  const navigate = useNavigate()
  //use Formik
  const { handleSubmit, handleChange, touched, values, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: singUpValidations,
    onSubmit: (data) => {
      axios.post("http://localhost:5000/api/webuser/register", data)
        .then(res =>{
          localStorage.setItem("userEmail", JSON.stringify(res.data.email))
          navigate("/confirm")
        } )
    },
  });

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid textAlign="center" marginBottom={2}>
          <Typography variant="h5" fontWeight="bold">
            Sign Up
          </Typography>
          <Typography variant="caption">
            Please fill this from to create an account!
          </Typography>
        </Grid>
        <Grid>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="name"
            label="name"
            variant="standard"
            placeholder="Enter you name"
            onChange={handleChange}
            value={values.name}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="standard"
            placeholder="Enter you email"
            onChange={handleChange}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            variant="standard"
            placeholder="Enter you password"
            onChange={handleChange}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            type="password"
            name="confirmPassword"
            fullWidth
            label="Confirm Password"
            variant="standard"
            placeholder="Enter you comfirm password"
            onChange={handleChange}
            value={values.confirmPassword}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <Grid marginTop={3}>
            <Button
              fullWidth
              textAlign="center"
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};
