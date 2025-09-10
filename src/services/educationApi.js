import educationData from '../data/educationData.json';
import publicPreprimary from '../data/publicPreprimary.json';
import privatePreprimary from '../data/privatePreprimary.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get the appropriate dataset
const getDataset = (dataType) => {
  switch(dataType) {
    case 'prePrimary':
      return publicPreprimary;
    case 'privatePrePrimary':
      return privatePreprimary;
    case 'education':
    default:
      return educationData;
  }
};

// Mock API service
export const educationApi = {
  // Get all education data
  getAll: async (dataType = 'education') => {
    await delay(700);
    return getDataset(dataType);
  },
  
  // Get data by LGA
  getByLga: async (lga, dataType = 'education') => {
    await delay(300);
    const dataset = getDataset(dataType);
    const data = dataset.data.find(item => 
      item.lga.toLowerCase() === lga.toLowerCase()
    );
    
    if (!data) {
      throw new Error(`LGA "${lga}" not found in ${dataType} dataset`);
    }
    
    return data;
  },
  
  // Get summary statistics
  getSummary: async (dataType = 'education') => {
    await delay(200);
    const dataset = getDataset(dataType);
    return dataset.totals;
  },
  
  // Get metadata
  getMetadata: async (dataType = 'education') => {
    await delay(100);
    const dataset = getDataset(dataType);
    return dataset.metadata;
  },
  
  // Search LGAs
  search: async (query, dataType = 'education') => {
    await delay(400);
    const dataset = getDataset(dataType);
    const results = dataset.data.filter(item =>
      item.lga.toLowerCase().includes(query.toLowerCase())
    );
    
    return results;
  },
  
  // Get pre-primary data only
  getPrePrimary: async (dataType = 'education') => {
    await delay(300);
    const dataset = getDataset(dataType);
    
    // Handle different data structures
    if (dataType === 'prePrimary') {
      return dataset.data.map(item => ({
        lga: item.lga,
        ...item.prePrimary
      }));
    } else {
      return dataset.data.map(item => ({
        lga: item.lga,
        ...item.prePrimary
      }));
    }
  },

  // getPrivatePrePrimary: async () => {
  //   await delay(300);
  //   return privatePreprimary.data.map(item => ({
  //     lga: item.lga,
  //     ...item.prePrimary
  //   }));
  // },
  
  // Get primary data only (only available in education dataset)
  getPrimary: async () => {
    await delay(300);
    // Primary data is only available in the education dataset
    return educationData.data.map(item => ({
      lga: item.lga,
      ...item.primary
    }));
  },
  
  // Get level-specific data (e.g., kindergarten, nursery, etc.)
  getByLevel: async (level, dataType = 'education') => {
    await delay(300);
    const dataset = getDataset(dataType);
    const validLevels = ['kindergarten_eccd', 'nursery', 'nursery_3', 'total'];
    
    if (!validLevels.includes(level)) {
      throw new Error(`Invalid level "${level}". Must be one of: ${validLevels.join(', ')}`);
    }
    
    return dataset.data.map(item => ({
      lga: item.lga,
      [level]: dataType === 'prePrimary' ? item.prePrimary[level] : item.prePrimary[level]
    }));
  },
  
  // Get gender statistics across all LGAs
  getGenderStats: async (dataType = 'education') => {
    await delay(250);
    const dataset = getDataset(dataType);
    const genderStats = {
      boys: 0,
      girls: 0,
      total: 0
    };
    
    dataset.data.forEach(item => {
      const prePrimaryData = dataType === 'prePrimary' ? item.prePrimary : item.prePrimary;
      genderStats.boys += prePrimaryData.total.boys;
      genderStats.girls += prePrimaryData.total.girls;
      genderStats.total += prePrimaryData.total.total;
    });
    
    return genderStats;
  },
  
  // Get top LGAs by enrollment
  getTopLgas: async (limit = 5, level = 'total', dataType = 'education') => {
    await delay(350);
    const dataset = getDataset(dataType);
    const validLevels = ['kindergarten_eccd', 'nursery', 'nursery_3', 'total'];
    
    if (!validLevels.includes(level)) {
      throw new Error(`Invalid level "${level}". Must be one of: ${validLevels.join(', ')}`);
    }
    
    return dataset.data
      .map(item => {
        const prePrimaryData = dataType === 'prePrimary' ? item.prePrimary : item.prePrimary;
        return {
          lga: item.lga,
          total: prePrimaryData[level].total,
          boys: prePrimaryData[level].boys,
          girls: prePrimaryData[level].girls
        };
      })
      .sort((a, b) => b.total - a.total)
      .slice(0, limit);
  },
  
  // Compare datasets (useful for seeing differences between education and prePrimary data)
  compareDatasets: async () => {
    await delay(500);
    
    const comparison = {
      educationLgaCount: educationData.data.length,
      prePrimaryLgaCount: publicPreprimary.data.length,
      educationTotal: educationData.totals.total.total,
      prePrimaryTotal: publicPreprimary.totals.total.total,
      matchingLgas: []
    };
    
    // Find matching LGAs between datasets
    educationData.data.forEach(eduItem => {
      const prePrimaryItem = publicPreprimary.data.find(ppItem => 
        ppItem.lga.toLowerCase() === eduItem.lga.toLowerCase()
      );
      
      if (prePrimaryItem) {
        comparison.matchingLgas.push(eduItem.lga);
      }
    });
    
    return comparison;
  }
};

export default educationApi;