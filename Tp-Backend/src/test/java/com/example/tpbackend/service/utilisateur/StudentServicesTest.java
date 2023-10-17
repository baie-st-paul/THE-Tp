package com.example.tpbackend.service.utilisateur;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.anyLong;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.candidature.CandidatureGetDTO;
import com.example.tpbackend.DTO.candidature.CandidaturePostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.Candidature;
import com.example.tpbackend.models.Cv;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.CandidatureRepository;
import com.example.tpbackend.repository.CvRepository;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.utils.ByteArrayMultipartFile;

import java.io.IOException;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.multipart.MultipartFile;

@ContextConfiguration(classes = {StudentServices.class})
@ExtendWith(SpringExtension.class)
class StudentServicesTest {
    @MockBean
    private CandidatureRepository candidatureRepository;

    @MockBean
    private CvRepository cvRepository;

    @MockBean
    private OffreStageRepository offreStageRepository;

    @MockBean
    private StudentRepository studentRepository;

    @Autowired
    private StudentServices studentServices;

    /**
     * Method under test: {@link StudentServices#saveCv(CvDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testSaveCv() throws IOException {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.NullPointerException: Cannot invoke "org.springframework.web.multipart.MultipartFile.isEmpty()" because "multipartFile" is null
        //       at com.example.tpbackend.DTO.CvDTO.convertMultipartFileToByteArray(CvDTO.java:37)
        //       at com.example.tpbackend.DTO.CvDTO.toCv(CvDTO.java:31)
        //       at com.example.tpbackend.service.utilisateur.StudentServices.saveCv(StudentServices.java:55)
        //   See https://diff.blue/R013 to resolve this issue.

        studentServices.saveCv(new CvDTO());
    }

    /**
     * Method under test: {@link StudentServices#saveCv(CvDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testSaveCv2() throws IOException {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.IllegalArgumentException: No enum constant com.example.tpbackend.models.Cv.StatusCV.Status
        //       at java.lang.Enum.valueOf(Enum.java:273)
        //       at com.example.tpbackend.models.Cv$StatusCV.valueOf(Cv.java:52)
        //       at com.example.tpbackend.models.Cv.<init>(Cv.java:34)
        //       at com.example.tpbackend.DTO.CvDTO.toCv(CvDTO.java:31)
        //       at com.example.tpbackend.service.utilisateur.StudentServices.saveCv(StudentServices.java:55)
        //   See https://diff.blue/R013 to resolve this issue.

        studentServices.saveCv(new CvDTO("Matricule", "foo.txt",
                new ByteArrayMultipartFile("Name", "foo.txt", "text/plain", "AXAXAXAX".getBytes("UTF-8")), "Status"));
    }

    /**
     * Method under test: {@link StudentServices#saveCv(CvDTO)}
     */
    @Test
    void testSaveCv3() throws IOException {
        Cv cv = new Cv();
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.StatusCV.Accepted);
        when(cvRepository.save(Mockito.<Cv>any())).thenReturn(cv);

