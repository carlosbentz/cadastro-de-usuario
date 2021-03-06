//model ui
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
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    backgroundColor: "white",
    padding: "10px",
    boxShadow: "3px 3px 5px 6px lightgrey",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserRegister = () => {
  const history = useHistory();
  const classes = useStyles();
  let user = {};
  const schema = yup.object().shape({
    email: yup.string().email("Email Inválido").required("Campo obrigatório"),
    user: yup
      .string()
      .min(4, "Mínimo de 6 Dígitos")
      .required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 Dígitos")
      .matches(/^(?=.*?[#?!@$%^&*-])/, "Pelo menos um caracter especial.")
      .required("Campo obrigatório"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas Diferentes")
      .required("Campo obrigatório"),
    name: yup
      .string()
      .min(6, "Mínimo de 6   Dígitos")
      .matches(
        /^[a-zA-Z]{4,}(?: [a-zA-Z]+){1,2}$/,
        "Deve ter pelo menos nome e sobrenome, e não pode conter caracteres especiais."
      )
      .required("Campo obrigatório"),
  });

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data) => {
    user = { ...data };
    console.log(user);

    axios
      .post("https://ka-users-api.herokuapp.com/users", { user })
      .then((res) => console.log(res))
      .then((res) => history.push("/"))
      .catch((err) =>
        setError("password", {
          message:
            err.response.data.error.user_authentication &&
            "Credenciais Inválidas",
        })
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(handleForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                name="user"
                variant="outlined"
                required
                fullWidth
                id="user"
                label="Nome de usuário"
                autoFocus
                inputRef={register}
                error={!!errors.user}
                helperText={errors.user?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome completo"
                inputRef={register}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Endereço de E-mail"
                name="email"
                autoComplete="email"
                inputRef={register}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirmar senha"
                type="password"
                id="passwordConfirm"
                inputRef={register}
                error={!!errors.passwordConfirm}
                helperText={errors.passwordConfirm?.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/" variant="body1">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default UserRegister;
