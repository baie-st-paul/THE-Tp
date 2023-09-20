package com.example.tpbackend.service.utilisateur;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {UserService.class})
@ExtendWith(SpringExtension.class)
class UserServiceTest {
    @Autowired
    private UserService userService;

    @MockBean
    private UtilisateurRepository utilisateurRepository;

    /**
     * Method under test: {@link UserService#findByEmail(String)}
     */
    @Test
    void testFindByEmail() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);
        when(utilisateurRepository.findByEmail(Mockito.<String>any())).thenReturn(utilisateur);
        assertSame(utilisateur, userService.findByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).findByEmail(Mockito.<String>any());
    }

    /**
     * Method under test: {@link UserService#existsByEmail(String)}
     */
    @Test
    void testExistsByEmail() {
        when(utilisateurRepository.existsByEmail(Mockito.<String>any())).thenReturn(true);
        assertTrue(userService.existsByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).existsByEmail(Mockito.<String>any());
    }

    /**
     * Method under test: {@link UserService#existsByEmail(String)}
     */
    @Test
    void testExistsByEmail2() {
        when(utilisateurRepository.existsByEmail(Mockito.<String>any())).thenReturn(false);
        assertFalse(userService.existsByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).existsByEmail(Mockito.<String>any());
    }

    /**
     * Method under test: {@link UserService#validAuthentification(String, String)}
     */
    @Test
    void testValidAuthentification() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);
        when(utilisateurRepository.findByEmail(Mockito.<String>any())).thenReturn(utilisateur);
        assertTrue(userService.validAuthentification("jane.doe@example.org", "iloveyou"));
        verify(utilisateurRepository).findByEmail(Mockito.<String>any());
    }

    /**
     * Method under test: {@link UserService#validAuthentification(String, String)}
     */
    @Test
    void testValidAuthentification2() {
        Utilisateur utilisateur = mock(Utilisateur.class);
        when(utilisateur.getPassword()).thenReturn("foo");
        doNothing().when(utilisateur).setEmail(Mockito.<String>any());
        doNothing().when(utilisateur).setId(anyLong());
        doNothing().when(utilisateur).setPassword(Mockito.<String>any());
        doNothing().when(utilisateur).setRole(Mockito.<Utilisateur.Role>any());
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);
        when(utilisateurRepository.findByEmail(Mockito.<String>any())).thenReturn(utilisateur);
        assertFalse(userService.validAuthentification("jane.doe@example.org", "iloveyou"));
        verify(utilisateurRepository).findByEmail(Mockito.<String>any());
        verify(utilisateur).getPassword();
        verify(utilisateur).setEmail(Mockito.<String>any());
        verify(utilisateur).setId(anyLong());
        verify(utilisateur).setPassword(Mockito.<String>any());
        verify(utilisateur).setRole(Mockito.<Utilisateur.Role>any());
    }


}

