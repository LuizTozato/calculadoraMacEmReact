import React, { Component } from "react";
import './Calculator.css'

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    
    state = {...initialState} //criando um clone

    clearMemory() {
        this.setState({...initialState}) //settando um clone
    }
    
    setOperation(operation) {
        if (this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '=' //se eu cliquei no 'igual', a operation vai ser true
            const currentOperation = this.state.operation

            const values = [...this.state.values] //fazendo um clone do values de state
            
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) //ex: vai gerar um template string escrito: `25+10`. Daí o eval transforma isso em JS e executa a operação matemática
                if(isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                    return
                }
            } catch(e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals? null : operation,
                current: equals? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }

        //só limpa se tiver um 0 na tela ou se o gatilho de limpeza estiver como true
        const clearDisplay = this.state.displayValue === '0' //isso é uma validação. vai retornar um boolean
            || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n

        this.setState({ displayValue, clearDisplay: false})

        if ( n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values] //estou clonando o array
            values[i] = newValue
            this.setState({values}) //se deixar o atributo com o mesmo nome da chave, ele faz a substituição normalmente. Do contrário, precisa passar o objeto com chave e valor
            console.log(values)
        }

    }

    render () {
        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)
        
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={() => this.clearMemory()} triple/>
                <Button label="/" click={setOperation} operation/>
                <Button label="7" click={addDigit}/>
                <Button label="8" click={addDigit}/>
                <Button label="9" click={addDigit}/>
                <Button label="*" click={setOperation} operation/>
                <Button label="4" click={addDigit}/>
                <Button label="5" click={addDigit}/>
                <Button label="6" click={addDigit}/>
                <Button label="-" click={setOperation} operation/>
                <Button label="1" click={addDigit}/>
                <Button label="2" click={addDigit}/>
                <Button label="3" click={addDigit}/>
                <Button label="+" click={setOperation} operation/>
                <Button label="0" click={addDigit} double/>
                <Button label="." click={addDigit}/>
                <Button label="=" click={setOperation} operation/>
            </div>
        )
    }
}