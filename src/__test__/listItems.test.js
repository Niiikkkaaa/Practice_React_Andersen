import React from "react";
import { shallowEqual } from "react-redux";
import ListItems from "../HW6/pages/ListItems"

describe('should render Post component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <ListItems />
    );
  });

  it('should render list', () => {
    expect( toJson(component)).toMatchSnapshot()
  });

  it ('should contain .list-items-section wrapper', () => {
    const wrapper = component.find('.list-items-section');
    expect(wrapper.length).toBe(1);
  });
  
  it ('should render nav tag', () => {
    const wrapper = component.find('nav');
    expect(wrapper.length).toBe(1);
  });
  
});
