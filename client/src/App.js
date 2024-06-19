import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import LancamentoNotas from './pages/LancamentoNotas';
import PrivateRoute from './components/PrivateRoute';

// Reducers
import userReducer from './reducers/Users';
import notesReducer from './reducers/Notes';
import genericReducer from './reducers/Generic';


// Redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'


// Criação do store do redux;

let allReducers = combineReducers({ user: userReducer, note: notesReducer, generic: genericReducer })
let store = createStore(allReducers)


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute element={<AdminPanel />} />} />
            <Route path="/lancamentonotas" element={<PrivateRoute element={<LancamentoNotas />} />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
