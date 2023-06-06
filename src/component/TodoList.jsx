import React, { useState } from "react";
import styled from 'styled-components';

const TodoWrapper = styled.section`
  padding: 2rem;
  background: lightblue;
  height: 100vh;
`;
const TodoListHeading = styled.h1`
  font-size: 25px;
  color: white;
  padding: 10px 10px;
`;
const TodoInput = styled.input`
  padding: 5px 15px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #eee;
  width: 100%;
  margin-bottom: 20px;
`;
const TodoListItems = styled.div`
  background-color: #ffffff;
  padding: 5px 15px;
`;

const ListItem = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 100%;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const DoneButton = styled.button`
  background-color: #00ff00;
  color: #000000;
  border: none;
  border-radius: 100%;
  width: 25px;
  height: 25px;
  margin-right: 5px;
  cursor: pointer;
`;

// Listing Component
const ListingRenderer = ({ items, onDelete, onDone }) => {
  return (
    <TodoListItems>
      {items &&
        items.map((item, index) => {
          return (
            <ListItem key={`item_${index}`}>
              {item.done ? <del>{item.title}</del> : <span>{item.title}</span>}
              <span>
                <DoneButton onClick={() => onDone && onDone(item.id)}>
                  {item.done ? "☑" : "☐"}
                </DoneButton>
                <DeleteButton onClick={() => onDelete && onDelete(item.id)}>
                  &times;
                </DeleteButton>
              </span>
            </ListItem>
          );
        })}
    </TodoListItems>
  );
};

const HeadingRenderer = ({ title, count }) => {
  return (
    <TodoListHeading>
      {title} <span>({count})</span>
    </TodoListHeading>
  );
};
const InputRenderer = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      onAdd(inputValue);
      setInputValue("");
    }
  };

  return (
    <>
    <div>
      <TodoInput
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter an item"
    />
      <button onClick={handleAddItem}>Add</button>
      </div>
    </>
  );
};

const TodoList = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Item 1",
      done: true,
    },
    {
      id: 2,
      title: "Item 2",
      done: false,
    },
  ]);

  const handleDelete = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleDone = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      )
    );
  };

  const handleAddItem = (title) => {
    const newItem = {
      id: Date.now(),
      title: title,
      done: false,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <TodoWrapper>
      <HeadingRenderer title="My Todo List" count={items.length} />
      <InputRenderer onAdd={handleAddItem} />
      <ListingRenderer items={items} onDelete={handleDelete} onDone={handleDone} />
    </TodoWrapper>
  );
};

export default TodoList;
