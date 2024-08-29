import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

import ComponentView from "../../ComponentView";

const screenProps = {};

const feature = loadFeature(
  "./src/pages/BoilerplatePage/__tests__/features/ComponentView-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to ComponentView", ({ given, when, then }) => {
    let ComponentViewWrapper: ShallowWrapper;
    let instance: ComponentView;

    given("User loading ComponentView Page", () => {
      ComponentViewWrapper = shallow(<ComponentView {...screenProps} />);
    });

    when("User successfully loads ComponentView Page", () => {
      instance = ComponentViewWrapper.instance() as ComponentView;
    });

    then("User will see an increment button", () => {
      const button = ComponentViewWrapper.find('[data-test-id="btn-click"]');

      expect(button.text()).toBe("Increment Number");
    });

    when("User will click the increment button", () => {
      const button = ComponentViewWrapper.find('[data-test-id="btn-click"]');
      button.simulate("click");
    });

    then("User will see the new value after increment button click", () => {
      const value = ComponentViewWrapper.find('[data-test-id="value-text"]');

      expect(value.text()).toBe("1");
    });
  });
});
