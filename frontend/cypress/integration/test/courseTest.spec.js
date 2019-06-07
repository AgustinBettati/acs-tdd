describe('Register test', function() {
    it('register a course and go to home page', function() {
        cy.visit('http://localhost:4326/course');

        cy.contains("Create course");

        cy.get('[id="course-name"]').type('Matematica');
        cy.get('[id="course-description"]').type('This is a description');
        cy.get('[id="course-platform"]').type('Platform');
        cy.get('[id="course-link"]').type('www.link.com');
        cy.get('[id="submit-button"]').click();

        cy.contains("Home")
    });

    it('register a course with invalid link and show error', function() {
        cy.visit('http://localhost:4326/course');

        cy.contains("Create course");
        cy.get('[id="course-name"]').type('Matematica');
        cy.get('[id="course-description"]').type('This is a description');
        cy.get('[id="course-platform"]').type('Platform');
        cy.get('[id="course-link"]').type('no es un link');
        cy.get('[id="submit-button"]').click();

        cy.contains("Create course")
    });

    it('should visit update page and bring all the respective info', function() {
        cy.visit('http://localhost:4326/update');

        cy.contains("Edit course");

        cy.get('[id="course-name"]').should('be.empty');
        cy.get('[id="course-description"]').should('be.empty');
        cy.get('[id="course-platform"]').should('be.empty');
        cy.get('[id="course-link"]').should('be.empty');
        const id = cy.get('[id="course-id"]');
        id.should('be.empty');
        id.type('1');

        cy.wait(500);
        const courseName = cy.get('[id="course-name"]').should('not.have.value', '');
        cy.get('[id="course-description"]').should('not.have.value', '');
        cy.get('[id="course-platform"]').should('not.have.value' , '');
        cy.get('[id="course-link"]').should('not.have.value' , '');

        courseName.type('NUEVONOMBRE');
        cy.contains("DELETE");
        cy.contains("SAVE").click();

        cy.url().should('include', '/home');

        cy.contains('NUEVONOMBRE')




    })
});