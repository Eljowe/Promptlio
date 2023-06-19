import React, { useState } from "react";

const CreateTodo = ({ onCreateTodo }) => {
  const [todoItem, setTodoItem] = useState("");

  const onInputChange = (e) => {
    const { value } = e.target;
    setTodoItem(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onCreateTodo(todoItem)
    setTodoItem("");
  };

  return (
    <>
      <form className="flex justify-center mt-10">
        <div className="bg-gray-800 px-4 py-2 rounded-lg w-96">
          <h1 className="text-center mt-4 mb-4 text-2xl text-white font-bold">
            TodoList
          </h1>
          <div className="mt-6 flex space-x-4 m-10 justify-center">
            <input
              className="bg-white rounded-md py-2 px-4 border-2 outline-none text-black"
              id="todo"
              name="todo"
              value={todoItem}
              placeholder="Create a new Todo"
              onChange={onInputChange}
              />
            <button
              className="bg-blue-600 text-white px-4 rounded-md"
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