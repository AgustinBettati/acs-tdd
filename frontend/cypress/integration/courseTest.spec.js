describe('Course test', function () {

    describe('Home page', function () {
        it('should render all components', function () {
            cy.visit('/home');

            cy.contains("Home");
            cy.contains("Courses table");
            cy.contains("Name");
            cy.contains("Platform");
            cy.contains("Link");
            cy.contains("Add course");

        });
    });

    describe('When creating a course', function () {
        before(() => {
            cy.request('GET', 'http://localhost:4326/api/course/delete/all');
        });
        it('should register a course and go to home page', function () {
            cy.visit('/course');

            cy.contains("Create course");

            cy.get('[id="course-name"]').type('Matematica');
            cy.get('[id="course-description"]').type('This is a description');
            cy.get('[id="course-platform"]').type('Udemy');
            cy.get('[id="course-link"]').type('www.link.com');
            cy.get('[id="submit-button"]').click();

            cy.contains("Home")
        });

        it('should register a course with invalid link and show error', function () {
            cy.visit('/course');

            cy.contains("Create course");
            cy.get('[id="course-name"]').type('Matematica');
            cy.get('[id="course-description"]').type('This is a description');
            cy.get('[id="course-platform"]').type('Udemy');
            cy.get('[id="course-link"]').type('no es un link');
            cy.get('[id="submit-button"]').click();
            cy.url().should('include', '/course');

            cy.contains("Invalid link");
            cy.contains("Create course")
        });

        it('should register a course with invalid empty platform show error', function () {
            cy.visit('/course');

            cy.contains("Create course");
            cy.get('[id="course-name"]').type('Matematica');
            cy.get('[id="course-description"]').type('This is a description');
            cy.get('[id="course-link"]').type('www.link.com');
            cy.get('[id="submit-button"]').click();

            cy.url().should('include', '/course');

            cy.contains("Invalid platform");


            cy.contains("Create course")
        });

        it('should register a course with invalid empty description show error', function () {
            cy.visit('/course');

            cy.contains("Create course");
            cy.get('[id="course-name"]').type('Matematica');
            cy.get('[id="course-platform"]').type('Udemy');
            cy.get('[id="course-link"]').type('www.link.com');
            cy.get('[id="submit-button"]').click();

            cy.url().should('include', '/course');

            cy.contains("Invalid description");

            cy.contains("Create course")
        });

        it('should register a course with invalid empty name show error', function () {
            cy.visit('/course');

            cy.contains("Create course");
            cy.get('[id="course-description"]').type('This is a description');
            cy.get('[id="course-platform"]').type('Udemy');
            cy.get('[id="course-link"]').type('www.link.com');
            cy.get('[id="submit-button"]').click();

            cy.url().should('include', '/course');

            cy.contains("Invalid name");

            cy.contains("Create course")
        });
        after(() => {
            cy.request('GET', 'http://localhost:4326/api/course/delete/all')
        });
    });

    describe('When already created course', function () {
        before(() => {
            cy.request('GET', 'http://localhost:4326/api/course/delete/all');

            cy.visit('/course');

            cy.get('[id="course-name"]').type('Matematica');
            cy.get('[id="course-description"]').type('This is a description');
            cy.get('[id="course-platform"]').type('Udemy');
            cy.get('[id="course-link"]').type('https://github.com/AgustinBettati/acs-tdd/commits/master');
            cy.get('[id="submit-button"]').click();

        });
        it('should visit home page and show created course', function () {
            cy.visit('/home');

            cy.contains("Matematica");
            cy.contains("Udemy");
            cy.contains("https://github.com/AgustinBettati/acs-tdd/commits/master");
        });

        it('should visit home page and edit created course', function () {
            cy.visit('/home');
            cy.get('[data-cy="Matematica"]').click();
            cy.wait(200);
            cy.url().should('include', '/update');

            cy.contains("Edit course");
            const courseName = cy.get('[id="course-name"]').clear();
            courseName.type('Matematica Avanzada');
            const description = cy.get('[id="course-description"]').clear();
            description.type('This is a new description');
            const platform = cy.get('[id="course-platform"]').clear();
            platform.type('edX');
            const link = cy.get('[id="course-link"]').clear();
            link.type('https://drive.google.com/drive/u/1/my-drive');
            cy.wait(200);
            cy.get('[id="submit-button"]').click();

            cy.wait(200);
            cy.url().should('include', '/home');
            cy.contains('Matematica Avanzada');
            cy.contains('edX');
            cy.contains('https://drive.google.com/drive/u/1/my-drive');


        });

        after(() => {
            cy.request('GET', 'http://localhost:4326/api/course/delete/all')
        });
    });

    describe('When editing course', function () {
        before(() => {
            cy.request('GET', 'http://localhost:4326/api/course/delete/all');

            cy.visit('/course');

            cy.get('[id="course-name"]').type('Matematica');
            cy.get('[id="course-description"]').type('This is a description');
            cy.get('[id="course-platform"]').type('Udemy');
            cy.get('[id="course-link"]').type('https://github.com/AgustinBettati/acs-tdd/commits/master');
            cy.get('[id="submit-button"]').click();

        });
        it('should render components with values', function () {
            cy.visit('/home');
            cy.get('[data-cy="Matematica"]').click();
            cy.wait(200);

            cy.get('[id="course-name"]').invoke('val');
            cy.contains('This is a description');
            cy.contains("Udemy");
            cy.contains("https://github.com/AgustinBettati/acs-tdd/commits/master");
        });

        it('should fail when empty name', function () {
            cy.visit('/home');
            cy.get('[data-cy="Matematica"]').click();
            cy.wait(200);

            cy.contains("Edit course");
            cy.get('[id="course-name"]').clear();
            const description = cy.get('[id="course-description"]').clear();
            description.type('This is a new description');
            const platform = cy.get('[id="course-platform"]').clear();
            platform.type('Coursera');
            const link = cy.get('[id="course-link"]').clear();
            link.type('https://github.com/AgustinBettati/acs-tdd/commits/master');
            cy.wait(200);
            cy.get('[id="submit-button"]').click();

            cy.wait(200);
            cy.url().should('include', '/update');
            cy.contains('Invalid name');


        });

        it('should fail when empty description', function () {
            cy.visit('/home');
            cy.get('[data-cy="Matematica"]').click();
            cy.wait(200);

            cy.contains("Edit course");
            const description = cy.get('[id="course-description"]').clear();
            const platform = cy.get('[id="course-platform"]').clear();
            platform.type('Coursera');
            const link = cy.get('[id="course-link"]').clear();
            link.type('https://github.com/AgustinBettati/acs-tdd/commits/master');
            cy.wait(200);
            cy.get('[id="submit-button"]').click();

            cy.wait(200);
            cy.url().should('include', '/update');
            cy.contains('Invalid description');


        });

        it('should fail when empty platform', function () {
            cy.visit('/home');
            cy.get('[data-cy="Matematica"]').click();
            cy.wait(200);

            cy.contains("Edit course");
            const link = cy.get('[id="course-link"]').clear();
            link.type('https://github.com/AgustinBettati/acs-tdd/commits/master');
            cy.wait(200);
            cy.get('[id="submit-button"]').click();

            cy.wait(200);
            cy.url().should('include', '/update');
            cy.contains('Invalid platform');
        });


        it('should fail when invalid link', function () {
            cy.visit('/home');
            cy.get('[data-cy="Matematica"]').click();
            cy.wait(200);

            cy.contains("Edit course");
            const link = cy.get('[id="course-link"]').clear();
            link.type('no es un link');
            cy.wait(200);
            cy.get('[id="submit-button"]').click();

            cy.wait(200);
            cy.url().should('include', '/update');
            cy.contains('Invalid link');
        });
        after(() => {
            cy.request('GET', 'http://localhost:4326/api/course/delete/all')
        });
    })
});
