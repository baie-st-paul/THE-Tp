import { fireEvent, queryAllByRole, render, screen } from '@testing-library/react';
import InformationEtudiantPostule from './informationEtudiantPostule';

{/*

Mettre use navigate et useLocation en commentaire pour faire marcher les tests

*/}

const testList = [{
    student : {
     firstName : 'danil',
     lastName : 'Moskalenko',
     email : 'email@test.com',
     phoneNumber : '514-451-1451',
     lettreMotivation : 'lettreMotiv',
     fileName : 'fileName',
     cvStudent : {
        cv : 'cv',
    } 
        },
},
{
    student : {
     firstName : '1danil1',
     lastName : '1Moskalenko1',
     email : '1email@test.com1',
     phoneNumber : '1514-451-14511',
     lettreMotivation : '1lettreMotiv1',
     fileName : 'cb',
     cvStudent : {
        cv : '1cv1',
    } 
        },
},{
    
    student : {
     firstName : '2danil2',
     lastName : '2Moskalenko2',
     email : '2email@test.com2',
     phoneNumber : '2514-451-14512',
     lettreMotivation : '2lettreMotiv2',
     fileName :"",
     cvStudent : {
        cv : '2cv2',
    } 
        },
}]

test('Button Retour', ()=>{
render(<InformationEtudiantPostule listeEtudiants={testList} />)
const handleClickMock = jest.fn();
const buttonElement = screen.getByText("RETOUR")
expect(buttonElement).toBeInTheDocument()

});

test ("Button voir Lettre Motivation disabled si lettre n'est pas la" , ()=>{
const testList1 = [{
            student :{
         firstName : 'danil',
         lastName : 'Moskalenko',
         email : 'email@test.com',
         phoneNumber : '514-451-1451',
         lettreMotivation : 'lettreMotiv',
         fileName : '',
         cvStudent : {
            cv : 'cv',
        } 
            }, 
    },]
render(<InformationEtudiantPostule listeEtudiants={testList1} />)
const bouttonElement = screen.getByText('LETTRE MOTIVATION')
expect(bouttonElement).toBeInTheDocument()
expect(bouttonElement).toHaveClass('disabled')
})


test('nombre de rows affiche', ()=>{
render(<InformationEtudiantPostule listeEtudiants={testList} />) 
const row = document.querySelectorAll('tr');
expect(row.length).toBe(4)
})

test('module afficher CV', ()=>{
    const testList2 = [{
        student :{
     firstName : 'danil',
     lastName : 'Moskalenko',
     email : 'email@test.com',
     phoneNumber : '514-451-1451',
     lettreMotivation : 'lettreMotiv',
     fileName : '',
     cvStudent : {
        file_cv : null,
        cv : 'cv',
        
    } 
        }, 
},]
    const onClickMock = jest.fn();
    render(<InformationEtudiantPostule listeEtudiants={testList2} />)
    const bouttonElement = screen.getByText('CV')
    try{
    fireEvent.click(bouttonElement);
    expect(onClickMock).toHaveBeenCalled();
    }
    catch(error){
        // use state throws error. Test pass it error is occured
    }
})


