package com.example.tpbackend.service.creationBEBD;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.service.utilisateur.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class CvBD implements CommandLineRunner {

    @Autowired
    private StudentServices studentServices;

    @Override
    public void run(String... args) throws Exception {

        byte[] sampleContent = "This is some sample content for the file.".getBytes();

        // Create custom MultipartFile objects
        MultipartFile file1 = createMultipartFile("example1.pdf", sampleContent, "application/pdf");
        MultipartFile file2 = createMultipartFile("example2.pdf", sampleContent, "application/pdf");
        MultipartFile file3 = createMultipartFile("example3.pdf", sampleContent, "application/pdf");

        // Create CvDTO objects
        CvDTO cvDTO1 = new CvDTO();
        cvDTO1.setMatricule("1234567");
        cvDTO1.setFileName("example1.pdf");
        cvDTO1.setStatus("In_review"); // or any other status
        cvDTO1.setFile_cv(file1);

        CvDTO cvDTO2 = new CvDTO();
        cvDTO2.setMatricule("7654321");
        cvDTO2.setFileName("example2.pdf");
        cvDTO2.setStatus("In_review"); // or any other status
        cvDTO2.setFile_cv(file2);

        CvDTO cvDTO3 = new CvDTO();
        cvDTO3.setMatricule("1111111");
        cvDTO3.setFileName("example3.pdf");
        cvDTO3.setStatus("In_review"); // or any other status
        cvDTO3.setFile_cv(file3);
        // Save CvDTO objects with custom MultipartFile
        studentServices.saveCv(cvDTO1);
        studentServices.saveCv(cvDTO2);
        studentServices.saveCv(cvDTO3);
    }

    private MultipartFile createMultipartFile(String fileName, byte[] content, String contentType) throws IOException {
        return new CustomMultipartFile(content, fileName, contentType);
    }

    private static class CustomMultipartFile implements MultipartFile {
        private final byte[] content;
        private final String fileName;
        private final String contentType;

        public CustomMultipartFile(byte[] content, String fileName, String contentType) {
            this.content = content;
            this.fileName = fileName;
            this.contentType = contentType;
        }

        @Override
        public String getName() {
            return fileName;
        }

        @Override
        public String getOriginalFilename() {
            return fileName;
        }

        @Override
        public String getContentType() {
            return contentType;
        }

        @Override
        public boolean isEmpty() {
            return content.length == 0;
        }

        @Override
        public long getSize() {
            return content.length;
        }

        @Override
        public byte[] getBytes() throws IOException {
            return content;
        }

        @Override
        public InputStream getInputStream() throws IOException {
            return new ByteArrayInputStream(content);
        }

        @Override
        public void transferTo(java.io.File dest) throws IOException, IllegalStateException {
            throw new UnsupportedOperationException("Not implemented");
        }
    }
}
