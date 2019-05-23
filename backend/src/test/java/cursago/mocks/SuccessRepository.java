package cursago.mocks;

import cursago.model.ExternalCourse;
import cursago.repository.CourseRepository;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public class SuccessRepository implements CourseRepository {

    @Override
    public boolean existsExternalCourseByName(String name) {
        return false;
    }

    @Override
    public Optional<ExternalCourse> getCourseById(String id) {
       if(id.equals("0b9e5535-1ca6-4a96-8d5b-0b54ec92c78f")){
           ExternalCourse externalCourse = new ExternalCourse();
           externalCourse.setName("JUnit course");
           externalCourse.setDescription("Description");
           externalCourse.setLink("https://udemy.com?id=23423424");
           externalCourse.setPlatform("Udemy");
           return Optional.of(externalCourse);
       }
       return Optional.empty();
    }

    @Override
    public List<ExternalCourse> findAll() {
        return null;
    }

    @Override
    public List<ExternalCourse> findAll(Sort sort) {
        return null;
    }

    @Override
    public List<ExternalCourse> findAll(Iterable<String> strings) {
        return null;
    }

    @Override
    public <S extends ExternalCourse> List<S> save(Iterable<S> entities) {
        return null;
    }

    @Override
    public void flush() {

    }

    @Override
    public <S extends ExternalCourse> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public void deleteInBatch(Iterable<ExternalCourse> entities) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public ExternalCourse getOne(String s) {
        return null;
    }

    @Override
    public <S extends ExternalCourse> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends ExternalCourse> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public Page<ExternalCourse> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public <S extends ExternalCourse> S save(S entity) {
        final ExternalCourse course = entity;
        course.setId("0b9e5535-1ca6-4a96-8d5b-0b54ec92c78f");
        return entity;
    }

    @Override
    public ExternalCourse findOne(String s) {
        return null;
    }

    @Override
    public boolean exists(String s) {
        return false;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void delete(String s) {

    }

    @Override
    public void delete(ExternalCourse entity) {

    }

    @Override
    public void delete(Iterable<? extends ExternalCourse> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public <S extends ExternalCourse> S findOne(Example<S> example) {
        return null;
    }

    @Override
    public <S extends ExternalCourse> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends ExternalCourse> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends ExternalCourse> boolean exists(Example<S> example) {
        return false;
    }
}
