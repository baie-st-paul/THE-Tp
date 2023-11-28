const fetchGestionnaire = async (token, gestionnaire, setGestionnaire) => {
    try {
        fetch(
            'http://localhost:8081/api/v1/gestionnaire/getGestionnaire',
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
            setGestionnaire(null)
        }).then(
            async (res) => {
                try {
                    console.log(res.status)
                    if (res.ok) {
                        const data = await res.json();
                        setGestionnaire(data);
                        console.log("gestionnaire",data)
                        localStorage.setItem("gestionnaireMatricule", data.matricule)
                    } else {
                        console.log("Failed to fetch data");
                        setGestionnaire(null)
                    }
                } catch (e) {
                    console.log(e)
                    setGestionnaire(null)
                }
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        setGestionnaire(null)
    }
}

const fetchSignature = async (token, signature, setSignature) => {
    try {
        const matricule = localStorage.getItem("gestionnaireMatricule")
        console.log(matricule)
        fetch(
            `http://localhost:8081/api/v1/stages/signatures/gestionnaire/get/${matricule}`,
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
            setSignature(null)
        }).then(
            async (res) => {
                try {
                    console.log(res.status)
                    if (res.ok) {
                        const data = await res.json()
                        setSignature(data)
                        console.log("signature",data)
                    }
                    else {
                        console.log("Failed to fetch data")
                        setSignature(null)
                    }
                } catch (e) {
                    console.log(e)
                    setSignature(null)
                }
            })
    } catch (error) {
        console.error("Error fetching data:", error);
        setSignature(null)
    }
}

const exportedFetchs = {
    fetchGestionnaire,
    fetchSignature
}

export default exportedFetchs
