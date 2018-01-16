package pl.nakicompany.ewzwierzat.service;

import pl.nakicompany.ewzwierzat.controller.dto.utworzAdopcje.UtworzAdopcjeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzAdopcje.UtworzAdopcjeResponseDTO;
import pl.nakicompany.ewzwierzat.utils.exception.BrakRekorduException;

public interface IAdopcjaService {
    UtworzAdopcjeResponseDTO utworzAdopcje(UtworzAdopcjeRequestDTO utworzAdopcjeRequestDTO) throws BrakRekorduException;

    void usunAdopcje(Long id) throws BrakRekorduException;
}
