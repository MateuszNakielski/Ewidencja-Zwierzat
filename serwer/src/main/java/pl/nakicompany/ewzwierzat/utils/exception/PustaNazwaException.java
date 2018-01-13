package pl.nakicompany.ewzwierzat.utils.exception;

public class PustaNazwaException extends Throwable {
    public PustaNazwaException(String pusta_nazwa) {
        super(pusta_nazwa);
    }
}
