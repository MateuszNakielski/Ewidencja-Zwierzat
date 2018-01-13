package pl.nakicompany.ewzwierzat.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
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

}
