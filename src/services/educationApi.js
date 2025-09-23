import educationData from '../data/educationData.json';
import publicPreprimary from '../data/publicPreprimary.json';
import privatePreprimary from '../data/privatePreprimary.json';
import preprimaryComparison from '../data/preprimaryComparison.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get the appropriate dataset
const getDataset = (dataType) => {
  switch(dataType) {
    case 'prePrimary':
      return publicPreprimary;
    case 'privatePrePrimary':
      return privatePreprimary;
    case 'preprimaryComparison':
      return preprimaryComparison;
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
    
    // Handle different data structures
    if (dataType === 'preprimaryComparison') {
      const data = dataset.data.find(item => 
        item.lga.toLowerCase() === lga.toLowerCase()
      );
      
      if (!data) {
        throw new Error(`LGA "${lga}" not found in ${dataType} dataset`);
      }
      
      return data;
    } else {
      const data = dataset.data.find(item => 
        item.lga.toLowerCase() === lga.toLowerCase()
      );
      
      if (!data) {
        throw new Error(`LGA "${lga}" not found in ${dataType} dataset`);
      }
      
      return data;
    }
  },
  
  // Get summary statistics
  getSummary: async (dataType = 'education') => {
    await delay(200);
    const dataset = getDataset(dataType);
    
    if (dataType === 'preprimaryComparison') {
      return dataset.totals;
    }
    
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
    } else if (dataType === 'preprimaryComparison') {
      return dataset.data.map(item => ({
        lga: item.lga,
        public: item.public,
        private: item.private
      }));
    } else {
      return dataset.data.map(item => ({
        lga: item.lga,
        ...item.prePrimary
      }));
    }
  },

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
    
    if (dataType === 'preprimaryComparison') {
      const genderStats = {
        public: { boys: 0, girls: 0, total: 0 },
        private: { boys: 0, girls: 0, total: 0 },
        combined: { boys: 0, girls: 0, total: 0 }
      };
      
      dataset.data.forEach(item => {
        genderStats.public.boys += item.public.boys;
        genderStats.public.girls += item.public.girls;
        genderStats.public.total += item.public.pupils;
        
        genderStats.private.boys += item.private.boys;
        genderStats.private.girls += item.private.girls;
        genderStats.private.total += item.private.pupils;
      });
      
      genderStats.combined.boys = genderStats.public.boys + genderStats.private.boys;
      genderStats.combined.girls = genderStats.public.girls + genderStats.private.girls;
      genderStats.combined.total = genderStats.public.total + genderStats.private.total;
      
      return genderStats;
    } else {
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
    }
  },
  
  // Get top LGAs by enrollment
  getTopLgas: async (limit = 5, level = 'total', dataType = 'education') => {
    await delay(350);
    const dataset = getDataset(dataType);
    const validLevels = ['kindergarten_eccd', 'nursery', 'nursery_3', 'total'];
    
    if (!validLevels.includes(level)) {
      throw new Error(`Invalid level "${level}". Must be one of: ${validLevels.join(', ')}`);
    }
    
    if (dataType === 'preprimaryComparison') {
      // For comparison data, we'll return top LGAs by combined enrollment
      return dataset.data
        .map(item => ({
          lga: item.lga,
          public: item.public.pupils,
          private: item.private.pupils,
          combined: item.public.pupils + item.private.pupils
        }))
        .sort((a, b) => b.combined - a.combined)
        .slice(0, limit);
    } else {
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
    }
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
  },
  
  // NEW: Get public vs private comparison data
  getSectorComparison: async (lga = null) => {
    await delay(300);
    
    if (lga) {
      // Get data for a specific LGA
      const lgaData = preprimaryComparison.data.find(item => 
        item.lga.toLowerCase() === lga.toLowerCase()
      );
      
      if (!lgaData) {
        throw new Error(`LGA "${lga}" not found in comparison dataset`);
      }
      
      return lgaData;
    } else {
      // Get all comparison data
      return preprimaryComparison;
    }
  },
  
  // NEW: Get sector distribution (public vs private) across all LGAs
  getSectorDistribution: async () => {
    await delay(250);
    
    return {
      public: preprimaryComparison.totals.public,
      private: preprimaryComparison.totals.private,
      combined: preprimaryComparison.totals.combined
    };
  },
  
  // NEW: Get LGAs with highest private share
  getTopPrivateShare: async (limit = 5) => {
    await delay(350);
    
    return preprimaryComparison.data
      .map(item => {
        const totalPupils = item.public.pupils + item.private.pupils;
        const privateShare = totalPupils > 0 ? (item.private.pupils / totalPupils) * 100 : 0;
        
        return {
          lga: item.lga,
          public: item.public.pupils,
          private: item.private.pupils,
          total: totalPupils,
          privateShare: Math.round(privateShare * 10) / 10 // Round to 1 decimal place
        };
      })
      .sort((a, b) => b.privateShare - a.privateShare)
      .slice(0, limit);
  },
  
  // NEW: Get LGAs with highest public share
  getTopPublicShare: async (limit = 5) => {
    await delay(350);
    
    return preprimaryComparison.data
      .map(item => {
        const totalPupils = item.public.pupils + item.private.pupils;
        const publicShare = totalPupils > 0 ? (item.public.pupils / totalPupils) * 100 : 0;
        
        return {
          lga: item.lga,
          public: item.public.pupils,
          private: item.private.pupils,
          total: totalPupils,
          publicShare: Math.round(publicShare * 10) / 10 // Round to 1 decimal place
        };
      })
      .sort((a, b) => b.publicShare - a.publicShare)
      .slice(0, limit);
  }
};

export default educationApi;