package pl.nakicompany.ewzwierzat.domain;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="osoba_adoptujaca")
public class OsobaAdoptujaca {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="imie")
    private String imie;

    @Column(name="nazwisko")
    private String nazwisko;

    @Column(name="email")
    private String email;

    @Column(name="miejscowosc")
    private String miejscowosc;

    @Column(name="numer_telefonu")
    private String numerTelefonu;

    @Column(name="numer_dowodu")
    private String numerDowodu;

    @Column(name="seria_dowodu")
    private String seriaDowodu;

    @Column(name="ulica")
    private String Ulica;

    @Column(name="kod_pocztowy")
    private String kodPocztowy;

    @Column(name="nr_domu")
    private String nrDomu;

    @Column(name="nr_mieszkania")
    private String nrMieszkania;

}
