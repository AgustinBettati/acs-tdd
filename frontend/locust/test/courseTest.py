# locustfile.py
from locust import HttpLocust, TaskSet


def createCourse(l):
    l.client.post("/course", {"name": "curso", "platform": "facebook", "link": "www.facebook.com"})


def index(l):
    l.client.get("/")


def updateCourse(l):
    l.client.put("/update", {"name": "nuevo nombre", "platform": "nueva plataforma", "link": "www.nuevolink.com"})


class CourseBehavior(TaskSet):
    def on_start(self):
        createCourse(self)

    def on_update(self):
        updateCourse(self)


class WebsiteUser(HttpLocust):
    task_set = CourseBehavior
    min_wait = 2000
    max_wait = 4000
