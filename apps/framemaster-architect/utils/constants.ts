
export const LUMBER_DIMENSIONS: Record<string, { depth: number; thickness: number }> = {
  '2x4': { depth: 3.5, thickness: 1.5 },
  '2x6': { depth: 5.5, thickness: 1.5 },
  '2x8': { depth: 7.25, thickness: 1.5 },
  '2x10': { depth: 9.25, thickness: 1.5 },
  '2x12': { depth: 11.25, thickness: 1.5 },
  '4x8': { depth: 48, thickness: 0.5 }, // Sheathing (4x8 sheet, 1/2" thick)
};

export const COLORS = {
  wood: '#e8c39e',
  woodDark: '#cfa67a',
  pressureTreated: '#a8c6a0', // Greenish for bottom plates
  selected: '#60a5fa',
  sheathing: '#d4c5a9', // OSB color
};
