// material ui

import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NavigationPanel from "../../components/navigationPanel/";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    backgroundColor: "white",
    padding: "10px",
    boxShadow: "3px 3px 5px 6px grey",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ setAuthenticated }) => {
  const history = useHistory();
  const classes = useStyles();
  const schema = yup.object().shape({
    password: yup
      .string()
      .min(4, "Mínimo de 4 Dígitos")
      .required("Campo obrigatório"),
    user: yup
      .string()
      .min(4, "Mínimo de 6 Dígitos")
      .required("Campo obrigatório"),
  });

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data) => {
    console.log(data);
    axios
      .post("https://ka-users-api.herokuapp.com/authenticate", { ...data })
      .then((res) => {
        window.localStorage.setItem("authToken", res.data.auth_token);
        console.log(window.localStorage);
        setAuthenticated(true);
        history.push("/users");
      })
      .catch((err) => {
        setError("password", {
          message:
            err.response.data.error.user_authentication &&
            "Credenciais Inválidas",
        });
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" color="primary">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(handleForm)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="Nome de usuário"
            name="user"
            autoComplete="user"
            autoFocus
            inputRef={register}
            error={!!errors.user}
            helperText={errors.user?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="register" variant="body1">
                {"Ainda não tem uma conta ? Cadastre-se aqui."}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
