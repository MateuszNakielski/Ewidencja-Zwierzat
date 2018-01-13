package pl.nakicompany.ewzwierzat.controller.dto.common;

import lombok.Data;

import javax.xml.bind.annotation.XmlType;

@Data
public class PlikDTO {
    private String fileContent;
    private String fileName;
}
