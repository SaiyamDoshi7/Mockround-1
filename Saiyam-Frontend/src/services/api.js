import {
  users,
  departments,
  leaveTypes,
  leaveRequests
} from "../data/mockData";

const USERS_KEY = "leavepro_users";
const REQUESTS_KEY = "leavepro_requests";

function initializeStorage() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  if (!localStorage.getItem(REQUESTS_KEY)) {
    localStorage.setItem(
      REQUESTS_KEY,
      JSON.stringify(leaveRequests)
    );
  }
}

initializeStorage();

export const api = {
  login(email, password) {
    const storedUsers = JSON.parse(
      localStorage.getItem(USERS_KEY)
    );

    return storedUsers.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );
  },

  getUsers() {
    const storedUsers = JSON.parse(
      localStorage.getItem(USERS_KEY)
    );

    return storedUsers;
  },

  getEmployees() {
    return this.getUsers().filter(
      (user) => user.role === "employee"
    );
  },

  getDepartments() {
    return departments;
  },

  getLeaveTypes() {
    return leaveTypes;
  },

  getRequests() {
    return JSON.parse(
      localStorage.getItem(REQUESTS_KEY)
    );
  },

  getRequestById(id) {
    const requests = this.getRequests();

    return requests.find(
      (request) => Number(request.id) === Number(id)
    );
  },

  createRequest(request) {
    const requests = this.getRequests();

    const newRequest = {
      ...request,
      id: Date.now(),
      status: "Pending",
      approved_by: null,
      created_at: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString().split("T")[0]
    };

    requests.push(newRequest);

    localStorage.setItem(
      REQUESTS_KEY,
      JSON.stringify(requests)
    );

    return newRequest;
  },

  updateRequestStatus(id, status, managerId) {
    const requests = this.getRequests();

    const updatedRequests = requests.map((request) => {
      if (Number(request.id) === Number(id)) {
        return {
          ...request,
          status,
          approved_by:
            status === "Approved" ? managerId : null,
          updated_at: new Date()
            .toISOString()
            .split("T")[0]
        };
      }

      return request;
    });

    localStorage.setItem(
      REQUESTS_KEY,
      JSON.stringify(updatedRequests)
    );

    return updatedRequests.find(
      (request) => Number(request.id) === Number(id)
    );
  }
};
