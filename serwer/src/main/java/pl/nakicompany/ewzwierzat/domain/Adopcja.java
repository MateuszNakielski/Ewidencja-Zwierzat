package pl.nakicompany.ewzwierzat.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="adopcja")
public class Adopcja {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(optional=false, cascade = CascadeType.REMOVE)
    @JoinColumn(name="osoba_adoptujaca_id")
    private OsobaAdoptujaca osobaAdoptujaca;

    @OneToOne(optional=false)
    @JoinColumn(name="zwierze_id")
    private Zwierze zwierze;

}
