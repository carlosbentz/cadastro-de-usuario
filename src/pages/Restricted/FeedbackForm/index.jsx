import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

const FeedbackForm = () => {
  const params = useParams();
  const history = useHistory();
  const classes = useStyles();
<<<<<<< HEAD
<<<<<<< HEAD
  const token = window.localStorage.getItem("authToken");

=======
  let user = {};
  const token = window.localStorage.getItem("authToken");
>>>>>>> 51147008bb4824f97092c3a32514bd50686f7b9c
=======
  let user = {};
>>>>>>> parent of b8b5b69... fixed axios bug
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    comment: yup.string(),
    grade: yup.number().required("Campo obrigatório"),
  });

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data) => {
<<<<<<< HEAD
    const user = { ...data };
    const headers = { authorization: token };
<<<<<<< HEAD
<<<<<<< HEAD
=======
    user = { ...data };
>>>>>>> parent of b8b5b69... fixed axios bug
    console.log(user);

    axios
      .post(`https://ka-users-api.herokuapp.com/users/${params.id}/feedbacks`, {
        user,
      })
      .then(
        (res) => console.log(res),
        history.push(
          `https://ka-users-api.herokuapp.com/users/${params.id}/feedbacks`
        )
      );
=======
=======
    console.log(user);
    console.log(headers);
>>>>>>> parent of 5114700... removed console.log's

    axios
      .post(
        `https://ka-users-api.herokuapp.com/users/${params.id}/feedbacks/`,
        user,
        { headers }
      )
<<<<<<< HEAD
      .then(history.push(`/users/${params.id}/feedbacks`));
>>>>>>> 51147008bb4824f97092c3a32514bd50686f7b9c
=======
      .then(
        (res) => console.log(res),
        history.push(`/users/${params.id}/feedbacks`)
      );
>>>>>>> parent of 5114700... removed console.log's
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Feedback
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(handleForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                autoFocus
                inputRef={register}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="comment"
                variant="outlined"
                required
                fullWidth
                id="comment"
                label="Comentário"
                inputRef={register}
                error={!!errors.comment}
                helperText={errors.comment?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="grade"
                label="Grade"
                id="grade"
                inputRef={register}
                error={!!errors.grade}
                helperText={errors.grade?.message}
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
            Enviar Feedback
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default FeedbackForm;
