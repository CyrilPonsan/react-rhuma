import { useState } from 'react'
import '../css/Header.css'
import Formulaire from './Formulaire'

function Header() {
    const [isLogged, setIsLogged] = useState(false);
    const [value, setInputValue] = useState('');

    return (
        <header>
            <div>
                <h1>RHUMA Sug'</h1>
            </div>
            { !isLogged ? 
            <div>
                <Formulaire isLogged={isLogged} setIsLogged={setIsLogged} value={value} setInputValue={setInputValue} />
            </div> : 
            <div>
                <h3>Bonjour {value}</h3>
                <img src="../img/logout.png" alt="icone logout" onClick={() => setIsLogged(false)} />
            </div>
            }
        </header>
    )
}

export default Header