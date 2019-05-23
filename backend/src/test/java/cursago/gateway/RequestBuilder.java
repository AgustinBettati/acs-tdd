package cursago.gateway;

import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

class RequestBuilder<T> {

    //~ Instance Fields ..............................................................................................................................

    private Object body;

    private HttpHeaders headers = new HttpHeaders();
    private Map<String, String> parameters;
    private ParameterizedTypeReference<T> responseType;

    private TestRestTemplate restTemplate;
    private String uri;

    //~ Constructors .................................................................................................................................

    RequestBuilder(TestRestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.parameters = new HashMap<>();
    }

    //~ Methods ......................................................................................................................................

    RequestBuilder<T> addHeader(String name, String value) {
        this.headers.add(name, value);
        return this;
    }

    RequestBuilder<T> addParameter(String name, String value) {
        this.parameters.put(name, value);
        return this;
    }

    ResponseEntity<T> delete() {
        return call(HttpMethod.DELETE);
    }

    ResponseEntity<T> get() {
        return call(HttpMethod.GET);
    }

    ResponseEntity<T> patch() {
        return call(HttpMethod.PATCH);
    }

    ResponseEntity<T> post() {
        return call(HttpMethod.POST);
    }

    ResponseEntity<T> put() {
        return call(HttpMethod.PUT);
    }

    RequestBuilder<T> setBody(Object body) {
        this.body = body;
        return this;
    }

    RequestBuilder<T> setFileContentType() {
        this.headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return this;
    }

    RequestBuilder<T> setAuthorization(String token) {
        this.headers.set("Authorization", token);
        return this;
    }

    RequestBuilder<T> setJsonContentType() {
        this.headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        return this;
    }

    RequestBuilder<T> setResponseType(ParameterizedTypeReference<T> responseType) {
        this.responseType = responseType;
        return this;
    }

    RequestBuilder<T> setUri(String uri) {
        this.uri = uri;
        return this;
    }

    private ResponseEntity<T> call(HttpMethod method) {
        try {
            final HttpEntity entity = new HttpEntity<>(body, headers);

            if (!this.parameters.isEmpty()) uri += "?" + this.parameters.entrySet().stream().map(parameter ->
                    parameter.getKey() + "=" + UrlUtils.urlEncode(parameter.getValue())).collect(Collectors.joining("&"));
            return restTemplate.exchange(URI.create(uri), method, entity, responseType);
        } catch (final Exception e) {
            System.out.println(e.getMessage());
            throw e;
        }
    }
}


