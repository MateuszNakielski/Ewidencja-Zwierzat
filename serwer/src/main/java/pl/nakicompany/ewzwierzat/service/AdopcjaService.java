package pl.nakicompany.ewzwierzat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nakicompany.ewzwierzat.controller.dto.common.AdopcjaDTO;
import pl.nakicompany.ewzwierzat.controller.dto.common.OsobaAdoptujacaDTO;
import pl.nakicompany.ewzwierzat.controller.dto.common.ZwierzeDTO;
import pl.nakicompany.ewzwierzat.controller.dto.edytujAdopcje.EdytujAdopcjeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.edytujAdopcje.EdytujAdopcjeResponseDTO;
import pl.nakicompany.ewzwierzat.controller.dto.pobierzAdopcje.PobierzAdopcjeResponseDTO;
import pl.nakicompany.ewzwierzat.controller.dto.pobierzAdopcjePoID.PobierzAdopcjePoIdResponseDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzAdopcje.UtworzAdopcjeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzAdopcje.UtworzAdopcjeResponseDTO;
import pl.nakicompany.ewzwierzat.domain.Adopcja;
import pl.nakicompany.ewzwierzat.domain.OsobaAdoptujaca;
import pl.nakicompany.ewzwierzat.domain.Zwierze;
import pl.nakicompany.ewzwierzat.repository.AdopcjaRepository;
import pl.nakicompany.ewzwierzat.repository.OsobaAdoptujacaRepository;
import pl.nakicompany.ewzwierzat.repository.ZwierzeRepository;
import pl.nakicompany.ewzwierzat.utils.exception.BrakRekorduException;

