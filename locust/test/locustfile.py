import json
import uuid

from locust import HttpLocust, TaskSet, task, seq_task


class CreateAndGetCourse(TaskSet):
    course_ids = []

    @task
    @seq_task(0)
    def create_course(self):
        response = self.client.post(
            url="/api/course",
            data=json.dumps({
                "name": "aws course #" + str(uuid.uuid4()),
                "description": "good random course",
                "platform": "youtube",
                "link": "http://www.aws.com"
            }),
            headers={'content-type': 'application/json'})
        self.course_ids.append(response.text)

    @task
    @seq_task(1)
    def get_courses(self):
        print(self.course_ids)
        if self.course_ids:
            course_id = self.course_ids.pop(0)
            self.client.get(
                url="/api/course/" + course_id,
                name="/api/course/[id]")


class GetCourses(TaskSet):
    @task
    def get_courses(self):
        self.client.get(url="/api/course")


class UserTaskSet(TaskSet):
    tasks = {CreateAndGetCourse: 1, GetCourses: 25}  # 25x times more get courses than create and get


class WebsiteUser(HttpLocust):
    task_set = UserTaskSet
    min_wait = 1000  # cada usuario espera entre 1 y 2 segundos antes de hacer un nuevo request
    max_wait = 2000
