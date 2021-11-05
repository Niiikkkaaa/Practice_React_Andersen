import React from "react";
import PopUp from "../HW6/pages/PopUp";

const props = {
  setPopUp:() => jest.fn(),
}

describe('should render modal Delete', () => {
  let component;
  const mockFunction = jest.fn();
  
  beforeEach(() => {
    component = mount(
      <PopUp {...props} setPopUp={mockFunction}/>
    );
  });

  it('should Exit button render correcrly', () => {
    const buttonTest = component.find('.popup-btn-exit');
    expect(buttonTest.text()).toBe('Exit');
  });

  it('should delete button in Popup component render correcrly', () => {
    const buttonTest = component.find('.popup-btn-delete');
    expect(buttonTest.text()).toBe('Delete');
  });

  it('should exit button in Popup component work correctly', () => {
    component.find('.popup-btn-exit').simulate('click');
    expect(mockFunction.mock.calls).toHaveLength(1);
  });
});