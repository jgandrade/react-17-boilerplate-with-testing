import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, RenderResult, waitFor, screen } from "@testing-library/react";
import Profile, { PokemonDetailsI } from "../..";
import { getPokemon } from "../../../../components";

const feature = loadFeature("./src/pages/Profile/__tests__/features/Profile-scenario.feature");
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    const mockPokemonSpecies = {
      name: "Ivysaurs", 
      height: 7, 
      weight: 11, 
      id: 1, 
      types: [{type: {name: "grass"}}], 
      sprites : {front_default: "https://raw.githubusercontent.com/PokeAPI/sprites"},
      color: "green", 
      generation: {name: "generation-i"}, 
      growth_rate: { name: "medium"},
      habitat: { name: "grassland"}, 
      flavor_text_entries: [{flavor_text: "Hi"}]
    }
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPokemonSpecies)
      })
    ) as any;
  });
  afterEach(() => {
    jest.restoreAllMocks();
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
  
  test("User retrieves details of a Pokemon", ({ given, when, then }) => {
    let ProfileWrapper: ReactWrapper;
    let instance: Profile;
    given("User loading Profile Page", () => {
      ProfileWrapper = mount(<Profile id="1" />);
    });

    when("User successfully load Profile Page", async () => {
      instance = ProfileWrapper.instance() as Profile;
      await instance.componentDidMount();
    });
    
    then("User successfully call api and display the data of the pokemon", async () => {
      expect(ProfileWrapper.find('h2.pokemon-name').text()).toBe('IVYSAURS')

    });
  });
  
  test("handles error if fetch fails", ({ given, when, then }) => {
    let ProfileWrapper: ReactWrapper;
    let instance: Profile;
    given("User loading Profile Page", () => {
      ProfileWrapper = mount(<Profile id="0" />);
      global.fetch = jest.fn().mockRejectedValueOnce(new Error('Failed to fetch')) as any;
    });

    when("User successfully load Profile Page", async () => {
      instance = ProfileWrapper.instance() as Profile;
      await instance.componentDidMount();
    });
    
    then("User failed to call api", async () => {
      expect(global.fetch).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon/0`);
      console.log({asd: ProfileWrapper.state('pokemonDetails')})
      expect(ProfileWrapper.state('pokemonDetails')).toStrictEqual({"height": "", "id": "", "image": "", "name": "", "species": {"color": "", "generation": "", "growthRate": "", "habitat": "", "textEntry": ""}, "types": [], "weight": ""});

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
      instance.setState({
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
      })
      instance.componentDidMount()
      const nextButton = ProfileWrapper.find('[data-testid="pagination-next-button"]').at(2);
      nextButton.simulate('click');

    });
    
    then('handleChangePokemon should be called with the next ID', () => {
      
      expect(ProfileWrapper.state('page')).toBe(2);
    });
  } )
});
