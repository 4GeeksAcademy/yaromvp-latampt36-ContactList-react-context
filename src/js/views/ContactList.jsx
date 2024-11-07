import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext.js";

import { ContactCard } from "../component/ContactCard.jsx";

export const ContactList = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAgenda()
    }, [])

    return (
        <div className="container">
            <div className="d-md-flex justify-content-md-between mb-2">
                <h1>{store.contactInfo.slug}'s contacts</h1>
                <Link to="/addcontact">
                    <button className="btn btn-success">Add new contact</button>
                </Link>
            </div>

            {//store.contactInfo.contacts.length === 0 ? <h4 className="text-center">No contacts here, add a new contact</h4> :
                store.contactInfo.contacts?.map((item) => {
                    return (
                        <ContactCard index={item.id} name={item.name} address={item.address} phone={item.phone} email={item.email} />
                    )
                })
            }

            <br />
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div >
    );
};
