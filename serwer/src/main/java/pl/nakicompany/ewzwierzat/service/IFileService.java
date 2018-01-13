package pl.nakicompany.ewzwierzat.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IFileService {
    String store(MultipartFile file);

    String store(byte[] file, String fileName);

    Resource loadFile(String filename);
}
