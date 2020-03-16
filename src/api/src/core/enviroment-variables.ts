export const getEnviromentVariables = () => {
  return {
    apiPort: process.env.API_PORT || 3000,
  };
};
