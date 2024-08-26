import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as MarvelService from './marvelService.ts'

function App() {
  const [characters, setCharacters] = useState<any[]>([]);

  async function getCharaterData() {
    console.log("calling characters");
    setCharacters([]);

    let results = await MarvelService.getCharacters()

    setCharacters(results);

    console.log(characters);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <button onClick={() => getCharaterData()}>Get Characters</button>

      <h2>Characters</h2>
      {characters && characters[0] && (
        <ul>
          {characters.map(c =>
            <li key={c.id}>
              {c.name}
            </li>
          )}
        </ul>
      )}
    </>
  )
}

export default App
