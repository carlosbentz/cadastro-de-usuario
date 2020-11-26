import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavigationPanel from "../../../components/navigationPanel/";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  logoff: {
    width: "100%",
    color: "white",
  },
});

const UserFeedbacks = ({ authenticated }) => {
  const history = useHistory();
  const params = useParams();
  const token = window.localStorage.getItem("authToken");
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get(`https://ka-users-api.herokuapp.com/users/${params.id}/feedbacks`, {
        headers: { Authorization: token },
      })
      .then((res) => {
<<<<<<< HEAD
        console.log(res.data);
        setFeedbacks(res.data);
      });
  }, []);

=======
        setFeedbacks(res.data);
      });
  }, []);
>>>>>>> 51147008bb4824f97092c3a32514bd50686f7b9c
  const newFeedback = () => {
    history.push(`/users/feedback/${params.id}/new`);
  };

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, feedbacks.length - page * rowsPerPage);

  return (
    <div>
      {authenticated === true && <NavigationPanel></NavigationPanel>}
      <div>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Comentário</TableCell>
                <TableCell align="left">Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((feedback, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{feedback.name}</TableCell>
                    <TableCell align="left">{feedback.comment}</TableCell>
                    <TableCell align="left">{feedback.grade}</TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={feedbacks.length}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
      <AppBar position="static">
        <Button className={classes.logoff} onClick={newFeedback}>
          Novo Feedback
        </Button>
      </AppBar>
    </div>
  );
};

export default UserFeedbacks;
