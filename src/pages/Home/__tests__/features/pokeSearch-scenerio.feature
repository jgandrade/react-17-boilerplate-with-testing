Feature: PokeList

    Scenario: User Navigate Home page
        Given User load search bar
        When I input Pokemon Name in search bar
        Then User will see input Pokemon Name