package com.example.tpbackend.utils;

import com.example.tpbackend.DTO.candidature.CandidatureGetDTO;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;

public class CandidatureGetDTOSerializer extends JsonSerializer<CandidatureGetDTO> {
    @Override
    public void serialize(
            CandidatureGetDTO candidatureGetDTO,
            JsonGenerator jsonGenerator,
            SerializerProvider serializerProvider
    ) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("matricule", candidatureGetDTO.getMatricule());
        jsonGenerator.writeStringField("fileName", candidatureGetDTO.getFileName());
        if (candidatureGetDTO.getLettre_motivation() != null) {
            jsonGenerator.writeStringField("lettre_motivation", candidatureGetDTO.getLettre_motivation().getOriginalFilename());
        } else {
            jsonGenerator.writeNullField("lettre_motivation");
        }
        if (candidatureGetDTO.getOffreStageDTO() != null) {
            jsonGenerator.writeObjectField("offreStageDTO", candidatureGetDTO.getOffreStageDTO());
        } else {
            jsonGenerator.writeNullField("offreStageDTO");
        }

        jsonGenerator.writeEndObject();
    }
}
