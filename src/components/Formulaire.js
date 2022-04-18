import { useState } from "react";

function Formulaire({isLogged, setIsLogged, value, setInputValue}) {

    function handleSubmit(event) {
        event.preventDefault();
        setIsLogged(true);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    eMail :
                    <input type="email" value={value} onChange={(e) => setInputValue(e.target.value)} />
                </label>
                <input type="submit" value="submit"/>
            </form>
        </>
    )
}
 
export default Formulaire;