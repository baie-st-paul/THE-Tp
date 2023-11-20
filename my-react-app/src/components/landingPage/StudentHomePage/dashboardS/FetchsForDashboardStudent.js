const fetchOffresStudent = async (token, offres, setOffres) => {
    try {
        fetch(
            'http://localhost:8081/api/v1/stages/offres/',
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
            }
        ).catch(error => {
            console.log(error)
        }).then(
            async (res) => {
                let data = await res.json()
                try {
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
                data = data.filter((offre) => {
                    return offre.status === "Accepted"
                })
                console.log("offres",data)
                setOffres(data);
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        if (offres !== undefined){
            setOffres(offres)
        }
    }
}

const fetchCandidaturesOffreId = async (token, candidaturesOffreId, setCandidaturesOffreId) => {
    const savedMatricule = localStorage.getItem("loggedInUserMatricule");
    try {
        fetch(
            `http://localhost:8081/api/v1/student/getMesCandidatures/${savedMatricule}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                withCredentials: true,
            }
        ).catch(error => {
            console.log(error)
        }).then(
            async (res) => {
                const data = await res.json();
                console.log(res.status)
                try {
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
                console.log("candidaturesOffreId", data)
                data.map(
                    (candidature) => {
                        console.log("offre id candidature", candidature.offreStageDTO.id)
                    }
                )
                setCandidaturesOffreId(data.map(
                    (candidature) => {
                        return candidature.offreStageDTO.id
                    }
                ))
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        setCandidaturesOffreId([])
        console.log(setCandidaturesOffreId)
    }
}

const fetchMesCandidatures = async (token, candidatures, setCandidatures) => {
    const savedMatricule = localStorage.getItem("loggedInUserMatricule");
    try {
        fetch(
            `http://localhost:8081/api/v1/student/getCandidatures/${savedMatricule}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                withCredentials: true,
            }
        ).catch(error => {
            console.log(error)
        }).then(
            async (res) => {
                const data = await res.json();
                console.log(res.status)
                try {
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
                console.log("candidatures", data)
                setCandidatures(data)
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        if (candidatures !== undefined){
            setCandidatures(candidatures)
        }
    }
}

const fetchStudentEntrevues = async (token, entrevues, setEntrevues) => {
    const savedMatricule = localStorage.getItem("loggedInUserMatricule");
    try {
        fetch(
            `http://localhost:8081/api/v1/stages/entrevues/students/${savedMatricule}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                withCredentials: true,
            }
        ).catch(error => {
            console.log(error)
        }).then(
            async (res) => {
                const data = await res.json();
                console.log(res.status)
                try {
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
                setEntrevues(data)
                console.log("entrevues",data)
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        if (entrevues !== undefined){
            setEntrevues(entrevues)
        }
    }
}

const fetchContrats = async (token, contrats, setContrats) => {
    const savedMatricule = localStorage.getItem("loggedInUserMatricule");
    try {
        fetch(
            `http://localhost:8081/api/v1/student/student-contracts/${savedMatricule}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                withCredentials: true,
            }
        ).catch(error => {
            console.log(error)
        }).then(
            async (res) => {
                console.log(res.status)
                try {
                    if (res.ok) {
                        const data = await res.json();
                        setContrats(data)
                        console.log("contrats",data)
                    } else {
                        const data = await res.json();
                        console.log('Erreur', res.status, data);
                    }
                } catch (e) {
                    console.log(e)
                }
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        setContrats([])
        console.log(contrats)
    }
}

const exportedFetchs = {
    fetchOffresStudent,
    fetchCandidaturesOffreId,
    fetchMesCandidatures,
    fetchStudentEntrevues,
    fetchContrats
}

export default exportedFetchs
