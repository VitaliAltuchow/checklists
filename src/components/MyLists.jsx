import { useState } from 'react'

function MyList({name, color}){
    const [items, setItems] = useState([]);
    const [textInput, setTextInput] = useState("");

    return (
    <div className='list' style={{backgroundColor: color}}>
    <h1>{name}</h1>
    <ul>
        {items.map(item => {
            return (
            <li key={item.key}>
                <input type="checkbox" checked={item.checked} onClick={e => {
                        setItems(items.map(item2 => {
                            if(item2.key === item.key){
                                return {
                                    ...item2,
                                    checked : !item2.checked
                                };
                            }else{
                                return item2;
                            }
                        }));
                    }}/>
                    <span className={(item.checked ? "checked" : "") + ' item-name'}>{item.name}</span>
            </li>);
        })}
        <li>
        <input type="text" className='inputNewItem' value={textInput} onKeyDown={(e) => {
            if(e.key === 'Enter'){
                
            if(! items.find(item => item.key === textInput) && textInput != ''){
                setItems([...items, {
                    key: textInput,
                    name: textInput,
                    checked: false
            }]);
            }
            setTextInput("");
            }
        }}  onChange={(e) => {setTextInput(e.target.value)}}/>
        <button className='plus-button' onClick={() => {
            if(! items.find(item => item.key === textInput) && textInput != ''){
                setItems([...items, {
                    key: textInput,
                    name: textInput,
                    checked: false
            }]);
            }
            setTextInput("");
        }}>
            +
        </button>
        </li>
    </ul>
        
        {items.find(item => item.checked === true) && 
        <button className='text-button delete-button' onClick={() => {
            setItems(items.filter(item2 => !item2.checked));
        }}>
            Delete Checked Items
        </button>}

    </div>);
}
export default function MyLists(){

    const [lists, setLists] = useState([]);
    const [formTextInput, setFormTextInput] = useState("");
    const [newListForm, setNewListForm] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#c5c5c5');

   return (<div className='list-container'>
    {lists}
    
    {!newListForm && <button className='plus-button' onClick={e => {
        setNewListForm(true);
    }}>+</button>}

    {newListForm && <div className='list' style={{backgroundColor: selectedColor}}>
        <input placeholder='Title' className='inputNewList' type='text' onKeyDown={(e) => {
            if(e.key === 'Enter' && formTextInput != ''){
                setLists([...lists, <MyList name={formTextInput} color={selectedColor}></MyList>])
            setNewListForm(false);
            setFormTextInput("");
            setSelectedColor('#c5c5c5');
            }
        }} value={formTextInput}
            onChange={(e) => {setFormTextInput(e.target.value);}}/>
        <input className='color-picker' type='color' value={selectedColor} onChange={e => setSelectedColor(e.target.value)}/>
        <button className='newListSubmitButton text-button' onClick={e => {
            if(formTextInput != ''){
                setLists([...lists, <MyList name={formTextInput} color={selectedColor}></MyList>])
                setNewListForm(false);
                setFormTextInput("");
                setSelectedColor('#c5c5c5');
            }
        }}>Create List</button>
    </div>}
    
    </div>);
}