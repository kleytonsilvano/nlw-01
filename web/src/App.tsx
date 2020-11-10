import React, { useState} from 'react';
import './App.css';
import Routes from './routes';

// JSX: Sintaxe de XML dentro do JavaScript
function App() {
  return (
    <Routes />
  );
  
}



/*
------ Estado REACT
import React, { useState} from 'react';

const [counter, setCounter] = useState(0);// Retorna Array [valor do Estado, Função para atualizar o valor do estado]

  function handleButtonClick() {
    setCounter(counter + 1);
  }

  return ( 
      <div>
        <Header title={`${counter}`} />
        <button type="button" onClick={handleButtonClick}>Aumentar</button>
      </div>
    );

*/

/*
      return ( <h1>Hello World</h1> );
      Em versões antigas de react utilizava
      return React.createElement('h1', {
          children: 'Hello World'
      });
    */

export default App;
