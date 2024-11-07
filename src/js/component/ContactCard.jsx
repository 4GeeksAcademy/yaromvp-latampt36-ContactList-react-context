import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faEnvelope, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export const ContactCard = (props) => {
    const { store, actions } = useContext(Context);

    const deleteContact = async (id) => {
        try {
            console.log(id)
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.contactInfo.slug}/contacts/${id}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify() //No se necesita body pero lo dejamos de muestra
                }
            )
            if (response.status !== 204) {
                console.log('Algo salió mal con el DELETE...');
                return
            }
            actions.getAgenda()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div key={props.index} className="card container border border-secondary g-0 m-0">
            <div className="row g-0 px-5">
                <div className="col-md-3 d-flex align-items-center p-2">
                    <img src="https://picsum.photos/150/150" className="img-fluid rounded-circle" alt="..." />
                </div>
                <div className="col-md-7  d-flex flex-column justify-content-center">
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <p className="card-text m-0">
                            <FontAwesomeIcon icon={faLocationDot} /> {props.address}
                        </p>
                        <p className="card-text m-0">
                            <FontAwesomeIcon icon={faPhone} />
                            <small className="text-body-secondary"> {props.phone}
                            </small>
                        </p>
                        <p className="card-text m-0">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <small className="text-body-secondary"> {props.email}
                            </small>
                        </p>
                    </div>
                </div>
                <div className="col-md-2 d-flex justify-content-center align-items-center">
                    <Link to={`/editcontact/${props.index}`}>
                        <button className="btn text-primary">
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                    </Link>

                    <button className="btn text-danger" data-bs-toggle="modal" data-bs-target={`#modal${props.index}`}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>

                    <div className="modal fade" id={`modal${props.index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">If you continue, the <strong>{props.name}</strong> contact will be delete permanently.</div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteContact(props.index)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}