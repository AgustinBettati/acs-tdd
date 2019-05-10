package cursago.gateway;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

class UrlUtils {

    private UrlUtils() {
        throw new UnsupportedOperationException("Util class should not be instantiated");
    }

    private static final String ENCODING = "UTF-8";

    static String urlEncode(String text) {
        if (text == null) {
            return null;
        }

        try {
            return URLEncoder.encode(text, ENCODING);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("invalid encoding");
        }
    }
}
