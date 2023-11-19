const fetchCv = async (token, cv, setCv) => {
    try {
        const savedMatricule = localStorage.getItem("loggedInUserMatricule");
        console.log(savedMatricule)
        fetch(
            `http://localhost:8081/api/v1/student/getCvByMatricule/${savedMatricule}`,
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
                console.log(data)
                setCv(data)
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
    }
}

const fetchSignature = async (token, signature, setSignature) => {
    try {
        const m = localStorage.getItem("loggedInUserMatricule")
        console.log(m)
        fetch(
            `http://localhost:8081/api/v1/stages/signatures/student/get/${m}`,
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
            setSignature(null)
        }).then(
            async (res) => {
                try {
                    console.log(res.status)
                    if (res.ok) {
                        const data = await res.json();
                        setSignature(data);
                        console.log("signature",data)
                    } else {
                        console.log("Failed to fetch data");
                        setSignature(null)
                    }
                } catch (e) {
                    console.log(e)
                    setSignature(null)
                }
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        setSignature(null)
    }
}

const exportedFetchs = {
    fetchSignature,
    fetchCv
}

export default exportedFetchs
