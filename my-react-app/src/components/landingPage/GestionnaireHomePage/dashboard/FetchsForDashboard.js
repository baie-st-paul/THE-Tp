const fetchCvList = async (token, cvList, setCvList) => {
    try {
        fetch(
            "http://localhost:8081/api/v1/gestionnaire/cvs",
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
                const data = await res.json()
                try {
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
                setCvList(data);
                console.log("cvList",data)
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        if (cvList !== undefined){
            setCvList(cvList)
        }
    }
}

const fetchSessions = async (token, sessions, setSession) => {
    try {
        fetch(
            'http://localhost:8081/api/v1/gestionnaire/getSessions',
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
                const data = await res.json()
                try {
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
                setSession(data);
                console.log("sessions",data)
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        if (sessions !== undefined){
            setSession(sessions)
        }
    }
    return sessions
}

const fetchOffreList = async (token, offres, setOffres) => {
    try {
        fetch(
            'http://localhost:8081/api/v1/gestionnaire/offres',
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
                const data = await res.json()
                try {
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
                setOffres(data);
                console.log("offres",data)
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        if (offres !== undefined){
            setOffres(offres)
        }
    }
}

const getEtudiantsEntrevue = async (token, candidaturesEntrevue, setCandidaturesEntrevue) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/gestionnaire/studentsWithEntrevue`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true
            }
        ).catch(error => {
            console.log(error)
        }).then(
            async (res) => {
                const data = await res.json()
                try {
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
                setCandidaturesEntrevue(data)
                console.log("candidaturesEntrevue",data)
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        if (candidaturesEntrevue !== undefined){
            setCandidaturesEntrevue(candidaturesEntrevue)
        }
    }
}

const getEtudiantsEmbauches = async (token, candidaturesEmbauches, setCandidaturesEmbauches) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/gestionnaire/candidatures/acceptees`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true
            }
        ).catch(error => {
            console.log(error)
        }).then(
            async (res) => {
                const data = await res.json()
                try {
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
                setCandidaturesEmbauches(data)
                console.log("candidaturesEmbauches",data)
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        if (candidaturesEmbauches !== undefined){
            setCandidaturesEmbauches(candidaturesEmbauches)
        }
    }
}

const fetchContrats = async (token, contrats, setContrats) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/gestionnaire/getContrats`,
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
                try {
                    console.log(res.status)
                    if (res.ok) {
                        const data = await res.json()
                        setContrats(data)
                        console.log("contrats",data)
                    }
                    else {
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
    fetchCvList,
    fetchSessions,
    fetchOffreList,
    getEtudiantsEntrevue,
    getEtudiantsEmbauches,
    fetchContrats
}

export default exportedFetchs
