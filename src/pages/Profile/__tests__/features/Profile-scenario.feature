Feature: Profile

    Scenario: User navigates to Profile
        Given User loading Profile Page
        When I successfully load Profile Page
        Then User will see details of a pokemon
    
    Scenario: User display details of a Pokemon
        Given User loading Profile Page
        When User successfully load Profile Page
        Then User is presented with detailed information about the pokemon

    Scenario: User retrieves details of a Pokemon
        Given User loading Profile Page
        When User successfully load Profile Page
        Then User successfully call api and display the data of the pokemon
    
    Scenario: Checking if the previous button is there if the id is one
        Given I have loaded the Profile component
        When User load profile with the id of 1
        Then prev button should not be there
        
    Scenario: Clicking on the Next button should call handleChangePokemon with the next ID
        Given I have loaded the Profile component
        When I click on the Next button
        Then handleChangePokemon should be called with the next ID