        Cv cv2 = new Cv();
        cv2.setFileName("foo.txt");
        cv2.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cv2.setId(1L);
        cv2.setMatricule("Matricule");
        cv2.setStatus(Cv.StatusCV.Accepted);
        CvDTO cvDTO = mock(CvDTO.class);
        when(cvDTO.toCv()).thenReturn(cv2);
        studentServices.saveCv(cvDTO);
        verify(cvRepository).save(Mockito.<Cv>any());
        verify(cvDTO).toCv();
    }

    /**
     * Method under test: {@link StudentServices#updateCv(CvDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testUpdateCv() throws IOException {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.NullPointerException: Cannot invoke "org.springframework.web.multipart.MultipartFile.isEmpty()" because "multipartFile" is null
        //       at com.example.tpbackend.DTO.CvDTO.convertMultipartFileToByteArray(CvDTO.java:37)
        //       at com.example.tpbackend.DTO.CvDTO.toCv(CvDTO.java:31)
        //       at com.example.tpbackend.service.utilisateur.StudentServices.updateCv(StudentServices.java:59)
        //   See https://diff.blue/R013 to resolve this issue.

        studentServices.updateCv(new CvDTO());
    }

    /**
     * Method under test: {@link StudentServices#updateCv(CvDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testUpdateCv2() throws IOException {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.IllegalArgumentException: No enum constant com.example.tpbackend.models.Cv.StatusCV.Status
        //       at java.lang.Enum.valueOf(Enum.java:273)
        //       at com.example.tpbackend.models.Cv$StatusCV.valueOf(Cv.java:52)
        //       at com.example.tpbackend.models.Cv.<init>(Cv.java:34)
        //       at com.example.tpbackend.DTO.CvDTO.toCv(CvDTO.java:31)
        //       at com.example.tpbackend.service.utilisateur.StudentServices.updateCv(StudentServices.java:59)
        //   See https://diff.blue/R013 to resolve this issue.

        studentServices.updateCv(new CvDTO("Matricule", "foo.txt",
                new ByteArrayMultipartFile("Name", "foo.txt", "text/plain", "AXAXAXAX".getBytes("UTF-8")), "Status"));
    }

    /**
     * Method under test: {@link StudentServices#updateCv(CvDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testUpdateCv3() throws IOException {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.NullPointerException: Cannot invoke "com.example.tpbackend.DTO.CvDTO.getMatricule()" because "cvDTO" is null
        //       at com.example.tpbackend.service.utilisateur.StudentServices.updateCv(StudentServices.java:59)
        //   See https://diff.blue/R013 to resolve this issue.

        studentServices.updateCv(null);
    }

    /**
     * Method under test: {@link StudentServices#updateCv(CvDTO)}
     */
    @Test
    void testUpdateCv4() throws IOException {
        doNothing().when(cvRepository)
                .updateCvWhenStudentHaveCv(Mockito.<String>any(), Mockito.<String>any(), Mockito.<byte[]>any(),
                        Mockito.<Cv.StatusCV>any());

        Cv cv = new Cv();
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.StatusCV.Accepted);
        CvDTO cvDTO = mock(CvDTO.class);
        when(cvDTO.toCv()).thenReturn(cv);
        when(cvDTO.getFileName()).thenReturn("foo.txt");
        when(cvDTO.getMatricule()).thenReturn("Matricule");
        studentServices.updateCv(cvDTO);
        verify(cvRepository).updateCvWhenStudentHaveCv(Mockito.<String>any(), Mockito.<String>any(),
                Mockito.<byte[]>any(), Mockito.<Cv.StatusCV>any());
        verify(cvDTO, atLeast(1)).toCv();
        verify(cvDTO).getFileName();
        verify(cvDTO).getMatricule();
    }

    /**
     * Method under test: {@link StudentServices#updateCv(CvDTO)}
     */
    @Test
    void testUpdateCv5() throws IOException {
        doNothing().when(cvRepository)
                .updateCvWhenStudentHaveCv(Mockito.<String>any(), Mockito.<String>any(), Mockito.<byte[]>any(),
                        Mockito.<Cv.StatusCV>any());
        Cv cv = mock(Cv.class);
        when(cv.getFile_cv()).thenReturn("AXAXAXAX".getBytes("UTF-8"));
        when(cv.getStatus()).thenReturn(Cv.StatusCV.Accepted);
        doNothing().when(cv).setFileName(Mockito.<String>any());
        doNothing().when(cv).setFile_cv(Mockito.<byte[]>any());
        doNothing().when(cv).setId(anyLong());
        doNothing().when(cv).setMatricule(Mockito.<String>any());
        doNothing().when(cv).setStatus(Mockito.<Cv.StatusCV>any());
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.StatusCV.Accepted);
        CvDTO cvDTO = mock(CvDTO.class);
        when(cvDTO.toCv()).thenReturn(cv);
        when(cvDTO.getFileName()).thenReturn("foo.txt");
        when(cvDTO.getMatricule()).thenReturn("Matricule");
        studentServices.updateCv(cvDTO);
        verify(cvRepository).updateCvWhenStudentHaveCv(Mockito.<String>any(), Mockito.<String>any(),
                Mockito.<byte[]>any(), Mockito.<Cv.StatusCV>any());
        verify(cvDTO, atLeast(1)).toCv();
        verify(cvDTO).getFileName();
        verify(cvDTO).getMatricule();
        verify(cv).getFile_cv();
        verify(cv).getStatus();
        verify(cv).setFileName(Mockito.<String>any());
        verify(cv).setFile_cv(Mockito.<byte[]>any());
        verify(cv).setId(anyLong());
        verify(cv).setMatricule(Mockito.<String>any());
        verify(cv).setStatus(Mockito.<Cv.StatusCV>any());
    }
    /**
     * Method under test: {@link StudentServices#getStudentByMatricule(String)}
     */
    @Test
    void testGetStudentByMatricule() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Student student = new Student();
        student.setMatricule("Matricule");
        student.setProgram("Program");
        student.setUtilisateur(utilisateur);
        when(studentRepository.findByMatricule(Mockito.<String>any())).thenReturn(student);
        StudentGetDTO actualStudentByMatricule = studentServices.getStudentByMatricule("Matricule");
        assertEquals("Program", actualStudentByMatricule.getProgram());
        assertEquals("Jane", actualStudentByMatricule.getFirstName());
        assertEquals("Matricule", actualStudentByMatricule.getMatricule());
        assertEquals("6625550144", actualStudentByMatricule.getPhoneNumber());
        assertEquals("Doe", actualStudentByMatricule.getLastName());
        verify(studentRepository).findByMatricule(Mockito.<String>any());
    }

    /**
     * Method under test: {@link StudentServices#getStudentByMatricule(String)}
     */
    @Test
    void testGetStudentByMatricule2() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Student student = mock(Student.class);
        when(student.getMatricule()).thenReturn("Matricule");
        when(student.getProgram()).thenReturn("Program");
        doNothing().when(student).setMatricule(Mockito.<String>any());
        doNothing().when(student).setProgram(Mockito.<String>any());
        doNothing().when(student).setUtilisateur(Mockito.<Utilisateur>any());
        student.setMatricule("Matricule");
        student.setProgram("Program");
        student.setUtilisateur(utilisateur);
        when(studentRepository.findByMatricule(Mockito.<String>any())).thenReturn(student);
        StudentGetDTO actualStudentByMatricule = studentServices.getStudentByMatricule("Matricule");
        assertEquals("Program", actualStudentByMatricule.getProgram());
        assertEquals("Jane", actualStudentByMatricule.getFirstName());
        assertEquals("Matricule", actualStudentByMatricule.getMatricule());
        assertEquals("6625550144", actualStudentByMatricule.getPhoneNumber());
        assertEquals("Doe", actualStudentByMatricule.getLastName());
        verify(studentRepository).findByMatricule(Mockito.<String>any());
        verify(student).getMatricule();
        verify(student).getProgram();
        verify(student).setMatricule(Mockito.<String>any());
        verify(student).setProgram(Mockito.<String>any());
        verify(student).setUtilisateur(Mockito.<Utilisateur>any());
    }

    /**
     * Method under test: {@link StudentServices#postulerOffre(CandidaturePostDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testPostulerOffre() throws IOException {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.NullPointerException: Cannot invoke "org.springframework.web.multipart.MultipartFile.isEmpty()" because "multipartFile" is null
        //       at com.example.tpbackend.DTO.CvDTO.convertMultipartFileToByteArray(CvDTO.java:37)
        //       at com.example.tpbackend.service.utilisateur.StudentServices.postulerOffre(StudentServices.java:81)
        //   See https://diff.blue/R013 to resolve this issue.

        Cv cv = new Cv();
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.StatusCV.Accepted);
        when(cvRepository.findCvByMatricule(Mockito.<String>any())).thenReturn(cv);

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
        employer.setUtilisateur(utilisateur);

        OffreStage offreStage = new OffreStage();
        offreStage.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage.setDescription("The characteristics of someone or something");
        offreStage.setEmployer(employer);
        offreStage.setId(1L);
        offreStage.setSalaire(10.0d);
        offreStage.setStatus(OffreStage.Status.Accepted);
        offreStage.setStudentProgram("Student Program");
        offreStage.setTitre("Titre");
        Optional<OffreStage> ofResult = Optional.of(offreStage);
        when(offreStageRepository.findOffreById(Mockito.<Long>any())).thenReturn(ofResult);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setRole(Utilisateur.Role.Student);
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setFirstName("Jane");
        utilisateur2.setLastName("Doe");
        utilisateur2.setPhoneNumber("6625550144");

        Student student = new Student();
        student.setMatricule("Matricule");
        student.setProgram("Program");
        student.setUtilisateur(utilisateur2);
        when(studentRepository.findByMatricule(Mockito.<String>any())).thenReturn(student);
        studentServices.postulerOffre(new CandidaturePostDTO());
    }

    /**
     * Method under test: {@link StudentServices#postulerOffre(CandidaturePostDTO)}
     */
    @Test
    void testPostulerOffre2() throws IOException {
        Cv cvStudent = new Cv();
        cvStudent.setFileName("foo.txt");
        cvStudent.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cvStudent.setId(1L);
        cvStudent.setMatricule("Matricule");
        cvStudent.setStatus(Cv.StatusCV.Accepted);

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");


        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
        employer.setUtilisateur(utilisateur);

        OffreStage offreStage = new OffreStage();
        offreStage.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage.setDescription("The characteristics of someone or something");
        offreStage.setEmployer(employer);
        offreStage.setId(1L);
        offreStage.setSalaire(10.0d);
        offreStage.setStatus(OffreStage.Status.Accepted);
        offreStage.setStudentProgram("Student Program");
        offreStage.setTitre("Titre");

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setRole(Utilisateur.Role.Student);
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setFirstName("Jane");
        utilisateur2.setLastName("Doe");
        utilisateur2.setPhoneNumber("6625550144");

        Student student = new Student();
        student.setMatricule("Matricule");
        student.setProgram("Program");
        student.setUtilisateur(utilisateur2);

        Candidature candidature = new Candidature();
        candidature.setCvStudent(cvStudent);
        candidature.setFileName("foo.txt");
        candidature.setId(1L);
        candidature.setLettre_motivation("AXAXAXAX".getBytes("UTF-8"));
        candidature.setOffreStage(offreStage);
        candidature.setStudent(student);
        when(candidatureRepository.save(Mockito.<Candidature>any())).thenReturn(candidature);

        Cv cv = new Cv();
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.StatusCV.Accepted);
        when(cvRepository.findCvByMatricule(Mockito.<String>any())).thenReturn(cv);

        Utilisateur utilisateur3 = new Utilisateur();
        utilisateur3.setEmail("jane.doe@example.org");
        utilisateur3.setId(1L);
        utilisateur3.setFirstName("Jane");
        utilisateur3.setPassword("iloveyou");
        utilisateur3.setLastName("Doe");
        utilisateur3.setRole(Utilisateur.Role.Student);
        utilisateur3.setPhoneNumber("6625550144");

        Employer employer2 = new Employer();
        employer2.setCompanyName("Company Name");
        employer2.setId(1L);
        employer2.setOffresStages(new ArrayList<>());
        employer2.setUtilisateur(utilisateur3);

        OffreStage offreStage2 = new OffreStage();
        offreStage2.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage2.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage2.setDescription("The characteristics of someone or something");
        offreStage2.setEmployer(employer2);
        offreStage2.setId(1L);
        offreStage2.setSalaire(10.0d);
        offreStage2.setStatus(OffreStage.Status.Accepted);
        offreStage2.setStudentProgram("Student Program");
        offreStage2.setTitre("Titre");
        Optional<OffreStage> ofResult = Optional.of(offreStage2);
        when(offreStageRepository.findOffreById(Mockito.<Long>any())).thenReturn(ofResult);

        Utilisateur utilisateur4 = new Utilisateur();
        utilisateur4.setEmail("jane.doe@example.org");
        utilisateur4.setId(1L);
        utilisateur4.setFirstName("Jane");
        utilisateur4.setLastName("Doe");
        utilisateur4.setPassword("iloveyou");
        utilisateur4.setPhoneNumber("6625550144");
        utilisateur4.setRole(Utilisateur.Role.Student);

        Student student2 = new Student();
        student2.setMatricule("Matricule");
        student2.setProgram("Program");
        student2.setUtilisateur(utilisateur4);
        when(studentRepository.findByMatricule(Mockito.<String>any())).thenReturn(student2);
        studentServices.postulerOffre(new CandidaturePostDTO("Matricule", 1L, "foo.txt",
                new ByteArrayMultipartFile("Name", "foo.txt", "text/plain", "AXAXAXAX".getBytes("UTF-8"))));
        verify(candidatureRepository).save(Mockito.<Candidature>any());
        verify(cvRepository).findCvByMatricule(Mockito.<String>any());
        verify(offreStageRepository).findOffreById(Mockito.<Long>any());
        verify(studentRepository).findByMatricule(Mockito.<String>any());
    }

    /**
     * Method under test: {@link StudentServices#getMesCandidaturesByMatricule(String)}
     */
    @Test
    void testGetMesCandidaturesByMatricule() {
        when(candidatureRepository.getAllCandidaturesByMatricule(Mockito.<String>any())).thenReturn(new ArrayList<>());
        assertTrue(studentServices.getMesCandidaturesByMatricule("Matricule").isEmpty());
        verify(candidatureRepository).getAllCandidaturesByMatricule(Mockito.<String>any());
    }

    /**
     * Method under test: {@link StudentServices#getMesCandidaturesByMatricule(String)}
     */
    @Test
    void testGetMesCandidaturesByMatricule2() throws UnsupportedEncodingException {
        Cv cvStudent = new Cv();
        cvStudent.setFileName("foo.txt");
        cvStudent.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cvStudent.setId(1L);
        cvStudent.setMatricule("Matricule");
        cvStudent.setStatus(Cv.StatusCV.Accepted);

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
        employer.setUtilisateur(utilisateur);

        OffreStage offreStage = new OffreStage();
        offreStage.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage.setDescription("The characteristics of someone or something");
        offreStage.setEmployer(employer);
        offreStage.setId(1L);
        offreStage.setSalaire(10.0d);
        offreStage.setStatus(OffreStage.Status.Accepted);
        offreStage.setStudentProgram("Student Program");
        offreStage.setTitre("Titre");

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setFirstName("Jane");
        utilisateur2.setLastName("Doe");
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setPhoneNumber("6625550144");
        utilisateur2.setRole(Utilisateur.Role.Student);

        Student student = new Student();
        student.setMatricule("Matricule");
        student.setProgram("Program");
        student.setUtilisateur(utilisateur2);

        Candidature candidature = new Candidature();
        candidature.setCvStudent(cvStudent);
        candidature.setFileName("foo.txt");
        candidature.setId(1L);
        candidature.setLettre_motivation("AXAXAXAX".getBytes("UTF-8"));
        candidature.setOffreStage(offreStage);
        candidature.setStudent(student);

        ArrayList<Candidature> candidatureList = new ArrayList<>();
        candidatureList.add(candidature);
        when(candidatureRepository.getAllCandidaturesByMatricule(Mockito.<String>any())).thenReturn(candidatureList);
        List<CandidatureGetDTO> actualMesCandidaturesByMatricule = studentServices
                .getMesCandidaturesByMatricule("Matricule");
        assertEquals(1, actualMesCandidaturesByMatricule.size());
        CandidatureGetDTO getResult = actualMesCandidaturesByMatricule.get(0);
        assertEquals("foo.txt", getResult.getFileName());
        assertEquals("Matricule", getResult.getMatricule());
        MultipartFile lettre_motivation = getResult.getLettre_motivation();
        assertTrue(lettre_motivation instanceof ByteArrayMultipartFile);
        OffreStageDTO offreStageDTO = getResult.getOffreStageDTO();
        assertEquals("The characteristics of someone or something", offreStageDTO.getDescription());
        assertFalse(lettre_motivation.isEmpty());
        assertEquals("foo.txt", lettre_motivation.getOriginalFilename());
        assertEquals("Student Program", offreStageDTO.getStudentProgram());
        assertEquals("1970-01-01", offreStageDTO.getDateFin().toString());
        assertEquals(10.0d, offreStageDTO.getSalaire());
        assertEquals("foo.txt", lettre_motivation.getName());
        assertEquals("application/pdf", lettre_motivation.getContentType());
        assertEquals("Accepted", offreStageDTO.getStatus());
        assertEquals("Titre", offreStageDTO.getTitre());
        assertEquals("1970-01-01", offreStageDTO.getDateDebut().toString());
        assertEquals(1L, offreStageDTO.getId());
        verify(candidatureRepository).getAllCandidaturesByMatricule(Mockito.<String>any());
    }

    /**
     * Method under test: {@link StudentServices#getMesCandidaturesByMatricule(String)}
     */
    @Test
    void testGetMesCandidaturesByMatricule3() throws UnsupportedEncodingException {
        Cv cvStudent = new Cv();
        cvStudent.setFileName("foo.txt");
        cvStudent.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cvStudent.setId(1L);
        cvStudent.setMatricule("Matricule");
        cvStudent.setStatus(Cv.StatusCV.Accepted);

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Student);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
        employer.setUtilisateur(utilisateur);

        OffreStage offreStage = new OffreStage();
        offreStage.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage.setDescription("The characteristics of someone or something");
        offreStage.setEmployer(employer);
        offreStage.setId(1L);
        offreStage.setSalaire(10.0d);
        offreStage.setStatus(OffreStage.Status.Accepted);
        offreStage.setStudentProgram("Student Program");
        offreStage.setTitre("Titre");

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setFirstName("Jane");
        utilisateur2.setLastName("Doe");
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setPhoneNumber("6625550144");
        utilisateur2.setRole(Utilisateur.Role.Student);

        Student student = new Student();
        student.setMatricule("Matricule");
        student.setProgram("Program");
        student.setUtilisateur(utilisateur2);
        Candidature candidature = mock(Candidature.class);
        when(candidature.toCandidatureGetDTO()).thenReturn(new CandidatureGetDTO());
        doNothing().when(candidature).setCvStudent(Mockito.<Cv>any());
        doNothing().when(candidature).setFileName(Mockito.<String>any());
        doNothing().when(candidature).setId(Mockito.<Long>any());
        doNothing().when(candidature).setLettre_motivation(Mockito.<byte[]>any());
        doNothing().when(candidature).setOffreStage(Mockito.<OffreStage>any());
        doNothing().when(candidature).setStudent(Mockito.<Student>any());
        candidature.setCvStudent(cvStudent);
        candidature.setFileName("foo.txt");
        candidature.setId(1L);
        candidature.setLettre_motivation("AXAXAXAX".getBytes("UTF-8"));
        candidature.setOffreStage(offreStage);
        candidature.setStudent(student);

        ArrayList<Candidature> candidatureList = new ArrayList<>();
        candidatureList.add(candidature);
        when(candidatureRepository.getAllCandidaturesByMatricule(Mockito.<String>any())).thenReturn(candidatureList);
        assertEquals(1, studentServices.getMesCandidaturesByMatricule("Matricule").size());
        verify(candidatureRepository).getAllCandidaturesByMatricule(Mockito.<String>any());
        verify(candidature).toCandidatureGetDTO();
        verify(candidature).setCvStudent(Mockito.<Cv>any());
        verify(candidature).setFileName(Mockito.<String>any());
        verify(candidature).setId(Mockito.<Long>any());
        verify(candidature).setLettre_motivation(Mockito.<byte[]>any());
        verify(candidature).setOffreStage(Mockito.<OffreStage>any());
        verify(candidature).setStudent(Mockito.<Student>any());
    }
}

