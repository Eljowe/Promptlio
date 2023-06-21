import React, { useState } from "react";

const CreateTodo = ({ onCreateTodo }) => {
  const [todoItem, setTodoItem] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'todoItem') {
      setTodoItem(value);
    } else if (name === 'todoDescription') {
      setTodoDescription(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onCreateTodo(todoItem, todoDescription)
    setTodoItem("");
    setTodoDescription("");
  };

  return (
    <>
      <form className="flex justify-center mt-10">
        <div className="px-4 py-2 rounded-lg w-96">
          <h1 className="text-center mt-4 mb-4 text-xl text-white">
            Todo form
          </h1>
          <div className="mt-6 flex flex-col m-10 justify-center">
            <input
              className="bg-white rounded-md py-2 px-4 border-2 outline-none m-2 text-black"
              id="todo"
              name="todo"
              value={todoItem}
              placeholder="Todo title"
              onChange={onInputChange}
              />
               <input
              className="bg-white rounded-md py-2 px-4 border-2 outline-none m-2 text-black"
              id="todoDescription"
              name="todoDescription"
              value={todoDescription}
              placeholder="Description"
              onChange={onDescInputChange}
              />
            <button
              className="w-20 bg-blue-600 text-white p-2 rounded-md m-2"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTodo;