package cursago.controller;


import cursago.model.ExternalCourse;
import cursago.pojo.ExternalCourseEdit;
import cursago.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class CourseController {

    private CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping(value = "/api/course")
//    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity postCourse(@RequestBody @Valid ExternalCourse externalCourse) {
        if (courseService.existsCourseWithName(externalCourse.getName())) {
            return new ResponseEntity<>("name has already been registered", HttpStatus.CONFLICT);
        }
        String id = courseService.saveCourse(externalCourse);
        UriComponentsBuilder ucBuilder = UriComponentsBuilder.newInstance();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/course/{id}").buildAndExpand(id).toUri());
        return new ResponseEntity<>(id, headers, HttpStatus.CREATED);
    }

    @PutMapping(value = "/api/course")
//    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity updateCourse(@RequestBody @Valid ExternalCourseEdit externalCourseEdit) {
        Optional<ExternalCourse> optionalCourse = courseService.getCourseById(externalCourseEdit.getId());
        if (!optionalCourse.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        final ExternalCourse actualExternalCourse = optionalCourse.get();
        if (!actualExternalCourse.getName().equals(externalCourseEdit.getName()) &&
                courseService.existsCourseWithName(externalCourseEdit.getName())) {
            return new ResponseEntity<>("name has already been registered", HttpStatus.CONFLICT);
        }
        ExternalCourse editedExternalCourse = courseService.updateCourse(externalCourseEdit, actualExternalCourse);
        return ResponseEntity.ok(editedExternalCourse);
    }

    @GetMapping(value = "/api/course")
//    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<ExternalCourse>> getAllCourses() {
        List<ExternalCourse> externalCourses = courseService.getAllCourses();
        return new ResponseEntity<>(externalCourses, HttpStatus.OK);
    }

    @GetMapping(value = "/api/course/{id}")
//    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity getCourseById(@PathVariable("id") String id) {
        return courseService.getCourseById(id)
                .map(found -> new ResponseEntity<>(found, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }



}
