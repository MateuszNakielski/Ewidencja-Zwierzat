package pl.nakicompany.ewzwierzat.controller.dto.common;

import lombok.Data;

@Data
public class AdopcjaDTO {
    private Long id;
    private AdopcjaDTO adopcjaDTO;
    private ZwierzeDTO zwierzeDTO;
}
