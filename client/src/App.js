import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import LancamentoNotas from './pages/LancamentoNotas';
import ToDo from './pages/ToDo';
import HoursWorked from './pages/HoursWorked';
import Reports from './pages/Reports';
import PrivateRoute from './components/PrivateRoute';

// Reducers
import userReducer from './reducers/Users';

// Redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'


// Criação do store do redux;

let allReducers = combineReducers({ user: userReducer })
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
            <Route path="/todo" element={<PrivateRoute element={<ToDo />} />} />
            <Route path="/hoursworked" element={<PrivateRoute element={<HoursWorked />} />} />
            <Route path="/reports" element={<PrivateRoute element={<Reports />} />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
