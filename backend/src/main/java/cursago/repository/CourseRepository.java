package cursago.repository;


import cursago.model.ExternalCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<ExternalCourse, String> {
    boolean existsExternalCourseByName(String name);
    Optional<ExternalCourse> getCourseById(String id);
}
