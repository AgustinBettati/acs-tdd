package cursago.mocking;

import cursago.controller.CourseController;
import cursago.model.ExternalCourse;
import cursago.service.CourseService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
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


@RunWith(MockitoJUnitRunner.class)
public class CourseControllerMockitoTest {

    @Mock
    private CourseService courseService;

    @InjectMocks
    private CourseController courseController = new CourseController(courseService);

    @Test
    public void test001_postOfNewCourseShouldReturnCreatedWithIdInHeader() {

        String fakeId = "0b9e5535-1ca6-4a96-8d5b-0b54ec92c78f";

        ExternalCourse externalCourse = new ExternalCourse();
        externalCourse.setName("JUnit course");
        externalCourse.setDescription("Description");
        externalCourse.setLink("https://udemy.com?id=23423424");
        externalCourse.setPlatform("Udemy");

        when(courseService.saveCourse(externalCourse)).thenReturn(fakeId);

        ResponseEntity<?> result = courseController.postCourse(externalCourse);

        verify(courseService, atLeastOnce()).saveCourse(externalCourse);
        assertEquals(API_V1_BASE_URI+"/course/" + fakeId, result.getHeaders().getLocation().toString());
        assertThat(result.getStatusCode(), is(HttpStatus.CREATED));
    }

    @Test
    public void test002_postingCourseThatHasUsedNameReturnsConflict(){
        ExternalCourse externalCourse = new ExternalCourse();
        externalCourse.setName("JUnit course");
        externalCourse.setDescription("Description");
        externalCourse.setLink("https://udemy.com?id=23423424");
        externalCourse.setPlatform("Udemy");

        when(courseService.existsCourseWithName(externalCourse.getName())).thenReturn(true);

        ResponseEntity<?> result = courseController.postCourse(externalCourse);
        verify(courseService, atLeastOnce()).existsCourseWithName(externalCourse.getName());
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

        when(courseService.getCourseById(fakeId)).thenReturn(Optional.of(externalCourse));

        ResponseEntity<?> result = courseController.getCourseById(fakeId);
        verify(courseService, atLeastOnce()).getCourseById(fakeId);
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

        when(courseService.getCourseById(fakeId)).thenReturn(Optional.empty());
        ResponseEntity<?> result = courseController.getCourseById(fakeId);
        verify(courseService, atLeastOnce()).getCourseById(fakeId);
        assertThat(result.getStatusCode(), is(HttpStatus.NOT_FOUND));
    }
}
