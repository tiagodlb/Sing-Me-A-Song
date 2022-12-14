context('Unit tests', () => {
  beforeEach(() => {
    cy.intercept("GET", "/top").as("getRecommendations");
    cy.visit('http://localhost:3000/top');
    cy.wait("@getRecommendations").then(interception => {
      cy.wrap(interception.response.statusCode).should('eq', 200)
    });
    cy.wait(1000);
  })

  it('Should upvote a recommendation', () => {
    cy.get('[data-cy="cy-score"]').first().invoke('text').then(parseInt).then((number) => {
      cy.intercept("POST", "/recommendations/22/upvote").as("upvote");
      cy.get('[data-cy="cy-upvote-btn"]').first().click({ force: true });
      cy.wait(1000);
      cy.wait("@upvote");
      cy.wait(1000);
      cy.get('[data-cy="cy-score"]').first().invoke('text').then(parseInt).then((newNumber) => {
        expect(newNumber).to.equal(number + 1)
      })
    })
  })

  it('Should downvote a recommendation', () => {
    cy.get('[data-cy="cy-score"]').first().invoke('text').then(parseInt).then((number) => {
      cy.intercept("POST", "/recommendations/22/downvote").as("downvote");
      cy.get('[data-cy="cy-downvote-btn"]').first().click({ force: true });
      cy.wait(1000);
      cy.wait("@downvote");
      cy.wait(1000);
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

  it('Should validate that there is only 10  recommendations', () => {
    cy.get('[data-cy="cy-score"]').invoke('text').then(parseInt).then(() => {
      cy.get('[data-cy="cy-upvote-btn"]').should("have.length.lte", 10);
    })
  })
})

context('Navigation menu tests', () => {
  beforeEach(() => {
    cy.intercept("GET", "/top").as("getRecommendations");
    cy.visit('http://localhost:3000/top');
    cy.wait("@getRecommendations").then(interception => {
      cy.wrap(interception.response.statusCode).should('eq', 200)
    });
    cy.wait(1000);
  })

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