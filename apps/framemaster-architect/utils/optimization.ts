
import { LumberPart } from '../types';

export interface StockOrder {
  id: string; // Unique ID for keying
  nominalSize: string;
  lengthFt: number;
  count: number;
  type: 'stud' | 'lumber' | 'sheet'; // 'stud' = pre-cut, 'lumber' = linear stock, 'sheet' = panel
  costPerItem?: number;
}

const KERF = 0.125; // 1/8 inch saw blade kerf
const STOCK_LENGTHS = [8, 10, 12, 14, 16, 20]; // Available stock lengths in feet
const PRECUT_STUDS = {
    '2x4': [92.625, 104.625], // 92-5/8" (8' wall), 104-5/8" (9' wall)
    '2x6': [92.625, 104.625]
};

// Helper to get length from part
const getPartLength = (part: LumberPart): number => {
    return Math.max(...part.actualDimensions);
};

export const generatePurchaseList = (parts: LumberPart[]): StockOrder[] => {
    const orders: StockOrder[] = [];
    
    // Group parts by Nominal Size
    const partsBySize: Record<string, LumberPart[]> = {};
    parts.forEach(p => {
        if (!partsBySize[p.nominalSize]) partsBySize[p.nominalSize] = [];
        partsBySize[p.nominalSize].push(p);
    });

    Object.entries(partsBySize).forEach(([size, sizeParts]) => {
        // Handle Sheathing (4x8)
        if (size === '4x8') {
            orders.push({
                id: `sheet-4x8`,
                nominalSize: '4x8',
                lengthFt: 8, // Standard 8' length representation
                count: sizeParts.length,
                type: 'sheet'
            });
            return;
        }

        // 1. Filter out Pre-cut Studs
        // If a part is a "stud" type (King, Common, Jack) and matches a standard pre-cut length within tolerance, 
        // buy it as a pre-cut stud.
        
        const linearParts: number[] = [];
        const precutCounts: Record<number, number> = {};

        sizeParts.forEach(p => {
            const len = getPartLength(p);
            let matchedPrecut = false;

            // Check if it's a stud-like part
            if (p.name.includes('Stud')) {
                 const standardLengths = PRECUT_STUDS[size as keyof typeof PRECUT_STUDS] || [];
                 for (const stdLen of standardLengths) {
                     if (Math.abs(len - stdLen) < 0.25) { // 1/4 inch tolerance
                         precutCounts[stdLen] = (precutCounts[stdLen] || 0) + 1;
                         matchedPrecut = true;
                         break;
                     }
                 }
            }

            if (!matchedPrecut) {
                linearParts.push(len);
            }
        });

        // Add Pre-cut orders
        Object.entries(precutCounts).forEach(([len, count]) => {
            orders.push({
                id: `${size}-stud-${len}`,
                nominalSize: size,
                lengthFt: parseFloat(len) / 12, // Approximate ft for display/pricing
                count,
                type: 'stud'
            });
        });

        // 2. Optimize Linear Parts (Bin Packing)
        // Sort descending
        linearParts.sort((a, b) => b - a);

        const bins: { capacity: number; remaining: number; parts: number[] }[] = [];

        linearParts.forEach(partLen => {
            // Find best fit bin
            let bestBinIndex = -1;
            let minRemainder = Number.MAX_VALUE;

            for (let i = 0; i < bins.length; i++) {
                if (bins[i].remaining >= partLen) {
                    const rem = bins[i].remaining - partLen;
                    if (rem < minRemainder) {
                        minRemainder = rem;
                        bestBinIndex = i;
                    }
                }
            }

            if (bestBinIndex !== -1) {
                // Add to existing bin
                bins[bestBinIndex].parts.push(partLen);
                bins[bestBinIndex].remaining -= (partLen + KERF);
            } else {
                // Create new bin
                
                let chosenLength = 16 * 12; // Default to 16'
                
                // If part is very long, find stock that fits
                if (partLen > (16 * 12)) {
                    const fit = STOCK_LENGTHS.find(sl => (sl * 12) >= partLen);
                    chosenLength = fit ? fit * 12 : 20 * 12; // Cap at 20 or fit
                } else {
                    chosenLength = 16 * 12;
                }

                bins.push({
                    capacity: chosenLength,
                    remaining: chosenLength - partLen - KERF,
                    parts: [partLen]
                });
            }
        });

        // Consolidate bins into orders
        const binCounts: Record<number, number> = {};
        bins.forEach(b => {
             const lenFt = b.capacity / 12;
             binCounts[lenFt] = (binCounts[lenFt] || 0) + 1;
        });

        Object.entries(binCounts).forEach(([len, count]) => {
             orders.push({
                id: `${size}-lumber-${len}`,
                nominalSize: size,
                lengthFt: parseFloat(len),
                count,
                type: 'lumber'
            });
        });
    });

    // Sort orders for display
    return orders.sort((a, b) => {
        if (a.nominalSize !== b.nominalSize) return a.nominalSize.localeCompare(b.nominalSize);
        if (a.type !== b.type) return a.type === 'stud' ? -1 : 1;
        return b.lengthFt - a.lengthFt;
    });
};
