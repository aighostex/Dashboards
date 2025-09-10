export const processData = (rawData) => {
  return rawData.map(item => ({
    lga: item.lga,
    prePrimary: {
      schools: item.prePrimarySchools,
      boys: item.prePrimaryBoys,
      girls: item.prePrimaryGirls,
      total: item.prePrimaryTotal
    },
    primary: {
      schools: item.primarySchools,
      boys: item.primaryBoys,
      girls: item.primaryGirls,
      total: item.primaryTotal
    }
  }));
};