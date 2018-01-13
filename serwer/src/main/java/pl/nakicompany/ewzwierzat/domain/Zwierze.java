package pl.nakicompany.ewzwierzat.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Zwierze {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="gatunek")
    private String gatunek;

    @Column(name="rodzaj")
    private String rodzaj;

    @Column(name="imie")
    private String imie;

    @Column(name="wiek")
    private int wiek;

    @Column

}
