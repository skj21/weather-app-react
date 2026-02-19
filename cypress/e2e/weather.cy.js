describe('Weather App E2E Tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('should display weather data for a valid city', () => {
    cy.get('input').type('Jaipur')
    cy.get('button').click()
    cy.contains('Jaipur').should('be.visible')
  })

  it('should show error for invalid city', () => {
    cy.get('input').type('InvalidCity123')
    cy.get('button').click()
    cy.contains('City not found').should('be.visible')
  })

  it('should not allow empty search', () => {
    cy.get('button').click()
    cy.contains('Please enter a city').should('be.visible')
  })

})
