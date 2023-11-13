const fetchOffresEmp = async (token, offres, setOffres) => {
    try {
        fetch(
            'http://localhost:8081/api/v1/stages/offres/employer',
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

const fetchContratsEmp = async (token, contrats, setContrats) => {
    let employerId = localStorage.getItem('employer_id')
    try {
        fetch(
            `http://localhost:8081/api/v1/employers/employer-contracts/${employerId}`,
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
    fetchOffresEmp,
    fetchContratsEmp
}

export default exportedFetchs
