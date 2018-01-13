package pl.nakicompany.ewzwierzat.controller.dto.utworzZwierze;

import lombok.Data;
import pl.nakicompany.ewzwierzat.controller.dto.common.PlikDTO;
import pl.nakicompany.ewzwierzat.controller.dto.common.ZwierzeDTO;

import javax.xml.bind.annotation.XmlType;

@Data
public class UtworzZwierzeRequestDTO {
    private PlikDTO zwierzeFoto;
    private ZwierzeDTO zwierze;
}
