import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faEnvelope, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export const ContactList = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <div className="d-md-flex justify-content-md-end mb-2">
                <Link to="/addcontact">
                    <button className="btn btn-success">Add new contact</button>
                </Link>
            </div>

            {store.demo.map((item, index) => {
                return (

                    <div key={index} className="container border border-secondary g-0 m-0" >
                        <div className="row g-0 px-5">
                            <div className="col-md-3 d-flex align-items-center p-2">
                                <img src="https://picsum.photos/150/150" className="img-fluid rounded-circle" alt="..." />
                            </div>
                            <div className="col-md-7  d-flex flex-column justify-content-center">
                                <div className="card-body">
                                    <h5 className="card-title">Name Lastname</h5>
                                    <p className="card-text m-0">
                                        <FontAwesomeIcon icon={faLocationDot} /> Address
                                    </p>
                                    <p className="card-text m-0">
                                        <FontAwesomeIcon icon={faPhone} />
                                        <small className="text-body-secondary"> (123) 456-7890
                                        </small>
                                    </p>
                                    <p className="card-text m-0">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        <small className="text-body-secondary"> email@email.com
                                        </small>
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2 d-flex justify-content-center align-items-center">
                                <button className="btn text-primary" onClick={() => actions.changeColor(index, "orange")}>
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>
                                <button className="btn text-danger" onClick={() => actions.changeColor(index, "orange")}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </div>
                        </div>
                    </div>

                );
            })}

            <br />
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div >
    );
};
