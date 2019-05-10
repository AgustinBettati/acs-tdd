package cursago.service;

import cursago.model.ExternalCourse;
import cursago.pojo.ExternalCourseEdit;
import cursago.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class CourseService {

    private CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public String saveCourse(ExternalCourse externalCourse) {
        String generatedId = UUID.randomUUID().toString();
        externalCourse.setId(generatedId);
        courseRepository.save(externalCourse);
        return generatedId;
    }

    public ExternalCourse updateCourse(ExternalCourseEdit ExternalCourseEdit, ExternalCourse externalCourse) {
        externalCourse.setName(ExternalCourseEdit.getName());
        externalCourse.setDescription(ExternalCourseEdit.getDescription());
        externalCourse.setPlatform(ExternalCourseEdit.getPlatform());
        externalCourse.setLink(ExternalCourseEdit.getLink());
        return courseRepository.save(externalCourse);
    }

    public List<ExternalCourse> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<ExternalCourse> getCourseById(String id) {
        return courseRepository.getCourseById(id);
    }

    public boolean existsCourseWithName(String name) {
        return courseRepository.existsExternalCourseByName(name);
    }

}



