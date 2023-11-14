const updateStatusContratVuE = async (token, matricule, status) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/employers/dashboard/update/contrat/${matricule}/${status}`,
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
    updateStatusContratVuE
}

export default exportedFetchsUpdateStatus
