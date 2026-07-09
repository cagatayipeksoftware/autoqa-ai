Feature: Product

  Background:
    Given user opens homepage

  Scenario: Open first product
    When user opens the first product
    Then product details page should be displayed

