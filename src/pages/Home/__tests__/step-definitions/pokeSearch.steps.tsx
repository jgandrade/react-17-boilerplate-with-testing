import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import SearchBar from "../../../../components/pokeSearchBar";

const feature = loadFeature("./src/pages/Home/__tests__/features/pokeSearch-scenerio.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  })

  test("User Navigate Home page", ({ given, when, then }) => {
    let wrapper: ReactWrapper;
    let instance: SearchBar;

    given("User load search bar", () => {
      wrapper = mount(<SearchBar setPokeSearch={() => {}} />);
    });

    when("I input Pokemon Name in search bar", () => {
      instance = wrapper.instance() as SearchBar;
      wrapper.setState({'pokeSearch': 'Bulbasaur'})
    });

    then("User will see input Pokemon Name", () => {
      expect(wrapper.state('pokeSearch')).toEqual("Bulbasaur");
    });
  });
});
