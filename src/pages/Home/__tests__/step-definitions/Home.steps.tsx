import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import Home from "../..";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mockFetch } from "../../../../utils";
const feature = loadFeature("./src/pages/Home/__tests__/features/Home-scenario.feature");
import { getPokemons } from "../../../../components";

defineFeature(feature, (test) => {
  beforeAll(() => {
    global.fetch = jest.fn();
    
  beforeEach(() => {
    jest.resetModules();
    jest.mock('../../../../components/get-pokemons', () => ({
      fetchAllPokemon: jest.fn((page) => Promise.resolve({
        pokemonData: [
          { id: 1, name: 'Bulbasaur', image: 'bulbasaur.png', types: ['Grass', 'Poison'], url: 'bulbasaur-url' },
          { id: 2, name: 'Charmander', image: 'charmander.png', types: ['Fire'], url: 'charmander-url' },
        ],
        pokemonCount: 2,
        pokemonNextPage: null
      }))
    }));
  })
  });

  test("User navigates to Home", ({ given, when, then }) => {
    let HomeWrapper: ShallowWrapper;
    let instance: Home;

    given("User loading Home Page", () => {
      HomeWrapper = shallow(<Home />);
    });

    when("I successfully load Home Page", async() => {
      instance = HomeWrapper.instance() as Home;
      // const spyDidMount = jest.spyOn(Home.prototype, "componentDidMount");
      // const mockApi = jest.fn().mockImplementation(() => {
      //   return Promise.resolve({
      //     status: 200,
      //     json: () => {
      //     return Promise.resolve([{
      //        name: "manas",
      //        id: 1
      //      }]);
      //    }
      //   });
      // });
      // await instance.componentDidMount()
    });

    then("User will see Home Page", () => {
      expect(HomeWrapper.find("h1.pokemonTitle").text()).toContain("Pokedex");
    });
  
  });

  test("User changes navigation", async ({ given, when, then }) => {
    let HomeWrapper: ShallowWrapper<Home>;
    let instance: Home;
  
    given("User loading Home Page", async () => {
      HomeWrapper = shallow(<Home />);
    });
  
    when("the user changes the page", async () => {
      instance = HomeWrapper.instance() as Home;
      instance.handleChangePage("2"); // Simulate click on page 2
      await new Promise(resolve => setTimeout(resolve, 0));
    });
  
    then("the page number should update accordingly", () => {
      expect(instance.state.page).toBe(2); 
    });
  });
  test("Home Page display pokemon", ({ given, when, then }) => {
    let HomeWrapper: ReactWrapper
    let instance: Home;
  
    given("User loading Home Page", () => {
      HomeWrapper = mount(<Home />);
    });
  
    when("User successfully load Home Page",  () => {
      instance = HomeWrapper.instance() as Home;
      instance.componentDidMount();
    });
    then("User will see Pokemon data", () => {
      expect(HomeWrapper.find('[data-testid="pokemon-list"]').children()).toHaveLength(2);
    
    });
  });
});
