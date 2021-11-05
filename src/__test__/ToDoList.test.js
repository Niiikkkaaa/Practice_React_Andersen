import React from "react";
import TodoList from "../HW6/pages/TodoList";
import { useState as useStateMock } from 'react';
import { fireEvent } from "@testing-library/dom";

describe('should render Form component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <TodoList />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display error', () => {
    const myComponent = component.find('.error');
    expect(myComponent.text()).toBe(''); 
  });

  it('should textArea change correctly', () => {
    const textArea = component.find('.textarea');
    const event = { target: { value: 'test' } };
    expect(textArea.simulate('change', event));
  });

  it('should textArea text change correctly', () => {
    const textArea = component.find('.textarea');
    const event = { target: { value: 'test' } };
    expect(textArea.simulate('change', event));
    expect(textArea.instance().value).toBe('test')
  });

  it('should render button', () => {
    const button = component.find('.btn-submit');
    expect(button.text()).toBe('Add');
  });

  it('should submit function work correctly', () => {
    const testButton = component.find('.btn-submit');
    testButton.hostNodes().simulate('click');
    const myComponent = component.find('.error');
    expect(myComponent.text()).toBe('Field is empty. Enter your task!'); 
  });
});