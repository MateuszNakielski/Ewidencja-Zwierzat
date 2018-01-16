package pl.nakicompany.ewzwierzat.controller.dto.pobierzAdopcje;

import lombok.Data;
import pl.nakicompany.ewzwierzat.controller.dto.common.AdopcjaDTO;

import java.util.List;

@Data
public class PobierzAdopcjeResponseDTO {
    List<AdopcjaDTO> ListaAdopcji;
}
