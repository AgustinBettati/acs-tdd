package cursago.twitter;

import twitter4j.HttpClientConfiguration;
import twitter4j.HttpResponse;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public class FakeTwitterHttpResponse extends HttpResponse {

    FakeTwitterHttpResponse(HttpClientConfiguration conf, int statusCode) {
        super(conf);
        super.statusCode = statusCode;
    }

    @Override
    public String getResponseHeader(String name) {
        return null;
    }

    @Override
    public Map<String, List<String>> getResponseHeaderFields() {
        return null;
    }

    @Override
    public void disconnect() throws IOException {

    }
}
