import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const AddNewContact = () => {

    return (
        <div className="container">
            <form>
                <h1 className="text-center">Add a New Contact</h1>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="inputName" placeholder="Enter Full Name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="Enter e-mail" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputPhone" placeholder="Enter Phone Number" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="Enter Address" />
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
};
