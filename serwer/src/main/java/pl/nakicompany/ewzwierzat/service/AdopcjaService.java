package pl.nakicompany.ewzwierzat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nakicompany.ewzwierzat.controller.dto.common.AdopcjaDTO;
import pl.nakicompany.ewzwierzat.controller.dto.common.OsobaAdoptujacaDTO;
import pl.nakicompany.ewzwierzat.controller.dto.common.ZwierzeDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzAdopcje.UtworzAdopcjeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzAdopcje.UtworzAdopcjeResponseDTO;
import pl.nakicompany.ewzwierzat.domain.Adopcja;
import pl.nakicompany.ewzwierzat.domain.OsobaAdoptujaca;
import pl.nakicompany.ewzwierzat.domain.Zwierze;
import pl.nakicompany.ewzwierzat.repository.AdopcjaRepository;
import pl.nakicompany.ewzwierzat.repository.OsobaAdoptujacaRepository;
import pl.nakicompany.ewzwierzat.repository.ZwierzeRepository;
import pl.nakicompany.ewzwierzat.utils.exception.BrakRekorduException;

@Service
@Transactional
public class AdopcjaService implements IAdopcjaService {

    @Autowired
    private OsobaAdoptujacaRepository osobaAdoptujacaRepository;

    @Autowired
    private AdopcjaRepository adopcjaRepository;

    @Autowired
    private ZwierzeRepository zwierzeRepository;

    @Override
    public UtworzAdopcjeResponseDTO utworzAdopcje(UtworzAdopcjeRequestDTO utworzAdopcjeRequestDTO) throws BrakRekorduException {

        if(utworzAdopcjeRequestDTO.getZwierzeDTO() == null)
            throw new BrakRekorduException("Nie ma zwierzęcia w zapytaniu");
        Long idZwierzecia = utworzAdopcjeRequestDTO.getZwierzeDTO().getId();

        if(idZwierzecia == null || !zwierzeRepository.exists(idZwierzecia))
            throw new BrakRekorduException("Nie ma zwierzęcia o ID" + idZwierzecia);

        if(utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO() == null)
            throw new BrakRekorduException("Brak obiektu osoby adoptujacej");

        Zwierze zwierze = zwierzeRepository.getOne(idZwierzecia);

        if(zwierze.getAdoptowany())
            throw new BrakRekorduException("Zwierze adoptowane; idZwierzecia: " + idZwierzecia);

        zwierze.setAdoptowany(true);
        zwierzeRepository.save(zwierze);

        OsobaAdoptujaca osobaAdoptujaca = new OsobaAdoptujaca();
        osobaAdoptujaca.setImie(utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getImie());
        osobaAdoptujaca.setNazwisko(utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNazwisko());
        osobaAdoptujaca.setEmail(utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getEmail());
        osobaAdoptujaca.setMiejscowosc(utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getMiejscowosc());
        osobaAdoptujaca.setNumerDowodu(utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNumerDowodu());
        osobaAdoptujaca.setNumerTelefonu(utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNumerTelefonu());
        osobaAdoptujaca.setSeriaDowodu(utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getSeriaDowodu());
        osobaAdoptujaca.setUlica(utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getUlica());
        osobaAdoptujaca.setKodPocztowy(utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getKodPocztowy());
        osobaAdoptujaca.setNrDomu(utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNrDomu());
        osobaAdoptujaca.setNrMieszkania(utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNrMieszkania());

        osobaAdoptujaca = osobaAdoptujacaRepository.save(osobaAdoptujaca);

        Adopcja adopcja = new Adopcja();

        adopcja.setZwierze(zwierze);
        adopcja.setOsobaAdoptujaca(osobaAdoptujaca);

        adopcja = adopcjaRepository.save(adopcja);

        UtworzAdopcjeResponseDTO utworzAdopcjeResponseDTO = new UtworzAdopcjeResponseDTO();
        ZwierzeDTO zwierzeDTO = new ZwierzeDTO();
        OsobaAdoptujacaDTO osobaAdoptujacaDTO = utworzAdopcjeRequestDTO.getOsobaAdoptujacaDTO();
        AdopcjaDTO adopcjaDTO = new AdopcjaDTO();

        zwierzeDTO.setImie(zwierze.getImie());
        zwierzeDTO.setGatunek(zwierze.getGatunek());
        zwierzeDTO.setRasa(zwierze.getRasa());
        zwierzeDTO.setOpis(zwierze.getOpis());
        zwierzeDTO.setFotoUrl(zwierze.getImageUrl());
        zwierzeDTO.setCechySzczegolne(zwierze.getCechySzczegolne());
        zwierzeDTO.setNumerCZIP(zwierze.getNumerCZIP());
        zwierzeDTO.setWiek(zwierze.getWiek());

        adopcjaDTO.setOsobaAdoptujacaDTO(osobaAdoptujacaDTO);
        adopcjaDTO.setZwierzeDTO(zwierzeDTO);
        adopcjaDTO.setId(adopcja.getId());

        utworzAdopcjeResponseDTO.setAdopcjaDTO(adopcjaDTO);

        return utworzAdopcjeResponseDTO;
    }

    @Override
    public void usunAdopcje(Long id) throws BrakRekorduException {
        if(!adopcjaRepository.exists(id))
            throw new BrakRekorduException("Nie ma adopcji o ID" + id.toString());

        Adopcja adopcja = adopcjaRepository.getOne(id);
        OsobaAdoptujaca osobaAdoptujaca = adopcja.getOsobaAdoptujaca();
        Zwierze zwierze = adopcja.getZwierze();

        osobaAdoptujacaRepository.delete(osobaAdoptujaca);
        adopcjaRepository.delete(adopcja);
        zwierze.setAdoptowany(false);
        zwierzeRepository.save(zwierze);
    }
}
