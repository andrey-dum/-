import React, { useState } from 'react'
import { ping } from '../util/ping';

let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
let regex = new RegExp(expression);

export default function Ping() {
  const [input, setInput] = useState('')

  const changeHandler = (e) => {
    setInput(e.target.value)
  }

  const getPing = () => {
    if(input.match(regex)) {
      ping(input).then(function(result) {
        alert(result)
      }).catch(function(error) {
        console.log(error)
      });
    } else {
      alert('Неверный адрес!')
    }
	}

  return (
    <div className="ping">
      <input
        value={input}
        onChange={changeHandler}
        placeholder="https://website.com"
      />
      <button onClick={getPing} disabled={!input}>Ping</button>
    </div>
  )
}
