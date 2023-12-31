export const testList1Acceptes = [
    {
        id: 1,
        student :{
            firstName : 'lina',
            lastName : 'Moskalenko',
            matricule: '2304032',
            email : 'email@test.com',
            phoneNumber : '514-451-1451',
            lettreMotivation : '',
            fileName : '',
            cvStudent : {
                cv : 'cv',
            }
        },
        employer: {
            companyName: 'dell'
        },
        offreStage : {
            titre: 'dev mobile'
        },
        status: 'Accepted'
    }
]

export const testListAcceptes = [{
    id: 2,
    student: {
        firstName: 'danil',
        lastName: 'Moskalenko',
        matricule: '2304032',
        email: 'email@test.com',
        phoneNumber: '514-451-1451',
        lettreMotivation: 'lettreMotiv',
        fileName: '',
        cvStudent: {
            file_cv: 'abc',
            cv: 'cv',
        }
    },
    employer: {
        companyName: 'dell'
    },
    offreStage : {
        titre: 'dev mobile'
    },
    status: 'Accepted'
}]

export const testList2Acceptes = [
    {
        id: 3,
        student : {
            firstName : 'flo',
            lastName : 'Moskalenko',
            matricule: '2304032',
            email : 'email@test.com',
            phoneNumber : '514-451-1451',
            lettreMotivation : 'lettreMotiv',
            fileName : 'abcd.pdf',
            cvStudent : {
                fileName : 'abccc.pdf',
                file_cv : null,
                cv : 'cv',
            }
        },
        employer: {
            companyName: 'dell'
        },
        offreStage : {
            titre: 'dev mobile'
        },
        status: 'Accepted'
    }
]

export const testListContrats = [
    {
        id: 1,
        statusVuPasVuE: "pasVu",
        statusVuPasVuG: "vu",
        statusVuPasVuS: "vu",
        statutEmployeur: "Pas_Signer",
        statutEtudiant: "Pas_Signer",
        statutGestionnaire: "Pas_Signer",

        candidatureDTO: {
            id: 1,
            student :{
                firstName : 'lina',
                lastName : 'Moskalenko',
                matricule: '2304032',
                email : 'email@test.com',
                phoneNumber : '514-451-1451',
                lettreMotivation : '',
                fileName : '',
                cvStudent : {
                    cv : 'cv',
                }
            },
            employer: {
                companyName: 'dell'
            },
            offreStage : {
                titre: 'dev mobile'
            },
            status: 'Accepted'
        },
    },
    {
        id: 2,
        statusVuPasVuE: "pasVu",
        statusVuPasVuG: "vu",
        statusVuPasVuS: "vu",
        statutEmployeur: "Pas_Signer",
        statutEtudiant: "Pas_Signer",
        statutGestionnaire: "Pas_Signer",

        candidatureDTO: {
            id: 2,
            student: {
                firstName: 'danil',
                lastName: 'Moskalenko',
                matricule: '2304032',
                email: 'email@test.com',
                phoneNumber: '514-451-1451',
                lettreMotivation: 'lettreMotiv',
                fileName: '',
                cvStudent: {
                    file_cv: 'abc',
                    cv: 'cv',
                }
            },
            employer: {
                companyName: 'dell'
            },
            offreStage : {
                titre: 'dev mobile'
            },
            status: 'Accepted'
        },
    }
]
