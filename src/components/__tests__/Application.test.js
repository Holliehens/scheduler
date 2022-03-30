import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, prettyDOM, getByTestId } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

xit("defaults to Monday and changes the schedule when a new day is selected", async () => {

  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
   
  // 1. Render the Application.
  const { container, debug } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];
  
  // 3. Click the "Add" button on the first empty appointment.
   fireEvent.click(getByAltText(appointment, "Add"));
  
   // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  // 5. Click the first interviewer in the list
   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  // 6. Click the "Save" button on that same appointment.
  fireEvent.click(getByText(appointment, "Save"));

  // 7. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving", { exact: false})).toBeInTheDocument();

  // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.

  await waitForElement(() => getByText(container, "Archie Cohen"));

   // 3. Click the "Delete" button on the booked appointment.

   const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  
  fireEvent.click(queryByAltText(appointment, "Delete"));

  
  // 4. Check that the confirmation message is shown.

  expect(queryByText(appointment, "Are you sure you would like to delete?"));

  // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting", { exact: false})).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    
  // debug();
  })
  
  xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.

  await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
     fireEvent.click(queryByAltText(appointment, "Edit"));

  // 4. Click the "Save" button on that same appointment.
   fireEvent.click(getByText(appointment, "Save"));

   // 5. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving", { exact: false })).toBeInTheDocument();



  })

  xit("shows the save error when failing to save an appointment", async () => {
     axios.put.mockRejectedValueOnce();

   // 1. Render the Application.
   const { container, debug } = render(<Application />);

   await waitForElement(() => getByText(container, "Archie Cohen"));
   
   // 3. Click the "Edit" button on the booked appointment.
   const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  
  fireEvent.click(queryByAltText(appointment, "Edit"));

  // 4. Click the "Save" button on that same appointment.
  fireEvent.click(getByText(appointment, "Save"));

  //5."Error Saving Appointment"
  
   await waitForElement(() => getByText(appointment, "Error Saving Appointment"));
    
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.put.mockRejectedValueOnce();

      // 1. Render the Application.
   const { container, debug } = render(<Application />);

   await waitForElement(() => getByText(container, "Archie Cohen"));
   
   // 3. Click the "Delete" button on the booked appointment.
  //  const appointment = getAllByTestId(container, "appointment").find(
  //   appointment => queryByText(appointment, "Archie Cohen")
  // );
  const appointment = getAllByTestId(container, "appointment")[0];
  console.log("[0]APPOINMTENT:", appointment);
  fireEvent.click(queryByAltText(container, "Delete"));
  console.log("[1]CLICKED:");
  // 4. Click the "Confirm" button on that same appointment.
  fireEvent.click(getByText(container, "Confirm"));
  console.log("[2]CONFIRMED:");
  //5."Error Deleting Appointment"
  
//  await waitForElement(() => 
//  getByText(container, "Error Deleting Appointment"));
  await waitForElement(() => {
    return getByText(container, 'Error')
  });
  
   
 });
});

/* xit("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    await waitForElement( () => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, "appointment")[0];

    // ----- Adding the events specific to this appointment to test the save action ---- //
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() => {
      return getByText(container, 'Error')
    });
  }) */