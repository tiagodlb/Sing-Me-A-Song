context('Populate tests', () => {
  beforeEach(() => {
    cy.intercept("GET", "/").as("getRecommendations");
    cy.visit('http://localhost:3000');
    cy.wait("@getRecommendations").then(interception => {
      cy.wrap(interception.response.statusCode).should('eq', 200)
    })
  })

  it("Should create a new recommendation", () => {
    cy.get('[data-cy="cy-form-name"]').type('CyPress New Recommendation')
    cy.get('[data-cy="cy-form-youtubeLink"]').type('https://www.youtube.com/watch?v=c0y9SDiihBY')
    cy.intercept("POST", "/recommendations").as("postRecommendation");
    cy.get('[data-cy="cy-form-submit"]').click()
    cy.wait("@postRecommendation").then(interception => {
      cy.wrap(interception.response.statusCode).should('eq', 201)
    })
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="cy-title"]').should('contain', "CyPress New Recommendation")
  })

  it("Should return a alert when create a repeated recommendation", () => {
    cy.get('[data-cy="cy-form-name"]').type('CyPress New Recommendation')
    cy.get('[data-cy="cy-form-youtubeLink"]').type('https://www.youtube.com/watch?v=c0y9SDiihBY')
    cy.intercept("POST", "/recommendations").as("postRecommendation");
    cy.get('[data-cy="cy-form-submit"]').click()
    cy.wait("@postRecommendation").then(interception => {
      cy.wrap(interception.response.statusCode).should('eq', 409)
    })
    cy.visit('http://localhost:3000');
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  })

  it("Should return a alert when create a new recommendation without name is submitted", () => {
    cy.get('[data-cy="cy-form-youtubeLink"]').type('https://www.youtube.com/watch?v=c0y9SDiihBY')
    cy.intercept("GET", "/").as("getRecommendations");
    cy.intercept("POST", "/recommendations").as("postRecommendation");
    cy.get('[data-cy="cy-form-submit"]').click()
    cy.wait("@postRecommendation").then(interception => {
      cy.wrap(interception.response.statusCode).should('eq', 422)
    })
    cy.visit('http://localhost:3000');
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  })

  it("Should return a alert when create a new recommendation without url is submitted", () => {
    cy.get('[data-cy="cy-form-name"]').type('CyPress New Recommendation')
    cy.intercept("GET", "/").as("getRecommendations");
    cy.intercept("POST", "/recommendations").as("postRecommendation");
    cy.get('[data-cy="cy-form-submit"]').click()
    cy.wait("@postRecommendation").then(interception => {
      cy.wrap(interception.response.statusCode).should('eq', 422)
    })
    cy.visit('http://localhost:3000');
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  })

  it("Should return a alert when create a new recommendation with invalid url is submitted", () => {
    cy.get('[data-cy="cy-form-name"]').type('CyPress New Recommendation')
    cy.get('[data-cy="cy-form-youtubeLink"]').type('https://www.notyoutube.com/')
    cy.intercept("GET", "/").as("getRecommendations");
    cy.intercept("POST", "/recommendations").as("postRecommendation");
    cy.get('[data-cy="cy-form-submit"]').click()
    cy.wait("@postRecommendation").then(interception => {
      cy.wrap(interception.response.statusCode).should('eq', 422)
    })
    cy.visit('http://localhost:3000');
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  })

  it('Should validate that there is only 10  recommendations', () => {
    cy.get('[data-cy="cy-score"]').invoke('text').then(parseInt).then(() => {
      cy.get('[data-cy="cy-upvote-btn"]').should("have.length.lte", 10);
    })
  })
})

context('Unit tests', () => {
  beforeEach(() => {
    cy.intercept("GET", "/").as("getRecommendations");
    cy.visit('http://localhost:3000');
    cy.wait("@getRecommendations").then(interception => {
      cy.wrap(interception.response.statusCode).should('eq', 200)
    })
    cy.wait(1000);
  })

  it('Should upvote a recommendation', () => {
    cy.get('[data-cy="cy-score"]').first().invoke('text').then(parseInt).then((number) => {
      cy.intercept("POST", "/recommendations/22/upvote").as("upvote");
      cy.get('[data-cy="cy-upvote-btn"]').first().click({ force: true });
      cy.wait("@upvote").then(interception => {
        cy.wrap(interception.response.statusCode).should('eq', 200)
      });
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
      cy.wait("@downvote").then(interception => {
        cy.wrap(interception.response.statusCode).should('eq', 200)
      });
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
})

context('Navigation menu tests', () => {
  beforeEach(() => {
    cy.intercept("GET", "/").as("getRecommendations");
    cy.visit('http://localhost:3000');
    cy.wait("@getRecommendations").then(interception => {
      cy.wrap(interception.response.statusCode).should('eq', 200)
    })
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