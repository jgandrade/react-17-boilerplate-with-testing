import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import Card from "../../../../components/pokeCard";
import * as PokeApi from "../../../../services/pokeApi";

const feature = loadFeature("./src/pages/Home/__tests__/features/pokeCard-scenerio.feature");

defineFeature(feature, (test) => {

  beforeAll(() => {
    global.fetch = jest.fn();
    
    beforeEach(() => {
      jest.resetModules();
      jest.spyOn(PokeApi, 'getPokeDetails').mockResolvedValue({
        name: "Bulbasaur",
        id: "1",
        sprites: {
          front_default: "Bulbasaur.jpg"
        }
      });
    })
  }); 

  test("User Navigate Home page", ({ given, when, then }) => {
    let wrapper: ReactWrapper;
    let instance: Card;

    given("User loading Pokemon Details", () => {
      wrapper = mount(<Card pokeUrl={""} />);
    });

    when("I successfully load Pokemon Details", () => {
      instance = wrapper.instance() as Card;
      instance.componentDidMount();
    });

    then("User will see Details of the Pokemon", () => {
      expect(wrapper.state('pokeObject')).toHaveProperty("id");
    });
  });
});
