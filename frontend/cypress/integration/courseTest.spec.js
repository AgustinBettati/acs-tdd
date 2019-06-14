describe('course test', function () {

    describe('Register test', function () {
        it('register a course and go to home page', function () {
            cy.visit('/course');

            cy.contains("Create course");

            cy.get('[id="course-name"]').type('Matematica');
            cy.get('[id="course-description"]').type('This is a description');
            cy.get('[id="course-platform"]').type('Platform');
            cy.get('[id="course-link"]').type('www.link.com');
            cy.get('[id="submit-button"]').click();

            cy.contains("Home")
        });

        it('register a course with invalid link and show error', function () {
            cy.visit('/course');

            cy.contains("Create course");
            cy.get('[id="course-name"]').type('Matematica');
            cy.get('[id="course-description"]').type('This is a description');
            cy.get('[id="course-platform"]').type('Platform');
            cy.get('[id="course-link"]').type('no es un link');
            cy.get('[id="submit-button"]').click();

            cy.contains("Create course")
        });
        after(()=> { cy.request('GET', 'http://localhost:4326/api/course/delete/all')});
    });
    describe('Already created course test', function () {
        before(() => {
            cy.request('GET', 'http://localhost:4326/api/course/delete/all');

            cy.visit('/course');

            cy.get('[id="course-name"]').type('Matematica');
            cy.get('[id="course-description"]').type('This is a description');
            cy.get('[id="course-platform"]').type('Platform');
            cy.get('[id="course-link"]').type('www.link.com');
            cy.get('[id="submit-button"]').click();

        });
        it('should visit home page and show created course', function () {
            cy.visit('http://localhost:3000/home');

            cy.contains("Matematica");
            cy.contains("Platform");
        });

        it('should visit home page and edit created course', function () {
            cy.visit('http://localhost:3000/home');
            cy.get('[data-cy="Matematica"]').click();
            cy.wait(200);
            cy.url().should('include', '/update');

            cy.contains("Edit course");
            const id = cy.get('[id="course-name"]');
            id.type('Matematica Avanzada');
            const description = cy.get('[id="course-description"]');
            description.type('This is a new description description');
            cy.get('[id="course-platform"]').type('new platform');
            cy.get('[id="course-link"]').type('www.newLink.com');
            cy.get('[id="submit-button"]').click();

            cy.wait(200);
            cy.url().should('include', '/home');
            cy.contains('Matematica Avanzada');
            cy.contains('This is a new description description');
            cy.contains('new platform');
            cy.contains('www.newLink.com');


        });

        after(() => {
            cy.request('GET', 'http://localhost:4326/api/course/delete/all')
        });
    })    //TODO hacer test para el edit
});
