package cursago.gateway;

import cursago.model.ExternalCourse;
import cursago.pojo.ExternalCourseEdit;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;

public class CourseGateway {

    private String baseUrl;

    public CourseGateway(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public ResponseEntity<String> create(ExternalCourse newCourse, TestRestTemplate restTemplate) {
        return new RequestBuilder<String>(restTemplate)
                .setUri(baseUrl + "/course")
                .setBody(newCourse)
                .setResponseType(new ParameterizedTypeReference<String>() {
                })
                .setJsonContentType()
                .post();
    }


    public ExternalCourse get(String id, TestRestTemplate restTemplate) {
        return new RequestBuilder<ExternalCourse>(restTemplate)
                .setUri(baseUrl + "/course/" + id)
                .setResponseType(new ParameterizedTypeReference<ExternalCourse>() {
                })
                .setJsonContentType()
                .get()
                .getBody();
    }


    public ResponseEntity<ExternalCourse> edit(ExternalCourseEdit externalCourseEdit, TestRestTemplate restTemplate) {
        return new RequestBuilder<ExternalCourse>(restTemplate)
                .setUri(baseUrl + "/course")
                .setBody( externalCourseEdit)
                .setResponseType(new ParameterizedTypeReference<ExternalCourse>() {
                })
                .setJsonContentType()
                .put();
    }

}
