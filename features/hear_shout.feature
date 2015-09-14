Feature: Hear Shout

  Stakeholders:
    Some companies that want to advertise
    People who want to share their thoughts

  The typical users:
    Company - a shouter
    Mary - a shouter
    Ann - a listener

  Background:
    Given Company and Ann are within system

  Scenario Outline: Company shouts and Ann hears
    And Company is at position <company_position> and Ann is in position <ann_position>
    When Company shouts "FREE BDD WORKSHOP FOR ALL"
    Then Ann should hear "FREE BDD WORKSHOP FOR ALL"

  Examples:
    |company_position|ann_position|
    |0|100|
    |0|1000|
    |-100|200|

  Scenario: Company shouts and Ann does not hear
    And Company and Ann are not in range of each other
    When Company shouts "FREE BDD WORKSHOP FOR ALL"
    Then Ann should not hear "FREE BDD WORKSHOP FOR ALL"
