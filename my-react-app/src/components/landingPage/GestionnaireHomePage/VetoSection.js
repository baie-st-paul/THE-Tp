import React, { useState, useEffect } from "react";
import "./VetoSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faClock } from "@fortawesome/free-solid-svg-icons"; // Import the clock icon

const VetoSection = () => {
    const [cvList, setCvList] = useState([]);
    const [filterOption, setFilterOption] = useState("all"); // Default filter option
    const [shouldRefetch, setShouldRefetch] = useState(false); // State variable to trigger a refetch

    useEffect(() => {
        const fetchCvList = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/v1/gestionnaire/cvs");
                if (response.ok) {
                    const data = await response.json();
                    setCvList(data);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCvList();
    }, [shouldRefetch]); // Include shouldRefetch in the dependency array

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const updateStatus = async (matricule, status) => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/gestionnaire/cvs/accept/${matricule}/${status}`, {
                method: 'POST',
            });

            if (response.ok) {
                // Trigger a refetch of the data when the response is successful
                setShouldRefetch(!shouldRefetch);
            } else {
                console.error("Failed to accept CV");
            }
        } catch (error) {
            console.error("Error accepting CV:", error);
        }
    };

    // Filter and group the data based on the selected option
    const filteredCvList =
        filterOption === "all"
            ? cvList
            : cvList.filter((cvDto) => cvDto.status === filterOption);

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-12">
                    <h1 className="display-4 text-center m-2">CV des étudiants</h1>
                </div>
                <div className="col-lg-6 align-items-center">
                    <div className="text-center">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <h3 className="mb-0">Filtrer par</h3>
                            </div>
                            <div className="col-md-3">
                                <select
                                    className="form-control w-100 d-inline"
                                    value={filterOption}
                                    onChange={handleFilterChange}
                                >
                                    <option value="all">All</option>
                                    <option value="In_review">Pending</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Refused">Refused</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive table-container">
                <table className="table custom-table">
                    <thead>
                    <tr>
                        <th className="header-cell display-4">Matricule</th>
                        <th className="header-cell display-4">File Name</th>
                        <th className="header-cell display-4">Status</th>
                        <th className="header-cell display-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCvList.map((cvDto, index) => (
                        <tr key={index} className="table-row align-middle">
                            <td className="fw-semibold">{cvDto.matricule}</td>
                            <td className="fw-semibold">{cvDto.fileName}</td>
                            <td className="fw-semibold">
                                {cvDto.status === "In_review" && (
                                    <>
                                        <FontAwesomeIcon icon={faClock} /> Pending
                                    </>
                                )}
                                {cvDto.status === "Accepted" && (
                                    <>
                                        <FontAwesomeIcon icon={faCheck} /> Accepted
                                    </>
                                )}
                                {cvDto.status === "Refused" && (
                                    <>
                                        <FontAwesomeIcon icon={faTimes} /> Refused
                                    </>
                                )}
                            </td>
                            <td>
                                {cvDto.status === "In_review" && (
                                    <>
                                        <button className="btn btn-success" onClick={() => updateStatus(cvDto.matricule, "Accepted")}>
                                            <FontAwesomeIcon icon={faCheck} /> Accepter
                                        </button>
                                        <button className="btn btn-danger" onClick={() => updateStatus(cvDto.matricule, "Refused")}>
                                            <FontAwesomeIcon icon={faTimes} /> Refuser
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VetoSection;
