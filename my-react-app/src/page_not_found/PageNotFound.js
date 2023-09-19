import React from "react";
import "./PageNotFound.css"
const PageNotFound = () =>
    <div className="container text-center mt-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <img
                    src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                    alt="404 Page Not Found"
                    className="img-fluid"
                />
                <h1 className="mt-4">404 - Page Not Found</h1>
                <p className="lead">Oops! The page you are looking for does not exist.</p>
            </div>
        </div>
    </div>


export default PageNotFound
