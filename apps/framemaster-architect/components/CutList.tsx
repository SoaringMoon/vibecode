import React, { useMemo, useState, useEffect } from 'react';
import { LumberPart, CutListItem } from '../types';
import { generatePurchaseList, StockOrder } from '../utils/optimization';
import { ClipboardList, Download, DollarSign, Settings2, ChevronDown, ChevronUp, ShoppingCart, Scissors, Layers } from 'lucide-react';

interface CutListProps {
  parts: LumberPart[];
  onSelect: (ids: string[]) => void;
  selectedIds: string[];
  priceSettings: Record<string, number>;
  onUpdatePrices: (prices: Record<string, number>) => void;
}

const CutList: React.FC<CutListProps> = ({ parts, onSelect, selectedIds, priceSettings, onUpdatePrices }) => {
  const [showCosts, setShowCosts] = useState(false);
  const [showPriceSettings, setShowPriceSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'purchase' | 'cut'>('purchase');

  // Ensure all current nominal sizes have a price entry
  useEffect(() => {
    const sizes = new Set(parts.map(p => p.nominalSize));
    let changed = false;
    const next = { ...priceSettings };
    
    sizes.forEach((s: string) => {
        if (next[s] === undefined) {
            next[s] = 1.00; // Default fallback
            changed = true;
        }
    });
    
    if (changed) {
        onUpdatePrices(next);
    }
  }, [parts, priceSettings, onUpdatePrices]);

  // --- Logic for Cut List ---
  const cutList = useMemo(() => {
    const map = new Map<string, CutListItem>();

    parts.forEach((part) => {
      // Find length dimension
      const length = Math.max(...part.actualDimensions);
      // Round length to nearest 1/8th for display
      const lengthRounded = Math.round(length * 8) / 8;
      
      const key = `${part.name}-${part.nominalSize}-${lengthRounded}`;

      if (map.has(key)) {
        const item = map.get(key)!;
        item.count += 1;
        item.ids.push(part.id);
      } else {
        map.set(key, {
          name: part.name,
          nominalSize: part.nominalSize,
          length: lengthRounded,
          count: 1,
          ids: [part.id],
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => b.length - a.length);
  }, [parts]);

  // --- Logic for Purchase List ---
  const purchaseList = useMemo(() => {
      return generatePurchaseList(parts);
  }, [parts]);

  // --- Cost Calculations ---

  const calculateBF = (nominalSize: string, lengthIn: number) => {
      // If it's a sheet good, return 1 (unit multiplier) instead of BF
      if (nominalSize === '4x8') return 1;

      const dims = nominalSize.split('x').map(Number);
      if (dims.length !== 2 || isNaN(dims[0]) || isNaN(dims[1])) return 0;
      const nomW = dims[0];
      const nomD = dims[1];
      const lenFt = lengthIn / 12;
      return (nomW * nomD * lenFt) / 12;
  };

  const totalCutListCost = useMemo(() => {
    return cutList.reduce((acc, item) => {
        const itemBF = calculateBF(item.nominalSize, item.length);
        const pricePerBF = priceSettings[item.nominalSize] || 0;
        return acc + (itemBF * item.count * pricePerBF);
    }, 0);
  }, [cutList, priceSettings]);

  const totalPurchaseCost = useMemo(() => {
    return purchaseList.reduce((acc, item) => {
        const itemBF = calculateBF(item.nominalSize, item.lengthFt * 12);
        const pricePerBF = priceSettings[item.nominalSize] || 0;
        return acc + (itemBF * item.count * pricePerBF);
    }, 0);
  }, [purchaseList, priceSettings]);

  const displayCost = activeTab === 'purchase' ? totalPurchaseCost : totalCutListCost;

  const isSelected = (itemIds: string[]) => {
      if (selectedIds.length === 0) return false;
      return itemIds.length === selectedIds.length && itemIds[0] === selectedIds[0];
  };

  const handlePriceChange = (size: string, val: string) => {
      const num = parseFloat(val);
      if (!isNaN(num) && num >= 0) {
          onUpdatePrices({ ...priceSettings, [size]: num });
      }
  };

  const exportCSV = () => {
      let content = "";
      if (activeTab === 'purchase') {
          const header = showCosts ? 'Type,Size,Length(ft),Qty,Cost($)' : 'Type,Size,Length(ft),Qty';
          const rows = purchaseList.map(i => {
             const typeStr = i.type === 'stud' ? 'Pre-cut Stud' : (i.type === 'sheet' ? 'Sheet' : 'Lumber');
             const basic = `${typeStr},${i.nominalSize},${i.lengthFt},${i.count}`;
             if (showCosts) {
                 const bf = calculateBF(i.nominalSize, i.lengthFt * 12);
                 const cost = bf * i.count * (priceSettings[i.nominalSize] || 0);
                 return `${basic},${cost.toFixed(2)}`;
             }
             return basic;
          }).join('\n');
          content = `${header}\n${rows}`;
      } else {
          const header = showCosts ? 'Name,Size,Length(in),Qty,Cost($)' : 'Name,Size,Length(in),Qty';
          const rows = cutList.map(i => {
              const basic = `"${i.name}",${i.nominalSize},${i.length},${i.count}`;
              if (showCosts) {
                  const bf = calculateBF(i.nominalSize, i.length);
                  const cost = bf * i.count * (priceSettings[i.nominalSize] || 0);
                  return `${basic},${cost.toFixed(2)}`;
              }
              return basic;
          }).join('\n');
          content = `${header}\n${rows}`;
      }

      const blob = new Blob([content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = activeTab === 'purchase' ? 'framemaster_purchase_list.csv' : 'framemaster_cut_list.csv';
      a.click();
  };

  return (
    <div className="bg-neutral-900 flex flex-col h-full overflow-hidden text-neutral-300">
      
      {/* Header & Tabs */}
      <div className="flex-none z-20 shadow-sm">
          <div className="flex border-b border-neutral-800 bg-neutral-900">
            <button 
                onClick={() => setActiveTab('purchase')}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border-b-2 ${activeTab === 'purchase' ? 'bg-neutral-900 text-blue-500 border-blue-600' : 'text-neutral-500 border-transparent hover:text-neutral-300'}`}
            >
                <ShoppingCart className="w-3.5 h-3.5" /> Purchase
            </button>
            <button 
                onClick={() => setActiveTab('cut')}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border-b-2 ${activeTab === 'cut' ? 'bg-neutral-900 text-blue-500 border-blue-600' : 'text-neutral-500 border-transparent hover:text-neutral-300'}`}
            >
                <Scissors className="w-3.5 h-3.5" /> Cut List
            </button>
          </div>

          <div className="p-4 border-b border-neutral-800 bg-neutral-950 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-xs font-bold text-neutral-200 uppercase tracking-wide">
                        {activeTab === 'purchase' ? 'Stock Order' : 'Cut Parts'}
                    </h2>
                </div>
                
                <button 
                    onClick={() => { setShowCosts(!showCosts); if(!showCosts) setShowPriceSettings(true); }}
                    className={`flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-1 rounded-sm border transition-colors ${showCosts ? 'bg-green-900/20 text-green-400 border-green-800/50' : 'bg-neutral-900 text-neutral-500 border-neutral-700 hover:border-neutral-500'}`}
                >
                    <DollarSign className="w-3 h-3" />
                    {showCosts ? 'Hide Costs' : 'Est. Cost'}
                </button>
            </div>

            {showCosts && (
                <div className="bg-green-950/20 border border-green-900/30 rounded p-3">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-green-500 font-semibold uppercase tracking-wider">Total Project Cost</span>
                        <span className="text-xl font-bold text-green-400 font-mono">${displayCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    {activeTab === 'purchase' ? (
                        <div className="text-[10px] text-green-500/60 text-right">Includes waste optimization</div>
                    ) : (
                        <div className="text-[10px] text-amber-500/60 text-right font-medium">Theoretical Minimum (No Waste)</div>
                    )}
                    
                    <button 
                        onClick={() => setShowPriceSettings(!showPriceSettings)}
                        className="w-full flex items-center justify-center gap-1 mt-2 py-1.5 bg-green-900/20 hover:bg-green-900/30 text-green-500 rounded-sm text-[10px] font-medium transition-colors border border-green-800/20"
                    >
                        <Settings2 className="w-3 h-3" />
                        {showPriceSettings ? 'Hide Unit Prices' : 'Configure Unit Prices'}
                        {showPriceSettings ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>}
                    </button>
                </div>
            )}
            
            {showCosts && showPriceSettings && (
                <div className="grid grid-cols-2 gap-2 bg-neutral-900 p-2 rounded border border-neutral-800 text-xs shadow-sm max-h-32 overflow-y-auto custom-scrollbar">
                    {Object.entries(priceSettings).filter(([size]) => parts.some(p => p.nominalSize === size)).map(([size, price]) => (
                        <div key={size} className="flex items-center justify-between bg-neutral-950 p-1.5 rounded border border-neutral-800">
                            <span className="font-semibold text-neutral-400">{size}</span>
                            <div className="flex items-center gap-1">
                                <span className="text-neutral-600">$</span>
                                <input 
                                    type="number" 
                                    value={price} 
                                    onChange={(e) => handlePriceChange(size, e.target.value)}
                                    step={0.05}
                                    className="w-14 text-right p-0.5 bg-neutral-900 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-blue-600"
                                />
                                <span className="text-[9px] text-neutral-600">{size === '4x8' ? '/Sht' : '/BF'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
      </div>
      
      {/* Content Area */}
      <div className="overflow-auto flex-1 min-h-0 bg-neutral-900">
        {activeTab === 'purchase' ? (
            <table className="w-full text-left text-xs relative border-collapse">
                <thead className="bg-neutral-950 text-neutral-500 font-semibold sticky top-0 z-10 uppercase tracking-wide">
                    <tr>
                    <th className="p-3 border-b border-neutral-800 font-bold">Item</th>
                    <th className="p-3 border-b border-neutral-800 font-bold">Size</th>
                    <th className="p-3 border-b border-neutral-800 font-bold">Length</th>
                    <th className="p-3 border-b border-neutral-800 font-bold text-right">Qty</th>
                    {showCosts && <th className="p-3 border-b border-neutral-800 text-right w-20">Est.</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                    {purchaseList.map((item) => {
                         const bf = calculateBF(item.nominalSize, item.lengthFt * 12);
                         const cost = bf * item.count * (priceSettings[item.nominalSize] || 0);
                         
                         let icon = <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>;
                         let label = "Stock Lumber";
                         
                         if (item.type === 'stud') {
                             icon = <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>;
                             label = "Pre-cut Stud";
                         } else if (item.type === 'sheet') {
                             icon = <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>;
                             label = "Sheathing";
                         }
                         
                         return (
                             <tr key={item.id} className="hover:bg-neutral-800/50 transition-colors group">
                                 <td className="p-3 font-medium text-neutral-300">
                                     <span className="inline-flex items-center gap-2">
                                         {icon}
                                         {label}
                                     </span>
                                 </td>
                                 <td className="p-3 text-neutral-500">{item.nominalSize}</td>
                                 <td className="p-3 text-neutral-400 font-mono">
                                     {item.type === 'stud' ? (item.lengthFt * 12).toFixed(3) + '"' : item.lengthFt + "'"}
                                 </td>
                                 <td className="p-3 text-right font-bold text-neutral-200 font-mono">{item.count}</td>
                                 {showCosts && (
                                     <td className="p-3 text-right font-mono text-xs text-green-500 bg-green-900/5">
                                         ${cost.toFixed(2)}
                                     </td>
                                 )}
                             </tr>
                         );
                    })}
                </tbody>
            </table>
        ) : (
            <table className="w-full text-left text-xs relative border-collapse">
                <thead className="bg-neutral-950 text-neutral-500 font-semibold sticky top-0 z-10 uppercase tracking-wide">
                    <tr>
                    <th className="p-3 border-b border-neutral-800 font-bold">Type</th>
                    <th className="p-3 border-b border-neutral-800 font-bold">Size</th>
                    <th className="p-3 border-b border-neutral-800 font-bold">Length</th>
                    <th className="p-3 border-b border-neutral-800 font-bold text-right">Qty</th>
                    {showCosts && <th className="p-3 border-b border-neutral-800 text-right w-20">Est.</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                    {cutList.map((item, idx) => {
                    const selected = isSelected(item.ids);
                    const bf = calculateBF(item.nominalSize, item.length);
                    const cost = bf * item.count * (priceSettings[item.nominalSize] || 0);

                    return (
                        <tr 
                            key={idx} 
                            onClick={() => onSelect(selected ? [] : item.ids)}
                            className={`cursor-pointer transition-colors ${selected ? 'bg-blue-900/30 hover:bg-blue-900/40' : 'hover:bg-neutral-800/50'}`}
                        >
                            <td className="p-3 font-medium text-neutral-300 truncate max-w-[120px]" title={item.name}>{item.name}</td>
                            <td className="p-3 text-neutral-500 whitespace-nowrap">{item.nominalSize}</td>
                            <td className="p-3 text-neutral-400 font-mono whitespace-nowrap">
                                {Math.floor(item.length / 12)}'{ (item.length % 12).toFixed(2) }''
                            </td>
                            <td className="p-3 text-right font-bold text-neutral-200 font-mono">{item.count}</td>
                            {showCosts && (
                                <td className="p-3 text-right font-mono text-xs text-green-500 bg-green-900/5">
                                    ${cost.toFixed(2)}
                                </td>
                            )}
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        )}
      </div>
      
      <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex-none z-20">
          <button 
            className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 p-2 rounded-sm transition-all text-xs font-medium uppercase tracking-wide border border-neutral-700 hover:border-neutral-600"
            onClick={exportCSV}
          >
              <Download className="w-3.5 h-3.5" /> 
              Export CSV
          </button>
      </div>
    </div>
  );
};

export default CutList;