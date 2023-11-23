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

const exportedFetchs = {
    fetchGestionnaire
}

export default exportedFetchs
