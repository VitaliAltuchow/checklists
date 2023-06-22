import { useState } from "react";
import List from "./List";

/**
 * Container with the possibility to create as many lists (List Components) as you want.
 */
export default function Lists() {
  const grey = "#c5c5c5";
  const [lists, setLists] = useState([]);
  const [formTextInput, setFormTextInput] = useState("");
  const [newListForm, setNewListForm] = useState(false);
  const [selectedColor, setSelectedColor] = useState(grey);

  return (
    <div className="list-container">
      {lists}

      {!newListForm && (
        <button
          className="plus-button"
          onClick={(e) => {
            setNewListForm(true);
          }}
        >
          +
        </button>
      )}

      {newListForm && (
        <div className="list" style={{ backgroundColor: selectedColor }}>
          <input
            placeholder="Title"
            className="inputNewList"
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter" && formTextInput != "") {
                setLists([
                  ...lists,
                  <List name={formTextInput} color={selectedColor}></List>,
                ]);
                setNewListForm(false);
                setFormTextInput("");
                setSelectedColor(grey);
              }
            }}
            value={formTextInput}
            onChange={(e) => {
              setFormTextInput(e.target.value);
            }}
          />
          <input
            className="color-picker"
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
          <button
            className="newListSubmitButton"
            onClick={(e) => {
              if (formTextInput != "") {
                setLists([
                  ...lists,
                  <List name={formTextInput} color={selectedColor}></List>,
                ]);
                setNewListForm(false);
                setFormTextInput("");
                setSelectedColor(grey);
              }
            }}
          >
            Create List
          </button>
        </div>
      )}
    </div>
  );
}
