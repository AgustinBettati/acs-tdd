export const baseUrl = 'http://localhost:9000';

// @ts-ignore
export const createCourse = (course: ICourse): Promise<Response> => {
    const url = baseUrl + '/course';
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
    };

    return fetch(url, init);
};

// @ts-ignore
export const updateCourse = (course: ICourse): Promise<Response> => {
    const url = `${baseUrl}/course/${course.id}`;
    const init: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
    };

    return fetch(url, init);
};