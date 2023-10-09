package com.example.tpbackend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import com.example.tpbackend.DTO.EntrevueDTO;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.EntrevueRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;

import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.service.EntrevueService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
class EntrevueTest {

    @Mock
    private EntrevueRepository entrevueRepository;

    @Mock
    private EmployerRepository employerRepository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @InjectMocks
    private EntrevueService entrevueService;

    @Test
    void testCreateEntrevue() throws Exception {
        Employer employer = new Employer();
        employerRepository.save(employer);
        Optional<Employer> employerOptional = Optional.of(employer);

        Student student = new Student();
        studentRepository.save(student);
        Optional<Student> studentOptional = Optional.of(student);


        when(employerRepository.findById(1)).thenReturn(employerOptional);
        when(studentRepository.findById(1)).thenReturn(studentOptional);

        EntrevueDTO entrevueDTO = new EntrevueDTO();
        entrevueDTO.setIdEmployeur("1");
        entrevueDTO.setIdEtudiant("1");
        entrevueDTO.setDate(String.valueOf(LocalDate.now()));
        entrevueDTO.setDescription("Interview description");

        Entrevue entrevue = new Entrevue(entrevueDTO.getDate(), employer, student, entrevueDTO.getDescription());
        when(entrevueRepository.save(entrevue)).thenReturn(entrevue);

        EntrevueDTO result = entrevueService.createEntrevue(entrevueDTO);
        assertEquals(entrevueDTO.getDate(), result.getDate());
        assertEquals(entrevueDTO.getDescription(), result.getDescription());
    }

    @Test
    void testCreateEntrevueInvalidInterview() {
        EntrevueDTO entrevueDTO = new EntrevueDTO();
        entrevueDTO.setIdEmployeur("1");
        entrevueDTO.setIdEtudiant("1");
        entrevueDTO.setDate(String.valueOf(LocalDate.now()));
        entrevueDTO.setDescription("Interview description");

        Optional<Employer> employerOptional = Optional.empty();
        when(employerRepository.findById(1)).thenReturn(employerOptional);

        Optional<Student> studentOptional = Optional.empty();
        when(studentRepository.findById(1)).thenReturn(studentOptional);

        assertThrows(Exception.class, () -> entrevueService.createEntrevue(entrevueDTO));
    }

    @Test
    void testUpdateStatus() {
        EntrevueDTO entrevueDTO = new EntrevueDTO();
        entrevueDTO.setIdEmployeur("1");
        entrevueDTO.setIdEtudiant("1");
        entrevueDTO.setDate(String.valueOf(LocalDate.now()));

        Employer employer = new Employer();
        employer.setId(44);

        Student student = new Student();
        student.setMatricule("2221111");

        Entrevue entrevue = new Entrevue(entrevueDTO.getDate(), employer, student, "Interview description");
        when(entrevueRepository.findByStudent_MatriculeAndEmployer_IdAndDate("1", 1L, entrevueDTO.getDate())).thenReturn(entrevue);

        String newStatus = "Vue";
        entrevueDTO.setStatus(newStatus);
        when(entrevueRepository.save(entrevue)).thenReturn(entrevue);

        EntrevueDTO result = entrevueService.updateStatus(entrevueDTO, newStatus);
        assertEquals(newStatus, result.getStatus());
    }
}