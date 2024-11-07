import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {

    const { store, actions } = useContext(Context);
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const params = useParams()
    const navigate = useNavigate()

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

    const saveInfo = async (event) => {
        event.preventDefault()

        if (nameValue == '' || emailValue == '' || phoneValue == '' || addressValue == '') {
            alert("Falta rellenar algún campo")
            return
        }
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.contactInfo.slug}/contacts/${params.id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "name": nameValue,
                        "phone": phoneValue,
                        "email": emailValue,
                        "address": addressValue
                    })
                }
            )
            if (response.status !== 200) {
                console.log('Algo salió mal con el PUT...');
                return
            }
            await actions.getAgenda()
            navigate("/contact")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const found = store.contactInfo.contacts.find((item) => item.id == params.id);
        setNameValue(found.name)
        setEmailValue(found.email)
        setPhoneValue(found.phone)
        setAddressValue(found.address)
    }, [])

    return (
        <div className="container">
            <form onSubmit={saveInfo}>
                <h1 className="text-center">Edit Contact</h1>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="inputName"
                        value={nameValue} onChange={handleNameChange} placeholder="Enter Full Name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="text" className="form-control" id="inputEmail"
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
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
                <Link to="/contact">
                    <p>Or get back to contacts</p>
                </Link>
            </form>
        </div>
    );

}