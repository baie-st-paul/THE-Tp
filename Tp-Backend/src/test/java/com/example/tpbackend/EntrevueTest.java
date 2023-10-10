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

import com.example.tpbackend.service.EntrevueService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.Optional;

@SpringBootTest
class EntrevueTest {

    @Mock
    private EntrevueRepository entrevueRepository;

    @Mock
    private EmployerRepository employerRepository;

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private EntrevueService entrevueService;

    @Test
    void testCreateEntrevue() {
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
        entrevueDTO.setDateHeure(String.valueOf(LocalDate.now()));
        entrevueDTO.setDescription("Interview description");

        Entrevue entrevue = new Entrevue(entrevueDTO.getId(), entrevueDTO.getDateHeure(), entrevueDTO.getDescription(), entrevueDTO.getStatus());
        when(entrevueRepository.save(entrevue)).thenReturn(entrevue);

        EntrevueDTO result = entrevueService.createEntrevue(entrevueDTO);
        assertEquals(entrevueDTO.getDateHeure(), result.getDateHeure());
        assertEquals(entrevueDTO.getDescription(), result.getDescription());
    }

    @Test
    void testCreateEntrevueInvalidInterview() {
        EntrevueDTO entrevueDTO = new EntrevueDTO();
        entrevueDTO.setIdEmployeur("1");
        entrevueDTO.setIdEtudiant("1");
        entrevueDTO.setDateHeure(String.valueOf(LocalDate.now()));
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
        entrevueDTO.setDateHeure(String.valueOf(LocalDate.now()));

        Employer employer = new Employer();
        employer.setId(44);

        Student student = new Student();
        student.setMatricule("2221111");

        Entrevue entrevue = new Entrevue(entrevueDTO.getId(), entrevueDTO.getDateHeure(), "Interview description", entrevueDTO.getStatus());
        when(entrevueRepository.findByStudent_MatriculeAndEmployer_IdAndDateHeure("1", 1L, entrevueDTO.getDateHeure())).thenReturn(entrevue);

        String newStatus = "Vue";
        entrevueDTO.setStatus(newStatus);
        when(entrevueRepository.save(entrevue)).thenReturn(entrevue);

        EntrevueDTO result = entrevueService.updateStatus(entrevueDTO, newStatus);
        assertEquals(newStatus, result.getStatus());
    }
}
