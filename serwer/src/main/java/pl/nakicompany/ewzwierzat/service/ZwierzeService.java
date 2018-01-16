package pl.nakicompany.ewzwierzat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nakicompany.ewzwierzat.controller.dto.common.ZwierzeDTO;
import pl.nakicompany.ewzwierzat.controller.dto.edytujZwierze.EdytujZwierzeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.edytujZwierze.EdytujZwierzeResponseDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzZwierze.UtworzZwierzeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzZwierze.UtworzZwierzeResponseDTO;
import pl.nakicompany.ewzwierzat.domain.Zwierze;
import pl.nakicompany.ewzwierzat.repository.ZwierzeRepository;
import pl.nakicompany.ewzwierzat.utils.exception.BrakRekorduException;
import pl.nakicompany.ewzwierzat.utils.exception.PustaNazwaException;
import pl.nakicompany.ewzwierzat.utils.exception.PustaZawartoscPlikuException;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
public class ZwierzeService implements IZwierzeService{

    @Autowired
    private IFileService fileService;

    @Autowired
    private ZwierzeRepository zwierzeRepository;

    @Override
    public UtworzZwierzeResponseDTO utworzZwierze(UtworzZwierzeRequestDTO utworzZwierzeRequestDTO) throws PustaNazwaException, PustaZawartoscPlikuException {

        if(utworzZwierzeRequestDTO.getZwierzeFoto().getFileName() == null || utworzZwierzeRequestDTO.getZwierzeFoto().getFileName().isEmpty())
            throw new PustaNazwaException("Pusta nazwa pliku");
        if(utworzZwierzeRequestDTO.getZwierzeFoto().getFileContent() == null || utworzZwierzeRequestDTO.getZwierzeFoto().getFileContent().isEmpty())
            throw new PustaZawartoscPlikuException("Pusta zawartosc pliku");

        String fotoUrl = fileService.store(
                Base64.decode(utworzZwierzeRequestDTO.getZwierzeFoto().getFileContent().getBytes()),
                utworzZwierzeRequestDTO.getZwierzeFoto().getFileName()
        );

        ZwierzeDTO zwierzeDTO = utworzZwierzeRequestDTO.getZwierze();
        Zwierze zwierze = new Zwierze();

        zwierze.setGatunek(zwierzeDTO.getGatunek());
        zwierze.setRasa(zwierzeDTO.getRasa());
        zwierze.setImie(zwierzeDTO.getImie());
        zwierze.setOpis(zwierzeDTO.getOpis());
        zwierze.setWiek(zwierzeDTO.getWiek());
        zwierze.setNumerCZIP(zwierzeDTO.getNumerCZIP());
        zwierze.setCechySzczegolne(zwierzeDTO.getCechySzczegolne());
        zwierze.setImageUrl(fotoUrl);
        zwierze = zwierzeRepository.save(zwierze);
        zwierzeDTO.setId(zwierze.getId());
        zwierzeDTO.setFotoUrl(zwierze.getImageUrl());
        UtworzZwierzeResponseDTO utworzZwierzeResponseDTO = new UtworzZwierzeResponseDTO();
        utworzZwierzeResponseDTO.setZwierzeDTO(zwierzeDTO);

        return utworzZwierzeResponseDTO;

    }

    @Override
    public ZwierzeDTO pobierzZwierze(Long id) throws BrakRekorduException {
        if(!zwierzeRepository.exists(id))
            throw new BrakRekorduException("Brak zwierzecia o id " + id);

        Zwierze zwierze = zwierzeRepository.getOne(id);

        ZwierzeDTO zwierzeDTO= new ZwierzeDTO();
        zwierzeDTO.setId(zwierze.getId());
        zwierzeDTO.setFotoUrl(zwierze.getImageUrl());
        zwierzeDTO.setImie(zwierze.getImie());
        zwierzeDTO.setGatunek(zwierze.getGatunek());
        zwierzeDTO.setOpis(zwierze.getOpis());
        zwierzeDTO.setRasa(zwierze.getRasa());
        zwierzeDTO.setWiek(zwierze.getWiek());
        zwierzeDTO.setCechySzczegolne(zwierze.getCechySzczegolne());
        zwierzeDTO.setNumerCZIP(zwierze.getNumerCZIP());
        return zwierzeDTO;
    }

