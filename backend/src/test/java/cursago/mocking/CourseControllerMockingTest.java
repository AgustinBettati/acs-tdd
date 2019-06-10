package cursago.mocking;

import cursago.controller.CourseController;
import cursago.mocks.FailureRepository;
import cursago.mocks.SuccessRepository;
import cursago.model.ExternalCourse;
import cursago.service.CourseService;
import org.junit.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static cursago.Application.API_V1_BASE_URI;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.atLeastOnce;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;


public class CourseControllerMockingTest {

    private CourseService successCourseService = new CourseService(new SuccessRepository());
    private CourseController successCourseController = new CourseController(successCourseService);

    private CourseService failureCourseService = new CourseService(new FailureRepository());
    private CourseController failureCourseController = new CourseController(failureCourseService);

    @Test
    public void test001_postOfNewCourseShouldReturnCreatedWithIdInHeader() {

        ExternalCourse externalCourse = new ExternalCourse();
        externalCourse.setName("JUnit course");
        externalCourse.setDescription("Description");
        externalCourse.setLink("https://udemy.com?id=23423424");
        externalCourse.setPlatform("Udemy");

        ResponseEntity<?> result = successCourseController.postCourse(externalCourse);

        assertEquals(API_V1_BASE_URI+"/course/0b9e5535-1ca6-4a96-8d5b-0b54ec92c78f", result.getHeaders().getLocation().toString());
        assertThat(result.getStatusCode(), is(HttpStatus.CREATED));
    }

    @Test
    public void test002_postingCourseThatHasUsedNameReturnsConflict(){
        ExternalCourse externalCourse = new ExternalCourse();
        externalCourse.setName("JUnit course");
        externalCourse.setDescription("Description");
        externalCourse.setLink("https://udemy.com?id=23423424");
        externalCourse.setPlatform("Udemy");

        ResponseEntity<?> result = failureCourseController.postCourse(externalCourse);
        assertThat(result.getStatusCode(), is(HttpStatus.CONFLICT));
    }

    @Test
    public void test003_obtainByIdWhenCourseIsPresentReturnsOk(){
        String fakeId = "0b9e5535-1ca6-4a96-8d5b-0b54ec92c78f";

        ExternalCourse externalCourse = new ExternalCourse();
        externalCourse.setName("JUnit course");
        externalCourse.setDescription("Description");
        externalCourse.setLink("https://udemy.com?id=23423424");
        externalCourse.setPlatform("Udemy");

        ResponseEntity<?> result = successCourseController.getCourseById(fakeId);
        assertThat(result.getStatusCode(), is(HttpStatus.OK));
    }

    @Test
    public void test004_obtainByIdWhenCourseIsNotPresentReturnsNotFound() {
        String fakeId = "0b9e5535-1ca6-4a96-8d5b-0b54ec92c78f";

        ExternalCourse externalCourse = new ExternalCourse();
        externalCourse.setName("JUnit course");
        externalCourse.setDescription("Description");
        externalCourse.setLink("https://udemy.com?id=23423424");
        externalCourse.setPlatform("Udemy");

        ResponseEntity<?> result = failureCourseController.getCourseById(fakeId);
        assertThat(result.getStatusCode(), is(HttpStatus.NOT_FOUND));
    }
}
