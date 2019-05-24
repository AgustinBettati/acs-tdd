describe('Register test', function() {
    it('should visit register page and register a course', function() {
        cy.visit('http://localhost:3000/course');

        cy.contains("Create course");

        cy.get('[id="course-name"]').type('Matematica');
        cy.get('[id="course-description"]').type('This is a description');
        cy.get('[id="course-platform"]').type('Platform');
        cy.get('[id="course-link"]').type('link.com');

        cy.contains("SAVE").click()
    })
})
