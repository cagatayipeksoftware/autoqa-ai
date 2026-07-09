Feature: Accessibility Scan

  Background:
    Given user opens homepage

  Scenario: Homepage accessibility scan

    When accessibility scan is executed

    Then no critical accessibility violations should exist

    And serious accessibility violations should be reported