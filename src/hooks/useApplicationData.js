import React, { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const selectedDay = state.days.find((day) => state.day === day.name);

    const numberOfSpotsRemaining = selectedDay.appointments
      .map((id) => appointments[id].interview)
      .filter((interview) => interview === null).length;

    selectedDay.spots = numberOfSpotsRemaining;
    
    const updatedListOfDays = [...state.days].map((day) => {
      if (state.day === day.name) {
        return selectedDay;
      }
      return day;
    });
    
    try {
      return axios.put(`/api/appointments/${id}`, appointment).then((response) =>
        setState({
          ...state,
          appointments,
          days: updatedListOfDays,
        })
      ).catch(e => console.log(e));
    } catch {console.log("Error")};
  }

  function cancelInterview(id, interview) {
    const currentDay = state.days.find((day) => {
      if (state.day === day.name) {
        return true;
      }
    });
    const updatedDay = {
      ...currentDay,
      spots: currentDay.spots + 1,
    };

    const daysArray = [...state.days];
    const dayIndex = state.days.findIndex((day) => {
      if (state.day === day.name) {
        return true;
      }
    });
    daysArray[dayIndex] = updatedDay;

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() =>
      setState({
        ...state,
        appointments,
        days: daysArray,
      })
    );
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
