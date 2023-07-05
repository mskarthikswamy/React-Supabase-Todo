import React, { useEffect, useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [fetchTasks, setFetchTasks] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  ///////
  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  ///////////--FETCH TODO---/////////

  useEffect(() => {
    const getTask = async () => {
      const { data, error } = await supabase.from("todo's").select("todo");
      if (err) {
        setFetchError("could not fetch todo's");
        setFetchTasks(null);
        console.log(err);
      }
      if (data) {
        setFetchTasks(data);
        setFetchError(null);
      }
    };
    getTask();
  });

  ////////////////
  const AddTodo = (e) => {
    const todo = {
      id: Math.floor(Math.random() * 1000),
      value: newTodo,
    };
    setTodos((oldList) => [...oldList, todo]);

    setNewTodo("");
  };
  ////////////////
  const deleteHandler = (id) => {
    const newArray = todos.filter((todo) => todo.id !== id);
    setTodos(newArray);
  };

  ////////////////

  const editItem = (id, newText) => {
    const currItem = todos.filter((todo) => todo.id === id);
    const newItem = {
      id: currItem.id,
      value: newText,
    };
    deleteHandler(id);
    setTodos((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>TODO APP</h1>
      </div>
      <div style={{ marginLeft: "600px", marginTop: "70px" }}>
        <div
          style={{
            display: "flex",
            gap: "30px",
          }}
        >
          <div style={{}}>
            <Input
              size="lg"
              variant="solid"
              value={newTodo}
              onChange={(e) => {
                setNewTodo(e.target.value);
              }}
            />
          </div>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                AddTodo();
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>TASKS TO DO</h2>
        <ul style={{ listStyleType: "none" }}>
          {todos.map((todo) => {
            return (
              <>
                <li key={todo.id} onClick={() => setShowEdit(todo.id)}>
                  {todo.value}{" "}
                  <Button
                    onClick={() => {
                      deleteHandler(todo.id);
                    }}
                  >
                    X
                  </Button>
                </li>
                {showEdit === todo.id ? (
                  <div>
                    <Input
                      variant="outlined"
                      color="primary"
                      value={updatedText}
                      placeholder="add todo"
                      onChange={(e) => setUpdatedText(e.target.value)}
                    />
                    <Button onClick={() => editItem(todo.id, updatedText)}>
                      EDIT
                    </Button>
                  </div>
                ) : null}
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Todo;
