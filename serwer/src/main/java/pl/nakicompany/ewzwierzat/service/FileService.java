package pl.nakicompany.ewzwierzat.service;


import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;

@Service
public class FileService implements IFileService{

    Logger log = LoggerFactory.getLogger(this.getClass().getName());
    private final Path rootLocation = Paths.get("upload-dir");

    @Override
    public String store(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            throw new RuntimeException("FAIL!");
        }

        return "/files/"+file.getOriginalFilename();
    }

    @Override
    public String store(byte[] file, String fileName) {
        try {
            if(Files.exists(this.rootLocation.resolve(fileName))){
                Integer tmp = 0;
                String baseFileName = new String(fileName);
                do{
                    fileName = tmp+baseFileName;
                    tmp++;
                }while(Files.exists(this.rootLocation.resolve(fileName)));
            }
            Files.copy(new ByteArrayInputStream(file), this.rootLocation.resolve(fileName));

        } catch (Exception e) {
            throw new RuntimeException("FAIL!");
        }
        return "/files/"+fileName;
    }
    @Override
    public Resource loadFile(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("FAIL!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("FAIL!");
        }
    }

    @PostConstruct
    public void init() {
        try {
            log.info("Inicjalizacja serwisu plikow");
            if(!Files.isDirectory(rootLocation))
                Files.createDirectory(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}