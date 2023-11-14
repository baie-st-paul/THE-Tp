const updateStatusOffreVuS = async (token, titre, status) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/student/update/offre/${titre}/${status}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
            }
        ).catch(error => {
            console.log(error)
            console.error("Failed to update status offre");
        }).then(
            async (res) => {
                try {
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
    }
}

const updateStatusEntrevueVuS = async (token, matricule, status) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/student/update/entrevue/${matricule}/${status}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
            }
        ).catch(error => {
            console.log(error)
            console.error("Failed to update status entrevue");
        }).then(
            async (res) => {
                try {
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
    }
}

const updateStatusContratVuS = async (token, matricule, status) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/student/update/contrat/${matricule}/${status}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
            }
        ).catch(error => {
            console.log(error)
            console.error("Failed to update status contrat");
        }).then(
            async (res) => {
                try {
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
    }
}

const exportedFetchsUpdateStatus = {
    updateStatusOffreVuS,
    updateStatusEntrevueVuS,
    updateStatusContratVuS
}

export default exportedFetchsUpdateStatus
