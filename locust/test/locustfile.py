from locust import HttpLocust, TaskSet, task
import json


class UserBehavior(TaskSet):
    @task(1)
    def create_course(self):
        headers = {'content-type': 'application/json'}
        self.client.post("/courses", data=json.dumps({
            "name": "Java for starters",
            "description": "Java basics: O.O.P.",
            "platform": "Java"
        }),
         headers=headers,
         name="Create a new course")


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
