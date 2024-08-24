import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import md5 from "md5";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [characters, setCharacters] = useState<any[]>([]);

  const publicKey = import.meta.env.VITE_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;

  async function getCharaterData() {
    console.log("calling characters");
    setCharacters([]);

    let timeStamp = new Date().getTime();
    let hash = generateHash(timeStamp);

    let url = `http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&limit=10`

    let response = await fetch(url);
    let data = await response.json();

    setCharacters(data.data.results);

    console.log(characters);
  }

  function generateHash(timeStamp: number) {
    return md5(timeStamp + privateKey + publicKey);
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
