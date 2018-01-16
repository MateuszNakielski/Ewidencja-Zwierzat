package pl.nakicompany.ewzwierzat.service;

import pl.nakicompany.ewzwierzat.controller.dto.edytujAdopcje.EdytujAdopcjeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.edytujAdopcje.EdytujAdopcjeResponseDTO;
import pl.nakicompany.ewzwierzat.controller.dto.pobierzAdopcje.PobierzAdopcjeResponseDTO;
import pl.nakicompany.ewzwierzat.controller.dto.pobierzAdopcjePoID.PobierzAdopcjePoIdResponseDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzAdopcje.UtworzAdopcjeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzAdopcje.UtworzAdopcjeResponseDTO;
import pl.nakicompany.ewzwierzat.utils.exception.BrakRekorduException;

public interface IAdopcjaService {
    UtworzAdopcjeResponseDTO utworzAdopcje(UtworzAdopcjeRequestDTO utworzAdopcjeRequestDTO) throws BrakRekorduException;

    void usunAdopcje(Long id) throws BrakRekorduException;

    PobierzAdopcjeResponseDTO pobierzAdopcje();

    PobierzAdopcjePoIdResponseDTO pobierzAdopcje(Long id) throws BrakRekorduException;

    EdytujAdopcjeResponseDTO edytujAdopcje(Long id, EdytujAdopcjeRequestDTO edytujAdopcjeRequestDTO) throws BrakRekorduException;
}
