import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import List from "../../../../components/pokeList";
import * as PokeApi from "../../../../services/pokeApi";

const feature = loadFeature("./src/pages/Home/__tests__/features/pokeList-scenerio.feature");

defineFeature(feature, (test) => {

  beforeAll(() => {
    global.fetch = jest.fn();
    
    beforeEach(() => {
      jest.resetModules();
      jest.spyOn(PokeApi, 'getPokeList').mockResolvedValue({
        results: [
          { name: 'Bulbasaur', url: 'url'},
          { name: 'Pikachu', url: 'url'},
        ]
      });
    })
  }); 

  test("User Navigate Home page", ({ given, when, then }) => {
    let wrapper: ReactWrapper;
    let instance: List;

    given("User loading Pokemon List", () => {
      wrapper = mount(<List pokeSearch={""} />);
    });

    when("I successfully load Pokemon List", () => {
      instance = wrapper.instance() as List;
      instance.componentDidMount();
    });

    then("User will see List of Pokemons", () => {
      expect(wrapper.state('pokeList')).not.toHaveLength(0)
    });
  });
});