import java.util.List;
import java.util.stream.Collectors;

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
        Zwierze zwierze = adopcja.getZwierze();

        adopcjaRepository.delete(adopcja);
        zwierze.setAdoptowany(false);
        zwierzeRepository.save(zwierze);
    }

    @Override
    public PobierzAdopcjeResponseDTO pobierzAdopcje(){
        List<AdopcjaDTO> result;
        result = adopcjaRepository.findAll().stream().map(a -> {
            AdopcjaDTO adopcjaDTO = new AdopcjaDTO();
            OsobaAdoptujacaDTO osobaAdoptujacaDTO = new OsobaAdoptujacaDTO();
            ZwierzeDTO zwierzeDTO = new ZwierzeDTO();

            adopcjaDTO.setId(a.getId());
            osobaAdoptujacaDTO.setImie(a.getOsobaAdoptujaca().getImie());
            osobaAdoptujacaDTO.setNazwisko(a.getOsobaAdoptujaca().getNazwisko());
            osobaAdoptujacaDTO.setEmail(a.getOsobaAdoptujaca().getEmail());
            osobaAdoptujacaDTO.setMiejscowosc(a.getOsobaAdoptujaca().getMiejscowosc());
            osobaAdoptujacaDTO.setNumerDowodu(a.getOsobaAdoptujaca().getNumerDowodu());
            osobaAdoptujacaDTO.setSeriaDowodu(a.getOsobaAdoptujaca().getSeriaDowodu());
            osobaAdoptujacaDTO.setNumerTelefonu(a.getOsobaAdoptujaca().getNumerTelefonu());
            osobaAdoptujacaDTO.setUlica(a.getOsobaAdoptujaca().getUlica());
            osobaAdoptujacaDTO.setKodPocztowy(a.getOsobaAdoptujaca().getKodPocztowy());
            osobaAdoptujacaDTO.setNrDomu(a.getOsobaAdoptujaca().getNrDomu());
            osobaAdoptujacaDTO.setNrMieszkania(a.getOsobaAdoptujaca().getNrMieszkania());
            adopcjaDTO.setOsobaAdoptujacaDTO(osobaAdoptujacaDTO);

            zwierzeDTO.setImie(a.getZwierze().getImie());
            zwierzeDTO.setGatunek(a.getZwierze().getGatunek());
            zwierzeDTO.setRasa(a.getZwierze().getRasa());
            zwierzeDTO.setWiek(a.getZwierze().getWiek());
            zwierzeDTO.setOpis(a.getZwierze().getOpis());
            zwierzeDTO.setFotoUrl(a.getZwierze().getImageUrl());
            zwierzeDTO.setCechySzczegolne(a.getZwierze().getCechySzczegolne());
            zwierzeDTO.setId(a.getZwierze().getId());
            zwierzeDTO.setNumerCZIP(a.getZwierze().getNumerCZIP());
            adopcjaDTO.setZwierzeDTO(zwierzeDTO);
            return adopcjaDTO;
        }).collect(Collectors.toList());
        PobierzAdopcjeResponseDTO pobierzAdopcjeResponseDTO = new PobierzAdopcjeResponseDTO();
        pobierzAdopcjeResponseDTO.setListaAdopcji(result);
        return pobierzAdopcjeResponseDTO;
    }

    @Override
    public PobierzAdopcjePoIdResponseDTO pobierzAdopcje(Long id) throws BrakRekorduException {
        if(!adopcjaRepository.exists(id))
            throw new BrakRekorduException("Nie ma adopcji o ID" + id.toString());

        Adopcja adopcja = adopcjaRepository.getOne(id);

        AdopcjaDTO adopcjaDTO = new AdopcjaDTO();
        OsobaAdoptujacaDTO osobaAdoptujacaDTO = new OsobaAdoptujacaDTO();
        ZwierzeDTO zwierzeDTO = new ZwierzeDTO();

        adopcjaDTO.setId(adopcja.getId());

        osobaAdoptujacaDTO.setImie(adopcja.getOsobaAdoptujaca().getImie());
        osobaAdoptujacaDTO.setNazwisko(adopcja.getOsobaAdoptujaca().getNazwisko());
        osobaAdoptujacaDTO.setEmail(adopcja.getOsobaAdoptujaca().getEmail());
        osobaAdoptujacaDTO.setNumerDowodu(adopcja.getOsobaAdoptujaca().getNumerDowodu());
        osobaAdoptujacaDTO.setSeriaDowodu(adopcja.getOsobaAdoptujaca().getSeriaDowodu());
        osobaAdoptujacaDTO.setNumerTelefonu(adopcja.getOsobaAdoptujaca().getNumerTelefonu());
        osobaAdoptujacaDTO.setMiejscowosc(adopcja.getOsobaAdoptujaca().getMiejscowosc());
        osobaAdoptujacaDTO.setKodPocztowy(adopcja.getOsobaAdoptujaca().getKodPocztowy());
        osobaAdoptujacaDTO.setNrDomu(adopcja.getOsobaAdoptujaca().getNrDomu());
        osobaAdoptujacaDTO.setNrMieszkania(adopcja.getOsobaAdoptujaca().getNrMieszkania());
        osobaAdoptujacaDTO.setUlica(adopcja.getOsobaAdoptujaca().getUlica());

        zwierzeDTO.setImie(adopcja.getZwierze().getImie());
        zwierzeDTO.setGatunek(adopcja.getZwierze().getGatunek());
        zwierzeDTO.setRasa(adopcja.getZwierze().getRasa());
        zwierzeDTO.setNumerCZIP(adopcja.getZwierze().getNumerCZIP());
        zwierzeDTO.setId(adopcja.getZwierze().getId());
        zwierzeDTO.setCechySzczegolne(adopcja.getZwierze().getCechySzczegolne());
        zwierzeDTO.setFotoUrl(adopcja.getZwierze().getImageUrl());
        zwierzeDTO.setOpis(adopcja.getZwierze().getOpis());
        zwierzeDTO.setWiek(adopcja.getZwierze().getWiek());

        adopcjaDTO.setOsobaAdoptujacaDTO(osobaAdoptujacaDTO);
        adopcjaDTO.setZwierzeDTO(zwierzeDTO);

        PobierzAdopcjePoIdResponseDTO pobierzAdopcjePoIdResponseDTO = new PobierzAdopcjePoIdResponseDTO();
        pobierzAdopcjePoIdResponseDTO.setAdopcjaDTO(adopcjaDTO);
        return pobierzAdopcjePoIdResponseDTO;
    }

    @Override
    public EdytujAdopcjeResponseDTO edytujAdopcje(Long id, EdytujAdopcjeRequestDTO edytujAdopcjeRequestDTO) throws BrakRekorduException {
        if(!adopcjaRepository.exists(id))
            throw new BrakRekorduException("Nie ma adopcji o ID" + id);
        if(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO() == null)
            throw new BrakRekorduException("Brak obiektu osoby");
        Adopcja adopcja = adopcjaRepository.getOne(id);
        OsobaAdoptujaca osobaAdoptujaca = adopcja.getOsobaAdoptujaca();
        if(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getImie() != null)
            osobaAdoptujaca.setImie(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getImie());
        if(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNazwisko() != null)
            osobaAdoptujaca.setNazwisko(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNazwisko());
        if(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNumerTelefonu() != null)
            osobaAdoptujaca.setNumerTelefonu(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNumerTelefonu());
        if(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getEmail() != null)
            osobaAdoptujaca.setEmail(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getEmail());
        if(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNumerDowodu() != null)
            osobaAdoptujaca.setNumerDowodu(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNumerDowodu());
        if(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getSeriaDowodu() != null)
            osobaAdoptujaca.setNumerDowodu(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNumerDowodu());
        if(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getMiejscowosc() != null)
            osobaAdoptujaca.setMiejscowosc(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getMiejscowosc());
        if(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getUlica() != null)
            osobaAdoptujaca.setUlica(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getUlica());
        if(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNrDomu() != null)
            osobaAdoptujaca.setNrDomu(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNrDomu());
        if(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNrMieszkania() != null)
            osobaAdoptujaca.setNrMieszkania(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getNrMieszkania());
        if(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getKodPocztowy() != null)
            osobaAdoptujaca.setKodPocztowy(edytujAdopcjeRequestDTO.getOsobaAdoptujacaDTO().getKodPocztowy());

        osobaAdoptujacaRepository.save(osobaAdoptujaca);

        OsobaAdoptujacaDTO osobaAdoptujacaDTO = new OsobaAdoptujacaDTO();
        osobaAdoptujacaDTO.setImie(osobaAdoptujaca.getImie());
        osobaAdoptujacaDTO.setNazwisko(osobaAdoptujaca.getNazwisko());
        osobaAdoptujacaDTO.setUlica(osobaAdoptujaca.getUlica());
        osobaAdoptujacaDTO.setNrMieszkania(osobaAdoptujaca.getNrMieszkania());
        osobaAdoptujacaDTO.setNrDomu(osobaAdoptujaca.getNrDomu());
        osobaAdoptujacaDTO.setMiejscowosc(osobaAdoptujaca.getMiejscowosc());
        osobaAdoptujacaDTO.setKodPocztowy(osobaAdoptujaca.getKodPocztowy());
        osobaAdoptujacaDTO.setNumerTelefonu(osobaAdoptujaca.getNumerTelefonu());
        osobaAdoptujacaDTO.setEmail(osobaAdoptujaca.getEmail());
        osobaAdoptujacaDTO.setSeriaDowodu(osobaAdoptujaca.getSeriaDowodu());
        osobaAdoptujacaDTO.setNumerDowodu(osobaAdoptujaca.getNumerDowodu());

        ZwierzeDTO zwierzeDTO = new ZwierzeDTO();
        zwierzeDTO.setImie(adopcja.getZwierze().getImie());
        zwierzeDTO.setGatunek(adopcja.getZwierze().getGatunek());
        zwierzeDTO.setRasa(adopcja.getZwierze().getRasa());
        zwierzeDTO.setNumerCZIP(adopcja.getZwierze().getNumerCZIP());
        zwierzeDTO.setId(adopcja.getZwierze().getId());
        zwierzeDTO.setCechySzczegolne(adopcja.getZwierze().getCechySzczegolne());
        zwierzeDTO.setFotoUrl(adopcja.getZwierze().getImageUrl());
        zwierzeDTO.setOpis(adopcja.getZwierze().getOpis());
        zwierzeDTO.setWiek(adopcja.getZwierze().getWiek());

        AdopcjaDTO adopcjaDTO = new AdopcjaDTO();
        adopcjaDTO.setId(adopcja.getId());
        adopcjaDTO.setZwierzeDTO(zwierzeDTO);
        adopcjaDTO.setOsobaAdoptujacaDTO(osobaAdoptujacaDTO);
        EdytujAdopcjeResponseDTO edytujAdopcjeResponseDTO = new EdytujAdopcjeResponseDTO();
        edytujAdopcjeResponseDTO.setAdopcjaDTO(adopcjaDTO);
        return edytujAdopcjeResponseDTO;
    }
}
