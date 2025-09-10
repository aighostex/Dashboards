// Sample data - you would replace this with your actual data
export const rawData = [
  { lga: "BIRNIN GWARI", prePrimarySchools: 179, prePrimaryBoys: 4892, prePrimaryGirls: 4437, prePrimaryTotal: 9329, primarySchools: 179, primaryBoys: 73326, primaryGirls: 59070, primaryTotal: 132396 },
  { lga: "CHIKUN", prePrimarySchools: 257, prePrimaryBoys: 5830, prePrimaryGirls: 6066, prePrimaryTotal: 11896, primarySchools: 257, primaryBoys: 38088, primaryGirls: 40409, primaryTotal: 78497 },
  { lga: "GIMA", prePrimarySchools: 219, prePrimaryBoys: 7035, prePrimaryGirls: 7016, prePrimaryTotal: 14051, primarySchools: 219, primaryBoys: 55467, primaryGirls: 50773, primaryTotal: 106240 },
  { lga: "IGABI", prePrimarySchools: 278, prePrimaryBoys: 13917, prePrimaryGirls: 14036, prePrimaryTotal: 27953, primarySchools: 278, primaryBoys: 107924, primaryGirls: 105089, primaryTotal: 213013 },
  { lga: "IKARA", prePrimarySchools: 173, prePrimaryBoys: 2907, prePrimaryGirls: 2990, prePrimaryTotal: 5897, primarySchools: 173, primaryBoys: 37583, primaryGirls: 36285, primaryTotal: 73868 },
  { lga: "JABA", prePrimarySchools: 100, prePrimaryBoys: 5749, prePrimaryGirls: 5779, prePrimaryTotal: 11528, primarySchools: 100, primaryBoys: 19018, primaryGirls: 19803, primaryTotal: 38821 },
  { lga: "JEMAA", prePrimarySchools: 180, prePrimaryBoys: 3597, prePrimaryGirls: 3704, prePrimaryTotal: 7301, primarySchools: 180, primaryBoys: 17731, primaryGirls: 18157, primaryTotal: 35888 },
  { lga: "KACHIA", prePrimarySchools: 261, prePrimaryBoys: 2545, prePrimaryGirls: 2393, prePrimaryTotal: 4938, primarySchools: 261, primaryBoys: 31172, primaryGirls: 30886, primaryTotal: 62058 },
  { lga: "KADUNA NORTH", prePrimarySchools: 42, prePrimaryBoys: 4466, prePrimaryGirls: 4358, prePrimaryTotal: 8824, primarySchools: 42, primaryBoys: 16437, primaryGirls: 16296, primaryTotal: 32733 },
  { lga: "KADUNA SOUTH", prePrimarySchools: 36, prePrimaryBoys: 3707, prePrimaryGirls: 3449, prePrimaryTotal: 7156, primarySchools: 36, primaryBoys: 14207, primaryGirls: 14251, primaryTotal: 28458 },
  { lga: "KAGARKO", prePrimarySchools: 206, prePrimaryBoys: 3174, prePrimaryGirls: 3145, prePrimaryTotal: 6319, primarySchools: 206, primaryBoys: 24253, primaryGirls: 24537, primaryTotal: 48790 },
  { lga: "KAJURU", prePrimarySchools: 163, prePrimaryBoys: 3142, prePrimaryGirls: 3225, prePrimaryTotal: 6367, primarySchools: 163, primaryBoys: 16836, primaryGirls: 16735, primaryTotal: 33571 },
  { lga: "KAURA", prePrimarySchools: 105, prePrimaryBoys: 6559, prePrimaryGirls: 6766, prePrimaryTotal: 13325, primarySchools: 105, primaryBoys: 25733, primaryGirls: 28236, primaryTotal: 53969 },
  { lga: "KAURU", prePrimarySchools: 281, prePrimaryBoys: 1638, prePrimaryGirls: 1535, prePrimaryTotal: 3173, primarySchools: 281, primaryBoys: 41935, primaryGirls: 40356, primaryTotal: 82291 },
  { lga: "KUBAU", prePrimarySchools: 276, prePrimaryBoys: 5965, prePrimaryGirls: 5873, prePrimaryTotal: 11838, primarySchools: 276, primaryBoys: 53913, primaryGirls: 54553, primaryTotal: 108466 },
  { lga: "KUDAN", prePrimarySchools: 89, prePrimaryBoys: 5551, prePrimaryGirls: 5748, prePrimaryTotal: 11299, primarySchools: 89, primaryBoys: 34945, primaryGirls: 32181, primaryTotal: 67126 },
  { lga: "LERE", prePrimarySchools: 293, prePrimaryBoys: 3326, prePrimaryGirls: 3162, prePrimaryTotal: 6488, primarySchools: 293, primaryBoys: 53942, primaryGirls: 54837, primaryTotal: 108779 },
  { lga: "MAKARFI", prePrimarySchools: 129, prePrimaryBoys: 6197, prePrimaryGirls: 5960, prePrimaryTotal: 12157, primarySchools: 129, primaryBoys: 41612, primaryGirls: 40492, primaryTotal: 82104 },
  { lga: "SABON GARI", prePrimarySchools: 65, prePrimaryBoys: 6385, prePrimaryGirls: 6371, prePrimaryTotal: 12756, primarySchools: 65, primaryBoys: 27832, primaryGirls: 28848, primaryTotal: 56680 },
  { lga: "SANGA", prePrimarySchools: 192, prePrimaryBoys: 1864, prePrimaryGirls: 1754, prePrimaryTotal: 3618, primarySchools: 192, primaryBoys: 17726, primaryGirls: 17775, primaryTotal: 35501 },
  { lga: "SOBA", prePrimarySchools: 239, prePrimaryBoys: 5148, prePrimaryGirls: 4619, prePrimaryTotal: 9767, primarySchools: 239, primaryBoys: 42361, primaryGirls: 37826, primaryTotal: 80187 },
  { lga: "ZANGON KATAF", prePrimarySchools: 271, prePrimaryBoys: 5445, prePrimaryGirls: 5769, prePrimaryTotal: 11214, primarySchools: 271, primaryBoys: 39368, primaryGirls: 41462, primaryTotal: 80830 },
  { lga: "ZARIA", prePrimarySchools: 116, prePrimaryBoys: 7108, prePrimaryGirls: 7444, prePrimaryTotal: 14552, primarySchools: 116, primaryBoys: 54946, primaryGirls: 55687, primaryTotal: 110633 },
  { lga: "TOTAL", prePrimarySchools: 4150, prePrimaryBoys: 116147, prePrimaryGirls: 115599, prePrimaryTotal: 231746, primarySchools: 4150, primaryBoys: 886355, primaryGirls: 864544, primaryTotal: 1750899 }
];

// Color palette for charts
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];