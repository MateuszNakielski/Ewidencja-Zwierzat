package pl.nakicompany.ewzwierzat.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "zwierze")
@Data
public class Zwierze {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="gatunek")
    private String gatunek;

    @Column(name="rodzaj")
    private String rasa;

    @Column(name="imie")
    private String imie;

    @Column(name="wiek")
    private Integer wiek;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="opis")
    private String opis;

    @Column(name="numer_czip")
    private String numerCZIP;

    @Column(name="cechy_szczegolne")
    private String cechySzczegolne;

    @Column(name="adoptowany")
    private Boolean adoptowany = false;
}
