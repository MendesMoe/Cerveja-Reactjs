import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'


//exemple de hook
const Counter = (props)=>{

    // gestion des state
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Gégé");
    
    // se déclenche au changement de props
    useEffect(() => {
        console.log('Je m\'execute sans rien')
        console.log(props);
    }, [props]);
    
    // se déclenche au changement de state count
    useEffect(() => {
        console.log('Je m\'execute à chaque count')
        console.log(count);
    }, [count]);
    

     // se déclenche au changement de state name
    useEffect(() => {
        console.log('Je m\'execute à chaque name')
        console.log(name);
    }, [name]);
    
     // se déclenche au changement de state count ou name
    useEffect(() => {
        console.log('Je m\'execute à count + name')
        console.log(count);
    }, [count, name]);
    
    const test = () => {
        return (
            <div>
                <p>je suis le test</p>
            </div>
        )
    }
    
    return (
        <div>
            <h1>Le compteur</h1>
            <p>Le compteur est à : {count}</p>
            <p>Un props : {props.something}</p>
            <p>Le nom est  : {name}</p>
            {test()}
            <button
                onClick={(e)=>{
                    setCount(count + 1);
                }}
            >+ 1</button>
            <button
                onClick={(e)=>{
                    setName('Bernard');
                }}
            >Changer le nom</button>
            <button
                onClick={(e)=>{
                    setName('Bernard');
                    setCount(1);
                }}
            >Changer TOUT</button>
        </div>
    )
}


const mapStateToProps = (store) => {
  return {
  	cart: store.basket,
  	user: store.user
  }
}
const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);



/*class Counter extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    
    render(){
        return (
            <div>
                <h1>Le compteur</h1>
                <p>Le compteur est à : {this.state.count}</p>
                <button
                    onClick={(e)=>{
                        this.setState({count: this.state.count + 1});
                    }}
                >+ 1</button>
            </div>
        )
    }
    
}

export default Counter;*/