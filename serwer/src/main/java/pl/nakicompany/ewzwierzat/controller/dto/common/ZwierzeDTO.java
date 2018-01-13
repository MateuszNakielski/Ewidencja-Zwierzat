package pl.nakicompany.ewzwierzat.controller.dto.common;

import lombok.Data;

@Data
public class ZwierzeDTO {
    private Long id;
    private String gatunek;
    private String rasa;
    private String imie;
    private Integer wiek;
    private String fotoUrl;
    private String opis;
}
