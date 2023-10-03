package com.example.tpbackend.DTO;

import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.StudentOffer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentOfferDTO {
    private Long id;
    private Student student;
    private OffreStage offreStage;

    public static StudentOfferDTO fromStudentOffer(StudentOffer studentOffer) {
        StudentOfferDTO studentOfferDTO = new StudentOfferDTO();
        studentOfferDTO.setId(studentOffer.getId());
        studentOfferDTO.setStudent(studentOffer.getStudent());
        studentOfferDTO.setOffreStage(studentOffer.getOffre());
        return studentOfferDTO;
    }

    public static StudentOffer toStudentOffer(StudentOfferDTO studentOfferDTO) {
        StudentOffer studentOffer = new StudentOffer();
        studentOffer.setId(studentOfferDTO.getId());
        studentOffer.setStudent(studentOfferDTO.getStudent());
        studentOffer.setOffre(studentOfferDTO.getOffreStage());
        return studentOffer;
    }
}
