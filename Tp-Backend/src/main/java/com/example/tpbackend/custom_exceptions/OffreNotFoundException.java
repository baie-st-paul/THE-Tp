package com.example.tpbackend.custom_exceptions;

import lombok.Data;

@Data
public class OffreNotFoundException extends RuntimeException {

    private final long offreId;

    public OffreNotFoundException(long offreId) {
        super("Offre avec l'id " + offreId + " introuvable");
        this.offreId = offreId;
    }

}