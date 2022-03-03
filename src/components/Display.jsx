import React from "react";
import './Display.css'

/*Display é a telinha da calculadora onde aparece o número digitado.*/
//veja que é uma arrow function, então o 'return' está omitido. Mas será retornad
export default props => 
    <div className="display">{props.value}</div>