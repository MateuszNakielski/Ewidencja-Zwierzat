package pl.nakicompany.ewzwierzat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.nakicompany.ewzwierzat.domain.Zwierze;

public interface ZwierzeRepository extends JpaRepository<Zwierze, Long> {
}
