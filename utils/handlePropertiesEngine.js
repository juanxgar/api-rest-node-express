const ENGINE_DB = process.env.ENGINE_DB;
const getProperties = () => {
  const data = {
    nosql: {
      id: "_id",
    },
    postgresql: {
      id: "id",
    },
  };
  return data[ENGINE_DB];
};

module.exports = getProperties;
