export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((dayElement) => day === dayElement.name);
  
  if (filteredDays) {
    let appointmentIds = filteredDays.appointments;
    let appointmentsForDay = appointmentIds.map((appointmentId) => {
      return state.appointments[appointmentId];
    });
    return appointmentsForDay;
  } else {
    return [];
  }
};

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find((dayElement) => day === dayElement.name);

  if (filteredDays) {
    let interviewerIds = filteredDays.interviewers;
    let interviewersForDay = interviewerIds.map((interviewerId) => {
      return state.interviewers[interviewerId];
    });
    return interviewersForDay;
  } else {
    return [];
  }
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  }
};

