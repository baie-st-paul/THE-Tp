package com.example.tpbackend.service;

import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireDTO;
import com.example.tpbackend.models.utilisateur.Gestionnaire;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import com.example.tpbackend.repository.utilisateur.GestionnaireRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class GestionnaireServiceTest {

    @InjectMocks
    private GestionnaireService gestionnaireService;

    @Mock
    private GestionnaireRepository gestionnaireRepository;

    @Mock
    private UtilisateurRepository userRepository;

    @Test
    public void testCreateGestionnaire() {
        GestionnaireDTO dto = new GestionnaireDTO(
                "Bob",
                "Lamber",
                "2222222",
                "15143452945",
                "gestionnaire@gmail.com",
                "Mdp22838!"
        );


        GestionnaireDTO result = gestionnaireService.saveGestionnaire(dto);

        assertEquals(dto.getMatricule(), result.getMatricule());
        assertThat(result).isEqualTo(dto);
        verify(gestionnaireRepository, Mockito.times(1)).save(any(Gestionnaire.class));
        verify(userRepository, Mockito.times(1)).save(any(Utilisateur.class));
    }

    @Test
    public void testGetAllGestionnaires() {
        List<Gestionnaire> gestionnaires = Arrays.asList(new Gestionnaire(), new Gestionnaire());
        when(gestionnaireRepository.findAll()).thenReturn(gestionnaires);

        List<Gestionnaire> result = gestionnaireRepository.findAll();

        assertEquals(2, result.size()); //un 2e est ajouté dans le main
    }

    @Test
    void testGetGestionnaireByMatricule() {
        Gestionnaire gestionnaire = new Gestionnaire();
        gestionnaire.setMatricule("222111");
        gestionnaire.setUtilisateur(new Utilisateur("gestionnaire@yahoo.com", "12345", "Gestionnaire"));
        when(gestionnaireRepository.findById(anyInt())).thenReturn(Optional.of(gestionnaire));


        final GestionnaireDTO gestionnaireDto = GestionnaireDTO.fromGestionnaire(gestionnaireRepository.findById(222111).get());

        assertThat(gestionnaireDto.getMatricule()).isEqualTo("222111");
    }

    @Test
    public void testGetGestionnaireByEmail() {
        when(userRepository.existsByEmail(any())).thenReturn(true);
        assertTrue(gestionnaireService.existsByEmail("gestionnaire@yahoo.com"));
        verify(userRepository).existsByEmail(any());
    }
}
