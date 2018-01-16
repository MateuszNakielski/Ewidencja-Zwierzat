package pl.nakicompany.ewzwierzat.controller.dto.utworzAdopcje;

import lombok.Data;
import pl.nakicompany.ewzwierzat.controller.dto.common.OsobaAdoptujacaDTO;
import pl.nakicompany.ewzwierzat.controller.dto.common.ZwierzeDTO;

@Data
public class UtworzAdopcjeRequestDTO {
    private ZwierzeDTO zwierzeDTO;
    private OsobaAdoptujacaDTO osobaAdoptujacaDTO;
}
