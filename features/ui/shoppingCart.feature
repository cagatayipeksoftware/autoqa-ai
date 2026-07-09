Feature: Shopping Cart

  Background:
    Given user opens homepage

  Scenario: User adds a product to the shopping cart

    When user opens the first product

    And user adds the product to the cart

    And user opens the cart

    Then the cart should contain products