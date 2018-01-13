package pl.nakicompany.ewzwierzat.service;

import pl.nakicompany.ewzwierzat.controller.dto.common.ZwierzeDTO;
import pl.nakicompany.ewzwierzat.controller.dto.edytujZwierze.EdytujZwierzeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.edytujZwierze.EdytujZwierzeResponseDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzZwierze.UtworzZwierzeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzZwierze.UtworzZwierzeResponseDTO;
import pl.nakicompany.ewzwierzat.domain.Zwierze;
import pl.nakicompany.ewzwierzat.utils.exception.BrakRekorduException;
import pl.nakicompany.ewzwierzat.utils.exception.PustaNazwaException;
import pl.nakicompany.ewzwierzat.utils.exception.PustaZawartoscPlikuException;

import java.util.List;

public interface IZwierzeService {
    UtworzZwierzeResponseDTO utworzZwierze(UtworzZwierzeRequestDTO utworzZwierzeRequestDTO) throws PustaNazwaException, PustaZawartoscPlikuException;

    ZwierzeDTO pobierzZwierze(Long id) throws BrakRekorduException;

    List<ZwierzeDTO> pobierzZwierzeta(String gatunek, String rasa, String imie, Integer wiek);

    void usunZwierze(Long id) throws BrakRekorduException;

    EdytujZwierzeResponseDTO edytujZwierze(Long id, EdytujZwierzeRequestDTO edytujZwierzeRequestDTO) throws PustaNazwaException, PustaZawartoscPlikuException, BrakRekorduException;
}
