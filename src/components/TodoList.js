import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Container,
  Fab,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { v4 as uuid } from "uuid";
import CardImage from "./CardImage";

const useStyles = makeStyles((theme) => ({
  container: {},
  formContent: {
    padding: theme.spacing(4, 0, 4, 0),
  },
  formItem: {
    padding: theme.spacing(0, 2, 2, 0),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  gridCard: {
    padding: theme.spacing(2),
  },
  cardImage: {
    width: "100%",
    height: "auto",
  },
  cardButton: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
}));

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const classes = useStyles();

  const addTodo = () => {
    todoList.push({
      id: uuid(),
      title,
      message,
      image: `https://picsum.photos/id/${getRndInteger(0, 1000)}/300/200`,
    });
    setTodoList(todoList);
    setTitle("");
    setMessage("");
  };

  const removeTodo = ({ id }) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <Container className={classes.container}>
      <form
        className={classes.form}
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          if (title && message) {
            addTodo();
          }
        }}
      >
        <Grid container className={classes.formContent}>
          <Grid item xs={12} md={4} className={classes.formItem}>
            <TextField
              id="standard-basic"
              label="Title"
              className={classes.formItem}
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.formItem}>
            <TextField
              id="standard-basic"
              label="Message"
              className={classes.formItem}
              fullWidth
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2} className={classes.formItem}>
            <Fab color="primary" aria-label="add" type="submit">
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </form>
      <Grid container className={classes.formContent}>
        {todoList.map((todo) => (
          <Grid
            item
            key={todo.id}
            xs={12}
            sm={6}
            md={4}
            className={classes.gridCard}
          >
            <Card className={classes.card}>
              <CardImage
                src={todo.image}
                alt={todo.title}
                className={classes.cardImage}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {todo.title}
                </Typography>
                <Typography>{todo.message}</Typography>
              </CardContent>
              <CardActions className={classes.cardButton}>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="delete"
                  onClick={() => removeTodo(todo)}
                >
                  <DeleteIcon />
                </Fab>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
