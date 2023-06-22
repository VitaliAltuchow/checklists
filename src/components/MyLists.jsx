import { useState } from "react";

/**
 * A list whose name and color is passed by the parameters.
 * It is possible to insert any number of list entries, check them off and remove them.
 */
function MyList({ name, color }) {
  const [items, setItems] = useState([]);
  const [textInput, setTextInput] = useState("");

  return (
    <div className="list" style={{ backgroundColor: color }}>
      <h1>{name}</h1>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.key}>
              <input
                type="checkbox"
                checked={item.checked}
                onClick={(e) => {
                  setItems(
                    items.map((item2) => {
                      if (item2.key === item.key) {
                        return {
                          ...item2,
                          checked: !item2.checked,
                        };
                      } else {
                        return item2;
                      }
                    })
                  );
                }}
              />
              <span className={(item.checked ? "checked" : "") + " item-name"}>
                {item.name}
              </span>
            </li>
          );
        })}
        <li>
          <input
            type="text"
            className="inputNewItem"
            value={textInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (
                  !items.find((item) => item.key === textInput) &&
                  textInput != ""
                ) {
                  setItems([
                    ...items,
                    {
                      key: textInput,
                      name: textInput,
                      checked: false,
                    },
                  ]);
                }
                setTextInput("");
              }
            }}
            onChange={(e) => {
              setTextInput(e.target.value);
            }}
          />
          <button
            className="plus-button"
            onClick={() => {
              if (
                !items.find((item) => item.key === textInput) &&
                textInput != ""
              ) {
                setItems([
                  ...items,
                  {
                    key: textInput,
                    name: textInput,
                    checked: false,
                  },
                ]);
              }
              setTextInput("");
            }}
          >
            +
          </button>
        </li>
      </ul>

      {items.find((item) => item.checked === true) && (
        <button
          className="delete-button"
          onClick={() => {
            setItems(items.filter((item2) => !item2.checked));
          }}
        >
          Delete Checked Items
        </button>
      )}
    </div>
  );
}

/**
 * Container with the possibility to create as many lists (MyList Components) as you want.
 */
export default function MyLists() {
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
                  <MyList name={formTextInput} color={selectedColor}></MyList>,
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
                  <MyList name={formTextInput} color={selectedColor}></MyList>,
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
