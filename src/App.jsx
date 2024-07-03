import React, { useReducer, useState } from 'react';
import './App.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return [...state, action.payload];
    case 'REMOVE_DATA':
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const timestamp = new Date();
      dispatch({ type: 'ADD_DATA', payload: { text: input, time: timestamp } });
      setInput('');
    }
  };

  const handleRemove = (index) => {
    dispatch({ type: 'REMOVE_DATA', payload: index });
  };

  return (
      <div className="box">
                  <div className="app">
      <h1 className="title">Ma'lumot Kiritish Formasi</h1>
      <form onSubmit={handleSubmit} className="form">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ma'lumot kiriting" 
          className="input" 
        />
        <button type="submit" className="button">Qo'shish</button>
      </form>

      {state.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ma'lumot</th>
              <th>Soat</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {state.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.text}</td>
                <td>{item.time.getHours()}:{item.time.getMinutes()}</td>
                <td>
                  <button 
                    onClick={() => handleRemove(index)} 
                    className="remove-button"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
      </div>
  );
};

export default App;

