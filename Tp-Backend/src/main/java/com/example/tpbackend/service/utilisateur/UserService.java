package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UtilisateurRepository utilisateurRepository;

    public UserService(UtilisateurRepository utilisateurRepository){
        this.utilisateurRepository = utilisateurRepository;
    }

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return utilisateurRepository.findByEmail(username);
            }
        };
    }

    public boolean existsByEmail(String email) {
        return utilisateurRepository.existsByEmail(email);
    }

    public boolean validAuthentification(String email, String password) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email);

        if (utilisateur != null) {
            return password.equals(utilisateur.getPassword());
        }
        return false;
    }
}
