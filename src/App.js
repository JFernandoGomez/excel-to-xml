import React from 'react';
import './App.css';
import InputExcel from './components/input';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>XLSX to XML</h1>
        <InputExcel></InputExcel>
        <h3>Only supports .xls, .xlsx, .xlt</h3>
      </header>
    </div>
  );
}

export default App;
