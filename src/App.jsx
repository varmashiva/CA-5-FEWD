// Importing necessary dependencies and components, including Books and Form, and using React Router's Routes and Route components.
import React from 'react';
import Books from './Components/Books';
import Form from './Components/Form';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/register" element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;
