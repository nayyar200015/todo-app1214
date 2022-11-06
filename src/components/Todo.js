import { React, useState, useEffect } from 'react';
import '../App.css';

// * To get the data from Local Storage
const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if (list) {
        return JSON.parse(list);    //* To convert string to list
    } else {
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItem] = useState(getLocalItems()); //* List
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    // * To add a particular item
    const addItem = () => {
        if (!inputData) {   //* when no item is in input and plus is clicked
            alert('Please enter item!');
        } else if (inputData && !toggleSubmit) {    //* when there is an item to be edited
            setItem(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
            setInputData('');
            setIsEditItem(null);
            setToggleSubmit(true);
        } else {    //* when new item is to be added
            const allInputData = {
                // * to create a unique id which is realtime time
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItem([...items, allInputData]);
            setInputData('');
        }
    }

    // * To Edit a particular item
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        })
        setInputData(newEditItem.name);
        setToggleSubmit(false);
        setIsEditItem(id);
    }

    // * To delete a particular item
    const deleteItem = (id) => {
        const updatedItem = items.filter((elem) => {
            return id !== elem.id;
        })
        setItem(updatedItem);
    }

    // * To remove all items
    const removeAll = () => {
        setItem([]);
    }

    // * To add data to local storage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items)) //* we used JSON.stringify to convert to a string as local storage only accepts string data
    }, [items])

    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <figure>
                            <img src='images/todo.svg' alt="todologo" />
                            <figcaption>Add Your List Here ✌</figcaption>
                        </figure>
                    </div>
                    <div className="col-12">
                        <input
                            type="text"
                            placeholder="✍ Add Items..."
                            value={inputData}
                            onInput={(e) => setInputData(e.target.value)} />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> : <i className="far fa-edit edit-btn" title="Update Item" onClick={addItem}></i>
                        }
                    </div>

                    {
                        items.map((elem) => {
                            return (
                                <div className="col-12" key={elem.id}>
                                    <div className="eachitem">
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btns">
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)} ></i>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* To remove all items*/}
                    <div className="col-12">
                        <div className="showItems">
                            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> CHECK LIST </span> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Todo;
