import React, { useState } from "react";
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const [error, setError] = useState(null);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5003/api/hospital/emp_login", value)
      .then((result) => {
        if (result.data.loginStatus) {
          toast.success("Login Successfuly !", {
            position: "top-center"
         });
          navigate("/dashboard");
        } else {
          setError(result.Error);
          console.log(error)
        }
      })
      .catch((err) => {
        console.log(err);
       
      });
  };

  const paperStyle = {
    padding: 20,
    height: "80vh",
    width: 280,
    margin: "50px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Log In</h2>
        </Grid>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            placeholder="Enter User Email"
            variant="standard"
            fullWidth
            required
            onChange={(e) => setValue({ ...value, email: e.target.value })}
          />
          <TextField
            label="Password"
            placeholder="Enter User Password"
            variant="standard"
            type="password"
            fullWidth
            required
            onChange={(e) => setValue({ ...value, password: e.target.value })}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
        </form>
        <Typography>
          <Link to="#">Forgot password?</Link>
        </Typography>
        <Typography>
          Do you have an account? <Link to="#">Sign Up</Link>
        </Typography>
      </Paper>
      <ToastContainer/>
    </Grid>

  );
}

export default Login;
