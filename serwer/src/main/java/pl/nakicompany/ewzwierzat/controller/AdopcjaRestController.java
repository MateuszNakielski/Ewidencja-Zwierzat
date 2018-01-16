package pl.nakicompany.ewzwierzat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.nakicompany.ewzwierzat.controller.dto.utworzAdopcje.UtworzAdopcjeRequestDTO;
import pl.nakicompany.ewzwierzat.controller.dto.utworzAdopcje.UtworzAdopcjeResponseDTO;
import pl.nakicompany.ewzwierzat.service.IAdopcjaService;
import pl.nakicompany.ewzwierzat.utils.exception.BrakRekorduException;
import pl.nakicompany.ewzwierzat.utils.exception.PustaNazwaException;
import pl.nakicompany.ewzwierzat.utils.exception.PustaZawartoscPlikuException;


@RestController
@RequestMapping("/adopcja")
@CrossOrigin
public class AdopcjaRestController {

    @Autowired
    private IAdopcjaService adopcjaService;

    @ResponseBody
    @RequestMapping(value = "",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> utworzZwierze(@RequestBody UtworzAdopcjeRequestDTO utworzAdopcjeRequestDTO){
        UtworzAdopcjeResponseDTO utworzAdopcjeResponseDTO;
        try {
            utworzAdopcjeResponseDTO = adopcjaService.utworzAdopcje(utworzAdopcjeRequestDTO);
        } catch (BrakRekorduException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<UtworzAdopcjeResponseDTO>(utworzAdopcjeResponseDTO, HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> usunAdopcje(@PathVariable("id") Long id){
        try {
            adopcjaService.usunAdopcje(id);
        } catch (BrakRekorduException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
