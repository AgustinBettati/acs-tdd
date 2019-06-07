describe('Register test', function() {
    it('register a course and go to home page', function() {
        cy.visit('http://localhost:3000/course');

        cy.contains("Create course");

        cy.get('[id="course-name"]').type('Matematica');
        cy.get('[id="course-description"]').type('This is a description');
        cy.get('[id="course-platform"]').type('una plataforma');
        cy.get('[id="course-link"]').type('https://link.com');
        cy.get('[id="submit-button"]').click();

        cy.contains("Home")
    });

    it('register a course with invalid link and show error', function() {
        cy.visit('http://localhost:3000/course');

        cy.contains("Create course");
        cy.get('[id="course-name"]').type('Matematica');
        cy.get('[id="course-description"]').type('This is a description');
        cy.get('[id="course-platform"]').type('una plataforma');
        cy.get('[id="course-link"]').type('no es un link');
        cy.get('[id="submit-button"]').click();

        cy.contains("Create course")
    });

    it('should visit home page and show created course', function() {
        cy.visit('http://localhost:3000/home');

        cy.contains("Matematica");
        cy.contains("una plataforma");
    })

    //TODO hacer test para el edit
});
