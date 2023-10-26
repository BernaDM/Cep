import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './App.css'
import api from './services/api.js'

function App() {
  const [input, setInput] = useState('')
  const [showCep, setShowCep] = useState({})

  async function handleSearch() {
    if (input === '') {
      alert('Digite um CEP!')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setShowCep(response)
      setInput('')
    } catch (error) {
      alert('Erro ao Buscar')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Busca-CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP..."
          value={input} onChange={(e) => setInput(e.target.value)} />

        <button className="buttonSerch" onClick={handleSearch}>
          <FiSearch size={18} />
        </button>
      </div>

      {Object.keys(showCep).length > 0 && (
        <main className="main">
          <h2>CEP: {showCep.data.cep}</h2>

          <span>{showCep.data.logradouro}</span>
          <span>{showCep.data.bairro}</span>
          <span>{showCep.data.localidade} - {showCep.data.uf}</span>
        </main>
      )}


    </div>
  );
}

export default App;
