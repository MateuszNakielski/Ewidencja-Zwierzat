package pl.nakicompany.ewzwierzat.utils.exception;

public class PustaZawartoscPlikuException extends Throwable {
    public PustaZawartoscPlikuException(String pusta_nazwa) {
        super(pusta_nazwa);
    }
}