    @Override
    public List<ZwierzeDTO> pobierzZwierzeta(String gatunek, String rasa, String imie, Integer wiek) {
        Stream<Zwierze> stream = zwierzeRepository.findAll().stream().filter(z -> !z.getAdoptowany());
        if(gatunek != null)
            stream = stream.filter(z -> z.getGatunek().equals(gatunek));
        if(rasa != null)
            stream = stream.filter(z -> z.getRasa().equals(rasa));
        if(imie != null)
            stream = stream.filter(z -> z.getImie().equals(imie));
        if(wiek != null)
            stream = stream.filter(z -> z.getWiek().equals(wiek));

        return stream.map(z->{
            ZwierzeDTO zwierzeDTO = new ZwierzeDTO();
            zwierzeDTO.setId(z.getId());
            zwierzeDTO.setWiek(z.getWiek());
            zwierzeDTO.setRasa(z.getRasa());
            zwierzeDTO.setOpis(z.getOpis());
            zwierzeDTO.setGatunek(z.getGatunek());
            zwierzeDTO.setImie(z.getImie());
            zwierzeDTO.setFotoUrl(z.getImageUrl());
            zwierzeDTO.setCechySzczegolne(z.getCechySzczegolne());
            zwierzeDTO.setNumerCZIP(z.getNumerCZIP());
            return zwierzeDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public void usunZwierze(Long id) throws BrakRekorduException {
        if(!zwierzeRepository.exists(id))
            throw new BrakRekorduException("Brak zwierzecia o id " + id);

        Zwierze zwierze = zwierzeRepository.getOne(id);

        zwierzeRepository.delete(zwierze);
    }

    @Override
    public EdytujZwierzeResponseDTO edytujZwierze(Long id, EdytujZwierzeRequestDTO edytujZwierzeRequestDTO) throws PustaNazwaException, PustaZawartoscPlikuException, BrakRekorduException {
        if(!zwierzeRepository.exists(id))
            throw new BrakRekorduException("Brak zwierzecia o id " + id);

        Zwierze zwierze = zwierzeRepository.getOne(id);

        ZwierzeDTO result = new ZwierzeDTO();
        result.setId(id);
        if (edytujZwierzeRequestDTO.getZwierzeFoto() != null) {
            if(edytujZwierzeRequestDTO.getZwierzeFoto().getFileName() == null || edytujZwierzeRequestDTO.getZwierzeFoto().getFileName().isEmpty())
                throw new PustaNazwaException("Pusta nazwa pliku");
            if(edytujZwierzeRequestDTO.getZwierzeFoto().getFileContent() == null || edytujZwierzeRequestDTO.getZwierzeFoto().getFileContent().isEmpty())
                throw new PustaZawartoscPlikuException("Pusta zawartosc pliku");
            String fotoUrl = fileService.store(
                    Base64.decode(edytujZwierzeRequestDTO.getZwierzeFoto().getFileContent().getBytes()),
                    edytujZwierzeRequestDTO.getZwierzeFoto().getFileName()
            );
            zwierze.setImageUrl(fotoUrl);
        }
        else
            result.setFotoUrl(zwierze.getImageUrl());

        ZwierzeDTO zwierzeDTO = edytujZwierzeRequestDTO.getZwierze();

        if (zwierzeDTO != null) {
            if(zwierzeDTO.getWiek() != null){
                zwierze.setWiek(zwierzeDTO.getWiek());
            }
            if(zwierzeDTO.getGatunek() != null){
                zwierze.setGatunek(zwierzeDTO.getGatunek());
            }
            if(zwierzeDTO.getImie() != null){
                zwierze.setImie(zwierzeDTO.getImie());
            }
            if(zwierzeDTO.getOpis() != null){
                zwierze.setOpis(zwierzeDTO.getOpis());
            }
            if(zwierzeDTO.getRasa() != null){
                zwierze.setRasa(zwierzeDTO.getRasa());
            }
            if(zwierzeDTO.getCechySzczegolne() != null){
                zwierze.setCechySzczegolne(zwierzeDTO.getCechySzczegolne());
            }
            if(zwierzeDTO.getNumerCZIP() != null){
                zwierze.setNumerCZIP(zwierzeDTO.getNumerCZIP());
            }
        }
        result.setImie(zwierze.getImie());
        result.setGatunek(zwierze.getGatunek());
        result.setOpis(zwierze.getOpis());
        result.setRasa(zwierze.getRasa());
        result.setWiek(zwierze.getWiek());
        result.setFotoUrl(zwierze.getImageUrl());
        result.setCechySzczegolne(zwierze.getCechySzczegolne());
        result.setNumerCZIP(zwierze.getNumerCZIP());
        zwierzeRepository.save(zwierze);
        EdytujZwierzeResponseDTO edytujZwierzeResponseDTO = new EdytujZwierzeResponseDTO();
        edytujZwierzeResponseDTO.setZwierzeDTO(result);

        return edytujZwierzeResponseDTO;
    }
}
