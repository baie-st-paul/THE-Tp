package com.example.tpbackend.service;

import io.jsonwebtoken.*;
import javax.xml.bind.DatatypeConverter;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Properties;

@Service
public class LoginService {

    private static final Properties prop = new Properties();

    private static String getPropertie() {
        if (prop.isEmpty()) {
            try {
                File initialFile = new File("Tp-Backend/src/main/resources/application.properties");
                InputStream inputStream = new FileInputStream(initialFile);
                prop.load(inputStream);
                inputStream.close();
            } catch (Exception e) {
                e.printStackTrace(System.out);
            }
        }

        if (prop.isEmpty()) {
            return "";
        } else {
            return prop.getProperty("PhraseSecrete", "");
        }
    }
    private static String getSecretKey() {
        String phraseSecrete = getPropertie();
        SecretKey secretKey = new SecretKeySpec(phraseSecrete.getBytes(), "AES");
        return Base64.getUrlEncoder().encodeToString(secretKey.getEncoded());
    }

    public static String genereJWT(String email) {

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // expiration dans 2 heures
        long expMillis = nowMillis + (2L * 60L * 60L * 1000L);
        Date exp = new Date(expMillis);

        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(getSecretKey());
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        JwtBuilder builder = Jwts.builder()
                .setId(email)
                .setIssuedAt(now)
                .setExpiration(exp)
                .claim("email", email)
                .signWith(signatureAlgorithm, signingKey);


        return builder.compact();
    }

    public static Claims decodeJWT(String jwt) {

        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(getSecretKey()))
                .parseClaimsJws(jwt).getBody();
    }
}
