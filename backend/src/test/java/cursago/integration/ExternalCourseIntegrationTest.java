package cursago.integration;

import cursago.gateway.CourseGateway;
import cursago.model.ExternalCourse;
import cursago.pojo.ExternalCourseEdit;
import cursago.repository.CourseRepository;
import cursago.controller.CourseController;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ExternalCourseIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    CourseController courseController;

    private TestRestTemplate restTemplate;
    private CourseGateway courseGateway;

    @Before
    public void setup() {
        restTemplate = new TestRestTemplate();
        String targetUrl = "http://localhost:" + port +"/api";
        courseGateway = new CourseGateway(targetUrl);
    }

    @Test
    public void test001_postOfNewCourseIsPersistedInDatabase() {
        ExternalCourse course = new ExternalCourse();
        String name = "JUnit testing course";
        String description = "great course";
        String platform = "Udemy";
        String link = "https://udemy.com?id=23423424";
        course.setDescription(description);
        course.setName(name);
        course.setLink(link);
        course.setPlatform(platform);

        String id = courseGateway.create(course, restTemplate).getBody();

        assert (id.length() == 36);
        assert(courseRepository.existsExternalCourseByName("JUnit testing course"));
        courseRepository.delete(id);
    }

    @Test
    public void test002_postOfInvalidCourseWithMissingValueOfNameReturnsBadRequest() {
        ExternalCourse course = new ExternalCourse();
        String description = "great course";
        String platform = "Udemy";
        String link = "https://udemy.com?id=23423424";
        course.setDescription(description);
        course.setLink(link);
        course.setPlatform(platform);

        final ResponseEntity<String> response = courseGateway.create(course, restTemplate);
        assert (response.getStatusCode() == HttpStatus.BAD_REQUEST);
    }

    @Test
    public void test003_postOfInvalidCourseWithMissingValueOfDescriptionReturnsBadRequest() {
        ExternalCourse course = new ExternalCourse();
        String name = "JUnit";
        String platform = "Udemy";
        String link = "https://udemy.com?id=23423424";
        course.setName(name);
        course.setLink(link);
        course.setPlatform(platform);

        final ResponseEntity<String> response = courseGateway.create(course, restTemplate);
        assert (response.getStatusCode() == HttpStatus.BAD_REQUEST);
    }

    @Test
    public void test004_postOfInvalidCourseWithBadLinkReturnsBadRequest() {
        ExternalCourse course = new ExternalCourse();
        String name = "JUnit testing course";
        String description = "great course";
        String platform = "Udemy";
        String link = "udemy-com";
        course.setDescription(description);
        course.setName(name);
        course.setLink(link);
        course.setPlatform(platform);

        final ResponseEntity<String> response = courseGateway.create(course, restTemplate);
        assert (response.getStatusCode() == HttpStatus.BAD_REQUEST);
    }

    @Test
    public void test005_creatingNewCourseAndModifyingValues() {
        ExternalCourse course = new ExternalCourse();
        String name = "JUnit testing course";
        String description = "great course";
        String platform = "Udemy";
        String link = "https://udemy.com?id=23423424";
        course.setDescription(description);
        course.setName(name);
        course.setLink(link);
        course.setPlatform(platform);

        String id = courseGateway.create(course, restTemplate).getBody();

        ExternalCourseEdit externalCourseEdit = new ExternalCourseEdit();
        String newName = "Modified name";
        String newDescription = "new description";
        String newPlatform = "Coursera";
        String newLink = "https://coursera.com";

        externalCourseEdit.setId(id);
        externalCourseEdit.setName(newName);
        externalCourseEdit.setDescription(newDescription);
        externalCourseEdit.setPlatform(newPlatform);
        externalCourseEdit.setLink(newLink);

        ExternalCourse externalCourseResponseEdit = courseGateway.edit(externalCourseEdit, restTemplate).getBody();

        assertEquals(newName, externalCourseResponseEdit.getName());
        assertEquals(newDescription, externalCourseResponseEdit.getDescription());
        assertEquals(newPlatform, externalCourseResponseEdit.getPlatform());
        assertEquals(newLink, externalCourseResponseEdit.getLink());
        courseRepository.delete(id);
    }



}
