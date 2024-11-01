import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faEnvelope, faPencil, faTrashCan, faRandom } from '@fortawesome/free-solid-svg-icons'
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

    //AQUÍ ME QUEDÉÉÉ ... Falta obtener el id del contacto y pasarlo a la otra vista
    const editClick = () => {
        let condition = getStore();
        alert(contition.editValue)
        setStore({ editValue: !condition.editValue })
        //!store.editValue ? setStore({ editValue: true }) : alert(store.editValue)
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
                    <Link to="/addcontact">
                        <button className="btn text-primary" onClick={() => editClick()}>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                    </Link>
                    <button className="btn text-danger" onClick={() => deleteContact(props.index)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </div>
        </div>
    )
}