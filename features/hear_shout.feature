Feature: Hear Shout

  Stakeholders:
    Some companies that want to advertise
    People who want to share their thoughts

  The typical users:
    Company - a shouter
    Mary - a shouter
    Ann - a listener

  Background:
    Given Ann is within the system at position 100
    Given Company is within the system at position 200

  Scenario Outline: Company shouts and Ann hears
    When Company shouts "FREE BDD WORKSHOP FOR ALL"
    Then Ann should hear "FREE BDD WORKSHOP FOR ALL"

  Examples:
    |company_position|ann_position|
    |0|100|
    |0|1000|
    |-100|200|
