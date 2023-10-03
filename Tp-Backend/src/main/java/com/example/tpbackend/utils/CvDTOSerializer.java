package com.example.tpbackend.utils;

import com.example.tpbackend.DTO.CvDTO;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

public class CvDTOSerializer extends JsonSerializer<CvDTO> {
    @Override
    public void serialize(CvDTO cvDTO, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("matricule", cvDTO.getMatricule());
        jsonGenerator.writeStringField("fileName", cvDTO.getFileName());

        String file_cvBase64 = convertMultipartFileToBase64(cvDTO.getFile_cv());
        jsonGenerator.writeStringField("file_cv", file_cvBase64);

        jsonGenerator.writeStringField("status", cvDTO.getStatus());
        jsonGenerator.writeEndObject();
    }

    private String convertMultipartFileToBase64(MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            return null;
        }

        byte[] fileBytes = multipartFile.getBytes();
        byte[] base64Bytes = Base64.getEncoder().encode(fileBytes);

        return new String(base64Bytes);
    }
}

