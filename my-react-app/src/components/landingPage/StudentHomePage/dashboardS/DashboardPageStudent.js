import {useEffect, useState} from "react";

const DashboardPageStudent = () => {
    const [offres, setOffres] = useState([])
    const [entrevues, setEntrevues] = useState([])
    const [contrats, setContrats] = useState([])

    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
    }, []);

    const getFetchs = async () => {

    }

    return (
        <div></div>
    )
}
