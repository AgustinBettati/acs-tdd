describe('Register test', function() {
    it('should visit register page and register a course', function() {
        cy.visit('http://localhost:3000/course');

        cy.contains("Create course");

        cy.get('[id="course-name"]').type('Matematica');
        cy.get('[id="course-description"]').type('This is a description');
        cy.get('[id="course-platform"]').type('Platform');
        cy.get('[id="course-link"]').type('www.link.com');

        cy.contains("SAVE").click()
    });

    it('should visit update page and bring all the respective info', function() {
        cy.visit('http://localhost:3000/update');

        cy.contains("Edit course");

        cy.get('[id="course-name"]').should('be.empty');
        cy.get('[id="course-description"]').should('be.empty');
        cy.get('[id="course-platform"]').should('be.empty');
        cy.get('[id="course-link"]').should('be.empty');
        const id = cy.get('[id="course-id"]');
        id.should('be.empty');
        id.type('1');

        cy.wait(500);
        cy.get('[id="course-name"]').should('not.have.value', '');
        cy.get('[id="course-description"]').should('not.have.value', '');
        cy.get('[id="course-platform"]').should('not.have.value' , '');
        cy.get('[id="course-link"]').should('not.have.value' , '');


        cy.contains("DELETE");
        cy.contains("SAVE").click()
    })
});
