package pl.nakicompany.ewzwierzat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.nakicompany.ewzwierzat.domain.Adopcja;

public interface AdopcjaRepository extends JpaRepository<Adopcja, Long> {
}
