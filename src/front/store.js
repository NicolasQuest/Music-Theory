export const initialStore = () => {
  return {
    message: null,
    isAuthenticated: false,
    token: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login":
      return {
        ...store,
        isAuthenticated: true,
        token: action.payload,
      };

    default:
      return store;
  }
}
