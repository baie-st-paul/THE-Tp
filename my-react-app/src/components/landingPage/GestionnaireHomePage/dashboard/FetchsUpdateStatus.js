const updateStatusCvVuG = async (token, matricule, status) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/gestionnaire/dashboard/update/cv/${matricule}/${status}`,
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
            console.error("Failed to update status cv");
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

const updateStatusOffreVuG = async (token, titre, status) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/gestionnaire/dashboard/update/offre/${titre}/${status}`,
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

const updateStatusEntrevueVuG = async (token, matricule, status) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/gestionnaire/dashboard/update/entrevue/${matricule}/${status}`,
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

const updateStatusCandidatureEmbaucheVuG = async (token, matricule, status) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/gestionnaire/dashboard/update/embauche/${matricule}/${status}`,
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
            console.error("Failed to update status embauche");
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

const updateStatusContratVuG = async (token, matricule, status) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/gestionnaire/dashboard/update/contrat/${matricule}/${status}`,
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
    updateStatusCvVuG,
    updateStatusOffreVuG,
    updateStatusEntrevueVuG,
    updateStatusCandidatureEmbaucheVuG,
    updateStatusContratVuG
}

export default exportedFetchsUpdateStatus
