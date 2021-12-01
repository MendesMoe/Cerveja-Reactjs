import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {config} from '../config';
import axios from 'axios';

//  gestion de la page profil utilisateur
// codage en hook

const Profil = (props)=>{
    // gestion de tous les states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    const [msg, setMsg] = useState(null);
    
    
    // s'execute à tous les changement de props
    useEffect(() => {
        console.log(props);
        setFirstName(props.user.infos.firstName);
        setLastName(props.user.infos.lastName);
        setAddress(props.user.infos.address);
        setCity(props.user.infos.city);
        setZip(props.user.infos.zip);
        setPhone(props.user.infos.phone);
    }, [props]);
    
    // on envoie le formulaire d'edition vers l'api
    const onSubmitForm = ()=>{
        let data = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            zip: zip,
            city: city,
            phone: phone
        }
        console.log(data)
        axios.put(config.api_url+'/api/v1/user/update/'+props.user.infos.id, data,{ headers: { 'x-access-token': props.user.infos.token }} )
        .then((response)=>{
            console.log(response);
            if(response.data.status === 200) {
                setMsg("Le profil a bien été modifié !")
            }
            
        })
    }
    
    
    return (
        <div>
            {msg !== null && <p>{msg}</p>}
            <h2>Mon profil</h2>
            {props.user.isLogged &&
            <form
                className="b-form"
                onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmitForm()
                }}
            >
                <input 
                    type="text"
                    placeholder="Prénom"
                    defaultValue={props.user.infos.firstName}
                    onChange={(e)=>{
                        setFirstName(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Nom"
                    defaultValue={props.user.infos.lastName}
                    onChange={(e)=>{
                        setLastName(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Adresse"
                    defaultValue={props.user.infos.address}
                    onChange={(e)=>{
                        setAddress(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Code postal"
                    defaultValue={props.user.infos.zip}
                    onChange={(e)=>{
                        setZip(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Ville"
                    defaultValue={props.user.infos.city}
                    onChange={(e)=>{
                        setCity(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Téléphone"
                    defaultValue={props.user.infos.phone}
                    onChange={(e)=>{
                        setPhone(e.currentTarget.value)
                    }}
                />
                <input type="submit" name="Modifier"/>
            </form>}
        </div>
    )
}


const mapStateToProps = (store) => {
  return {
  	user: store.user
  }
}
const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Profil);