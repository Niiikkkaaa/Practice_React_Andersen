import React from "react";
import ModalDelete from "../HW6/pages/ModalDelete";

const props = {
  setModalDelete:() => jest.fn(),
}

describe('should render modal Delete', () => {
  let component;
  const mockFunction = jest.fn();
  
  beforeEach(() => {
    component = mount(
      <ModalDelete {...props} setModalDelete={mockFunction}/>
    );
  });

  it('should exit button render correctly', () => {
    const buttonTest = component.find('.btn-exit-modal');
    expect(buttonTest.text()).toBe('No');
  });

  it('should submit button render correctly', () => {
    const buttonTest = component.find('.btn-delete-item');
    expect(buttonTest.text()).toBe('Yes');
  });

  it('should exit button work correctly', () => {
    component.find('.btn-exit-modal').simulate('click');
    expect(mockFunction.mock.calls).toHaveLength(1);
  });

  it('should submit button work correctly', () => {
    component.find('.btn-delete-item').simulate('click');
    expect(mockFunction.mock.calls).toHaveLength(1);
  });
});