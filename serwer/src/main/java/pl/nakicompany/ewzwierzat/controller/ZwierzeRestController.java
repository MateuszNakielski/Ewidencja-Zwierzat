package pl.nakicompany.ewzwierzat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.*;
import pl.nakicompany.ewzwierzat.controller.dto.PobierzZwierzeResponseDTO;
import pl.nakicompany.ewzwierzat.controller.dto.common.ZwierzeDTO;
import pl.nakicompany.ewzwierzat.controller.dto.edytujZwierze.EdytujZwierzeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.edytujZwierze.EdytujZwierzeResponseDTO;
import pl.nakicompany.ewzwierzat.controller.dto.pobierzZwierzeta.PobierzZwierzetaResponseDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzZwierze.UtworzZwierzeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzZwierze.UtworzZwierzeResponseDTO;
import pl.nakicompany.ewzwierzat.service.IZwierzeService;
import pl.nakicompany.ewzwierzat.utils.exception.BrakRekorduException;
import pl.nakicompany.ewzwierzat.utils.exception.PustaNazwaException;
import pl.nakicompany.ewzwierzat.utils.exception.PustaZawartoscPlikuException;

import java.util.List;

@RestController
@RequestMapping("/zwierze")
@CrossOrigin
public class ZwierzeRestController {

    @Autowired
    private IZwierzeService zwierzeService;

    @ResponseBody
    @RequestMapping(value = "",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> utworzZwierze(@RequestBody UtworzZwierzeRequestDTO utworzZwierzeRequestDTO){
        UtworzZwierzeResponseDTO utworzZwierzeResponseDTO;
        try {
            utworzZwierzeResponseDTO = zwierzeService.utworzZwierze(utworzZwierzeRequestDTO);
        } catch (PustaNazwaException e) {
            return new ResponseEntity<String>("Brak nazwy obrazu", HttpStatus.BAD_REQUEST);
        } catch (PustaZawartoscPlikuException e) {
            return new ResponseEntity<String>("Brak zawartosc obrazu", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<UtworzZwierzeResponseDTO>(utworzZwierzeResponseDTO, HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> pobierzZwierze(@PathVariable("id") Long id){
        ZwierzeDTO zwierzeDTO;
        try {
            zwierzeDTO = zwierzeService.pobierzZwierze(id);
        } catch (BrakRekorduException e) {
            return new ResponseEntity<String>("Brak zwierzecia o zadanym id: " + id, HttpStatus.NOT_FOUND);
        }
        PobierzZwierzeResponseDTO pobierzZwierzeResponseDTO = new PobierzZwierzeResponseDTO();
        pobierzZwierzeResponseDTO.setZwierzeDTO(zwierzeDTO);
        return new ResponseEntity<PobierzZwierzeResponseDTO>(pobierzZwierzeResponseDTO, HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> pobierzZwierzeta(
            @RequestParam(required = false) String gatunek,
            @RequestParam(required = false) String rasa,
            @RequestParam(required = false) String imie,
            @RequestParam(required = false) Integer wiek
    ){
        List<ZwierzeDTO> zwierzetaDTO = zwierzeService.pobierzZwierzeta(gatunek, rasa, imie, wiek);
        PobierzZwierzetaResponseDTO pobierzZwierzetaResponsedto = new PobierzZwierzetaResponseDTO();
        pobierzZwierzetaResponsedto.setListaZwierzat(zwierzetaDTO);
        return new ResponseEntity<PobierzZwierzetaResponseDTO>(pobierzZwierzetaResponsedto, HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> usunZwierze(@PathVariable("id") Long id){
        try {
            zwierzeService.usunZwierze(id);
        } catch (BrakRekorduException e) {
            return new ResponseEntity<String>("Brak zwierzecia o zadanym id: " + id, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> EdytujZwierze(
            @PathVariable("id") Long id,
            @RequestBody EdytujZwierzeRequestDTO edytujZwierzeRequestDTO){
        EdytujZwierzeResponseDTO edytujZwierzeResponseDTO;
        try {
            edytujZwierzeResponseDTO = zwierzeService.edytujZwierze(id, edytujZwierzeRequestDTO);
        } catch (PustaNazwaException e) {
            return new ResponseEntity<String>("Brak nazwy obrazu", HttpStatus.BAD_REQUEST);
        } catch (PustaZawartoscPlikuException e) {
            return new ResponseEntity<String>("Brak zawartosci obrazu", HttpStatus.BAD_REQUEST);
        } catch (BrakRekorduException e) {
            return new ResponseEntity<String>("Brak zwierzecia o zadanym id: " + id, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<EdytujZwierzeResponseDTO>(edytujZwierzeResponseDTO, HttpStatus.OK);
    }
}
