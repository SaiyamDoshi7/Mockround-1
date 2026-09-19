export function calculateDays(startDate, endDate, halfDay = false) {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < start) {
    return 0;
  }

  const difference =
    end.getTime() - start.getTime();

  const days =
    Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ) + 1;

  return halfDay ? 0.5 : days;
}

export function getUsedDays(
  requests,
  employeeId,
  leaveTypeId
) {
  return requests
    .filter(
      (request) =>
        Number(request.employee_id) === Number(employeeId) &&
        Number(request.leave_type_id) === Number(leaveTypeId) &&
        request.status === "Approved"
    )
    .reduce(
      (total, request) =>
        total + Number(request.total_days),
      0
    );
}

export function getLeaveBalance(
  requests,
  employeeId,
  leaveTypes
) {
  return leaveTypes.map((type) => {
    const used = getUsedDays(
      requests,
      employeeId,
      type.id
    );

    return {
      ...type,
      used,
      remaining: Math.max(
        type.annual_limit - used,
        0
      )
    };
  });
}

export function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );
}