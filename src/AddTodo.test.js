import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Math Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "Math Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getAllByText(/Math Test/i);
  expect(check.length).toEqual(1);
 });


 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });


 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Math Test"}});
  fireEvent.click(element);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Math Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask1 = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate1 = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask1, { target: { value: "Math Test"}});
  fireEvent.change(inputDate1, { target: { value: "05/30/2023"}});
  fireEvent.click(element);
  
  const inputTask2 = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate2 = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputTask2, { target: { value: "Crochet"}});
  fireEvent.change(inputDate2, { target: { value: "06/01/2022"}});
  fireEvent.click(element);

  const task1 = screen.getByTestId(/Math Test/i).style.background;
  const task2 = screen.getByTestId(/Crochet/i).style.background;
  expect(task1 != task2).toBe(true);
 });

 test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(("5/30/2023"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
 });
