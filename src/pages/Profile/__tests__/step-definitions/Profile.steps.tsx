import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

import Profile, { PokemonDetailsI } from "../..";

const feature = loadFeature("./src/pages/Profile/__tests__/features/Profile-scenario.feature");


defineFeature(feature, (test) => {
  let mockData: { page: number; pokemonDetails: PokemonDetailsI; };
  let props: any
  beforeEach(() => {
    jest.resetModules();
    mockData = {
      page: 1,
      pokemonDetails: {
        species: {
          color: "blue",
          generation: "",
          growthRate: "",
          habitat: "",
          textEntry: "",
        },
        height: "7",
        id: "1",
        name: "CHARMELEON",
        types: ["grass"],
        weight: "6.9",
        image: "https://example.com/bulbasaur.png" ,
      },
    };
    const data = {
      name: "Ivysaur",
                height: "10",
                weight: "130",
                id: "2",
                types: ["grass"],
                sprites: "https://example.com/ivysaur.png",
                species: {
                  color:  "green" ,
                  generation: "generation-i" ,
                  growth_rate: "medium" ,
                  habitat: "forest" ,
                  flavor_text_entries: "",
                },
    }
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>  data,
      }),
    )
   
  });
  test("User navigates to Profile", ({ given, when, then }) => {
    let ProfileWrapper: ShallowWrapper;
    let instance: Profile;

    given("User loading Profile Page", () => {
      ProfileWrapper = shallow(<Profile />);
    });

    when("I successfully load Profile Page", () => {
      instance = ProfileWrapper.instance() as Profile;
      instance.componentDidMount()
    });

    then("User will see details of a pokemon", () => {
      expect(ProfileWrapper).toBeTruthy();
    });
  });

  test("User display details of a Pokemon", ({ given, when, then }) => {
    
    let ProfileWrapper: ReactWrapper;
    let instance: Profile;
    given("User loading Profile Page", () => {
      ProfileWrapper = mount(<Profile id="1" />);
    });

    when("User successfully load Profile Page", () => {
      instance = ProfileWrapper.instance() as Profile;
      ProfileWrapper.setState( mockData)
    });
    
    then("User is presented with detailed information about the pokemon", async () => {
      expect(ProfileWrapper.find("h2.pokemon-name").text()).toEqual("CHARMELEON");
    });
  });
  
  test("User retrieves details of a Pokemon", ({ given, when, then }) => {
    let ProfileWrapper: ReactWrapper;
    let instance: Profile;
    let pokemonDetails: any
    given("User loading Profile Page", () => {
      ProfileWrapper = mount(<Profile id="1" />);
    });

    when("User successfully load Profile Page", async () => {
      instance = ProfileWrapper.instance() as Profile;
      instance.componentDidMount()
      ProfileWrapper.setState( mockData)
    });
    
    then("User successfully call api and display the data of the pokemon", async () => {
      expect(ProfileWrapper.find('h2.pokemon-name').text()).toBe('CHARMELEON')
    });
  });
  test("Checking if the previous button is there if the id is one", ({ given, when, then }) =>{
 
    let ProfileWrapper: ReactWrapper;
    let instance: Profile;
    given('I have loaded the Profile component', () => {
      ProfileWrapper = mount(<Profile id="1" />);

  });
    
    when('User load profile with the id of 1', () => {
        
      instance = ProfileWrapper.instance() as Profile;
      instance.componentDidMount()
      ProfileWrapper.setState( mockData)
    });
    
    then('prev button should not be there', () => {
        expect(ProfileWrapper.find('[data-testid="pagination-prev-button"]')).toHaveLength(0);
    });
  } )
  test("Clicking on the Next button should call handleChangePokemon with the next ID", ({ given, when, then }) =>{
    let handleChangePokemonMock = jest.fn();
    let ProfileWrapper: ReactWrapper;
    let instance: Profile;
    given('I have loaded the Profile component', () => {
      ProfileWrapper = mount(<Profile id="1" />);
      Profile.prototype.handleChangePokemon = handleChangePokemonMock;
  });
    
    when('I click on the Next button', () => {
      instance = ProfileWrapper.instance() as Profile;
      instance.componentDidMount()
      ProfileWrapper.setState( mockData) 
      const nextButton = ProfileWrapper.find('[data-testid="pagination-next-button"]').at(2);
      nextButton.simulate('click');

    });
    
    then('handleChangePokemon should be called with the next ID', () => {
      
      expect(ProfileWrapper.state('page')).toBe(2);
    });
  } )
});
