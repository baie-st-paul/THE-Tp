package com.example.tpbackend.repository.signature;

import com.example.tpbackend.models.signature.SignatureStudent;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SignatureStudentRepository extends JpaRepository<SignatureStudent, Long> {
    @Transactional
    SignatureStudent findSignatureStudentByStudentMatricule(String matricule);

    @Modifying
    @Transactional
    @Query("DELETE FROM SignatureStudent s WHERE s.student.matricule = ?1")
    void deleteSignatureStudentByStudentMatricule(String matricule);
}
