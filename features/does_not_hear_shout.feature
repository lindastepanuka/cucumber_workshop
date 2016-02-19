Feature: Does Hear Shout

  Stakeholders:
    Some companies that want to advertise
    People who want to share their thoughts
    But only with people near enough

  The typical users:
    Company - a shouter
    Mary - a shouter
    Ann - a listener

  Scenario: Company shouts and Ann does not hear because she is too far away
    Given Ann is within the system at position 0
    Given Company is within the system at position 20000
    When Company shouts "FREE BDD WORKSHOP FOR ALL"
    Then Ann should not hear "FREE BDD WORKSHOP FOR ALL"
