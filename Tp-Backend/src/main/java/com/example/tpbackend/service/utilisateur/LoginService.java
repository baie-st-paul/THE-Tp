package com.example.tpbackend.service.utilisateur;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.io.InputStream;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Properties;

@Service
public class LoginService {

    private static final Properties prop = new Properties();

    // Cette methode est utilisée pour récupérer la phrase secrete dans le fichier application.properties
    private static String getPropertie() {
        if (prop.isEmpty()) {
            try {
                InputStream inputStream = LoginService.class.getResourceAsStream("/application.properties");
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

    // Cette methode est utilisée pour générer la clé secrete en fonction de la phrase secrete
    private static String getSecretKey() {
        String phraseSecrete = getPropertie();
        // la methode getBytes() retourne un tableau de bytes de la phrase secrete
        SecretKey secretKey = new SecretKeySpec(phraseSecrete.getBytes(), "AES");
        // on encode la clé secrete en base64 pour pouvoir l'utiliser dans le token
        return Base64.getUrlEncoder().encodeToString(secretKey.getEncoded());
    }

    public static String genereJWT(String email) {
        // on utilise l'algorithme HS256 pour générer le token
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        // on récupère la date actuelle et on la convertit en millisecondes
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // expiration dans 2 heures c'est a dire 2*60*60*1000 qui veut dire 2 heures en millisecondes
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
