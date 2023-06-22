import { useState } from "react";

/**
 * A list whose name and color is passed by the parameters.
 * It is possible to insert any number of list entries, check them off and remove them.
 */
export default function List({ name, color }) {
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
