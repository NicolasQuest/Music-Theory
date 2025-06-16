export const initialStore = () => {
  return {
    message: null,
    isAuthenticated: false,
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("username") || null,
    email: localStorage.getItem("email") || null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login":
      return {
        ...store,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        email: action.payload.email,
      };

    case "logout":
      return {
        ...store,
        isAuthenticated: null,
        token: null,
        user: null,
        email: null,
      };
    default:
      return store;
  }
}
