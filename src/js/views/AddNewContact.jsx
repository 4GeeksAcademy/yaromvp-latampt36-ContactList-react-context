import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const AddNewContact = () => {
    const { store, actions } = useContext(Context);
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [addressValue, setAddressValue] = useState('');

    const handleNameChange = (event) => {
        setNameValue(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmailValue(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhoneValue(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddressValue(event.target.value);
    };

    const saveInfo = async () => {
        try { //Guardar nuevo contacto
            const response = await fetch('https://playground.4geeks.com/contact/agendas/yaromvp/contacts', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "name": nameValue,
                    "phone": phoneValue,
                    "email": emailValue,
                    "address": addressValue
                })
            })
            if (response.status !== 201) {
                throw new Error(`Error en la solicitud: status code ${response.status}`)
            }
            const body = await response.json()
            console.log(body)
            alert(`Save Successful - Name: ${body.name}, Phone: ${body.phone}, Email: ${body.email}, Address: ${body.address}`)
            await actions.getAgenda()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /* FALTA MODIFICAR
    const editContact = async (id) => {
        try {
            console.log(id)
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.contactInfo.slug}/contacts/${id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({

                    })
                }
            )
            if (response.status !== 204) {
                console.log('Algo salió mal con el PUT...');
                return
            }
            actions.getAgenda()
        } catch (error) {
            console.log(error);
        }
    }*/

    return (
        <div className="container">
            <form>
                <h1 className="text-center">{store.editValue ? "Edit Contact" : "Add a New Contact"}</h1>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="inputName"
                        value={nameValue} onChange={handleNameChange} placeholder="Enter Full Name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail"
                        value={emailValue} onChange={handleEmailChange} placeholder="Enter e-mail" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputPhone"
                        value={phoneValue} onChange={handlePhoneChange} placeholder="Enter Phone Number" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress"
                        value={addressValue} onChange={handleAddressChange} placeholder="Enter Address" />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" onClick={saveInfo} >Save</button>
                </div>
                <Link to="/contact">
                    <p>Or get back to contacts</p>
                </Link>
            </form>
        </div>
    );
};
