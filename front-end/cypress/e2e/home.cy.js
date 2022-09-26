context('Populate tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it("Should create a new recommendation", () => {
    cy.get('[data-cy="cy-form-name"]').type('CyPress New Recommendation')
    cy.get('[data-cy="cy-form-youtubeLink"]').type('https://www.youtube.com/watch?v=c0y9SDiihBY')
    cy.get('[data-cy="cy-form-submit"]').click()

    cy.intercept("POST", "/recommendations").as("postSong");
    cy.wait(5000);

    cy.visit('http://localhost:3000');
    cy.get('[data-cy="cy-title"]').should('contain', "CyPress New Recommendation")
  })
})

context('Unit tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('Should upvote a recommendation', () => {
    cy.get('[data-cy="cy-score"]').first().invoke('text').then(parseInt).then((number) => {
      cy.get('[data-cy="cy-upvote-btn"]').first().click({force: true});
      cy.wait(5000);
      cy.get('[data-cy="cy-score"]').first().invoke('text').then(parseInt).then((newNumber) => {
        expect(newNumber).to.equal(number + 1)
      })
    })
  })

  it('Should downvote a recommendation', () => {
    cy.get('[data-cy="cy-score"]').first().invoke('text').then(parseInt).then((number) => {
      cy.get('[data-cy="cy-downvote-btn"]').first().click({force: true});
      cy.wait(5000);
      cy.get('[data-cy="cy-score"]').first().invoke('text').then(parseInt).then((newNumber) => {
        expect(newNumber).to.equal(number - 1)
      })
    })
  })

  it('should display youtube video', () => {
    cy.get('[data-cy="cy-videoplayer"]').first()
      .find('iframe')
      .should('have.attr', 'title', 'Gerudo Valley Remix | Super Smash Bros. Ultimate');
  });
})

context('Navigation menu tests', () => {
  it('Should navigate to home page', () => {
    cy.visit('http://localhost:3000/top');
    cy.get('[data-cy="cy-menu"]').click();
    cy.url().should('include', '/');
  });

  it('Should navigate to trending page', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="cy-trending-btn"]').click();
    cy.url().should('include', '/top');
  });

  it('Should navigate to a random recommendation', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="cy-shuffle-btn"]').click();
    cy.url().should('include', '/random');
  });
});