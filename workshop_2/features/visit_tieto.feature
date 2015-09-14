Feature: Visiting Tieto Website
	As a Tieto Baltic Netowrking Conference attendee
	I want to test things
	Because testing is amazing and we all should be doing this

	Scenario: Visiting Tieto about us page
		Given I'm on http://www.tieto.com website
 		When I click link Looking for a job?
 		Then I should see Contact us link

  Scenario: Visiting Tieto careers page
    Given I'm on http://www.tieto.com website
    When I click link careers
    Then I should see Contact us link
