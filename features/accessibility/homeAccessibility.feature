Feature: Accessibility Scan

  Scenario Outline: Accessibility scan

    Given user opens "<page>"

    When accessibility scan is executed

    Then no critical accessibility violations should exist

    And serious accessibility violations should be reported

    Examples:
      | page    |
      | home    |
      | product |
      | cart    |
      | login   |