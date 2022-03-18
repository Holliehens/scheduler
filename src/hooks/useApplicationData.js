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
      axios.get("api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      //
    });
  }, []);

  /* day.spots = spots 
  calculate spots:
  
  if  (state.days.day.appointments === null)
    return day.spots
  
   subtract one from that day's spots
   set new spots number
   update current state value


  */

  function bookInterview(id, interview) {
    //grab current day
    const currentDay = state.days.find((day) => {
      if (state.day === day.name) {
        return true;
      }
    });
    const updatedDay = {
      ...currentDay,
      spots: currentDay.spots - 1,
    };

    const daysArray = [...state.days];
    const dayIndex = state.days.findIndex((day) => {
      // Only need findIndex //
      if (state.day === day.name) {
        return true;
      }
    });
    daysArray[dayIndex] = updatedDay;
    console.log("DAYSARRAY:", daysArray);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((response) =>
      setState({
        ...state,
        appointments,
        days: daysArray,
      })
    );
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
    console.log("CURRENT DAY:", currentDay);
    console.log("UPDATED DAY:", updatedDay);

    const daysArray = [...state.days];
    const dayIndex = state.days.findIndex((day) => {
      if (state.day === day.name) {
        return true;
      }
    });
    daysArray[dayIndex] = updatedDay;
    console.log("DAYSARRAY:", daysArray);

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
