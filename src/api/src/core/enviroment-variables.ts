export const getEnviromentVariables = () => {
  return {
    apiPort: process.env.API_PORT || 3000,
    mongoConnection: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/companyManagementDemo',
  };
};
