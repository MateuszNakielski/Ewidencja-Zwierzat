package pl.nakicompany.ewzwierzat.controller.dto.pobierzZwierzeta;

import lombok.Data;
import pl.nakicompany.ewzwierzat.controller.dto.common.ZwierzeDTO;

import java.util.List;

@Data
public class PobierzZwierzetaResponseDTO {
    List<ZwierzeDTO> listaZwierzat;
}
