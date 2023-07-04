import React, { useState } from "react";

import { TextField, Flex, Text, Button } from "@aws-amplify/ui-react";

const CreateTodo = ({ onCreateTodo }) => {
  const [todoItem, setTodoItem] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const onTitleChange = (e) => {
    const { name, value } = e.target;
    setTodoItem(value);
  };

  const onDescChange = (e) => {
    const { name, value } = e.target;
    setTodoDescription(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onCreateTodo(todoItem, todoDescription)
    setTodoItem("");
    setTodoDescription("");
  };

  return (
    <>
        <div className="px-4 py-2 rounded-lg w-96">
          <h1 className="text-center mt-4 mb-4 text-xl text-white">
            Todo form
          </h1>
          <Flex as="form" direction="column" width="20rem">
            <TextField
              descriptiveText={
                <Text 
                  as="span" 
                  fontSize="0.8rem" 
                  color="red" 
                  fontStyle="italic"
                >
                  Required
                </Text>}
              placeholder="Title"
              label="Title"
              errorMessage="There is an error"
              isRequired={true}
              labelHidden={true}
              value={todoItem}
              onChange={onTitleChange}
            />
            <TextField
              descriptiveText="Enter a valid description"
              placeholder="Description"
              label="Description"
              errorMessage="There is an error"
              isRequired={true}
              labelHidden={true}
              value={todoDescription}
              onChange={onDescChange}
            />
            <Button type="submit" onClick={onSubmit}>Submit</Button>
          </Flex>
        </div>
    </>
  );
};

export default CreateTodo;