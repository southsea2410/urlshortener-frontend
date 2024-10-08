export const baseBackendUrl = import.meta.env.VITE_BACKEND_GATEWAY;
const apis = {
  shortenUrl: {
    create: "/shorten",
    get: "/urls/mine",
    getAll: "/urls/all",
  },
};

export default apis;
