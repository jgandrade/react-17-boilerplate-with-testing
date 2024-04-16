Feature: Home

    Scenario: User navigates to Home
        Given User loading Home Page
        When I successfully load Home Page
        Then User will see Home Page

    Scenario: User changes navigation
        Given User loading Home Page
        When the user changes the page
        Then the page number should update accordingly
    
    Scenario: Home Page display pokemon
        Given User loading Home Page
        When User successfully load Home Page
        Then User will see Pokemon data