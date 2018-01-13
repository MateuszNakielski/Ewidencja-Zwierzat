package pl.nakicompany.ewzwierzat.controller.dto.edytujZwierze;

import lombok.Data;
import pl.nakicompany.ewzwierzat.controller.dto.common.PlikDTO;
import pl.nakicompany.ewzwierzat.controller.dto.common.ZwierzeDTO;

@Data
public class EdytujZwierzeRequestDTO {
    private PlikDTO zwierzeFoto;
    private ZwierzeDTO zwierze;
}
