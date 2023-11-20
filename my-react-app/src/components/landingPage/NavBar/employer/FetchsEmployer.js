const fetchSignature = async (token, employerId, signature, setSignature) => {
    try {
        console.log(employerId)
        fetch(
            `http://localhost:8081/api/v1/stages/signatures/employer/get/${employerId}`,
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

const ajoutOffre = async (navigate, offre) => {
    let employerId = localStorage.getItem('employer_id')
    const token = localStorage.getItem('token');
    try {
        offre["status"] = "In_review"
        offre["statusVuPasVuG"] = "pasVu"
        offre["statusVuPasVuS"] = "pasVu"
        offre["employerId"] = employerId

        console.log(JSON.stringify(offre))
        console.log(token)

        fetch(
            'http://localhost:8081/api/v1/stages/offres/create',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
                body: JSON.stringify(offre)
            }
        ).catch((err) => {
            console.log(err)
        }).then(
            (res) => {
                const data= res.json()
                try{
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }

                navigate("/offres")
                console.log(data)
            }
        )
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        console.log(offre)
    }
}

const exportedFetchs = {
    fetchSignature,
    ajoutOffre
}

export default exportedFetchs