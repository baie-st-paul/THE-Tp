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
            setCv(null)
        }).then(
            async (res) => {
                try {
                    console.log(res.status)
                    if (res.ok) {
                        const data = await res.json();
                        setCv(data);
                        console.log("cv",data)
                    } else {
                        console.log("Failed to fetch data");
                        setCv(null)
                    }
                } catch (e) {
                    console.log(e)
                    setCv(null)
                }
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        setCv(null)
    }
}

const fetchSignature = async (token, matricule, signature, setSignature) => {
    try {
        fetch(
            `http://localhost:8081/api/v1/stages/signatures/student/get/${matricule}`,
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

const fetchStudent = async (token, student, setStudent) => {
    try {
        fetch(
            'http://localhost:8081/api/v1/student/getstudent',
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
            setStudent(null)
        }).then(
            async (res) => {
                try {
                    console.log(res.status)
                    if (res.ok) {
                        const data = await res.json();
                        setStudent(data);
                        console.log("student",data)
                    } else {
                        console.log("Failed to fetch data");
                        setStudent(null)
                    }
                } catch (e) {
                    console.log(e)
                    setStudent(null)
                }
            })
    } catch (error) {
        console.log('Une erreur est survenue:', error);
        setStudent(null)
    }
}

const exportedFetchs = {
    fetchSignature,
    fetchCv,
    fetchStudent
}

export default exportedFetchs
