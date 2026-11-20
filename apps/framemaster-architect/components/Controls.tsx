
import React, { useState } from 'react';
import { RoomConfig, Opening } from '../types';
import { Settings, Ruler, Box, ArrowUpFromLine, DoorOpen, Plus, Trash2, Home, Move, ChevronLeft, ChevronRight, Lock, Triangle } from 'lucide-react';

interface ControlsProps {
  rooms: RoomConfig[];
  activeRoomId: string;
  onUpdateRoom: (updatedRoom: RoomConfig) => void;
  onAddRoom: () => void;
  onRemoveRoom: (id: string) => void;
  onSelectRoom: (id: string) => void;
  selectedWallIndex: 0 | 1 | 2 | 3;
  onSelectWall: (index: 0 | 1 | 2 | 3) => void;
}

const Controls: React.FC<ControlsProps> = ({ 
    rooms, 
    activeRoomId, 
    onUpdateRoom, 
    onAddRoom, 
    onRemoveRoom,
    onSelectRoom,
    selectedWallIndex, 
    onSelectWall 
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'openings'>('general');

  const activeRoom = rooms.find(r => r.id === activeRoomId);

  if (!activeRoom) {
      return <div className="p-4 text-neutral-500">No room selected</div>;
  }

  const handleChange = (key: keyof RoomConfig, value: any) => {
    onUpdateRoom({ ...activeRoom, [key]: value });
  };
  
  const handlePositionChange = (axis: 'x' | 'z', value: number) => {
      onUpdateRoom({
          ...activeRoom,
          position: { ...activeRoom.position, [axis]: value }
      });
  };

  const getWallGlobalBounds = (room: RoomConfig, wallIndex: number) => {
      const x = room.position.x * 12;
      const z = room.position.z * 12;
      const w = room.width * 12;
      const l = room.length * 12;
      
      switch(wallIndex) {
          case 0: return { axis: 'x', constVal: z, start: x, end: x + w };
          case 1: return { axis: 'x', constVal: z + l, start: x, end: x + w };
          case 2: return { axis: 'z', constVal: x, start: z, end: z + l };
          case 3: return { axis: 'z', constVal: x + w, start: z, end: z + l };
      }
      return { axis: 'x', constVal: 0, start: 0, end: 0 };
  };

  const getAdjacentOpenings = (targetWallIdx: number): Opening[] => {
      const projected: Opening[] = [];
      const myBounds = getWallGlobalBounds(activeRoom, targetWallIdx);
      
      rooms.forEach(otherRoom => {
          if (otherRoom.id === activeRoom.id) return;
          
          [0, 1, 2, 3].forEach(otherWallIdx => {
              const otherBounds = getWallGlobalBounds(otherRoom, otherWallIdx);
              
              if (myBounds.axis !== otherBounds.axis) return;
              if (Math.abs(myBounds.constVal - otherBounds.constVal) > 1.0) return;
              
              const startMax = Math.max(myBounds.start, otherBounds.start);
              const endMin = Math.min(myBounds.end, otherBounds.end);
              
              if (endMin > startMax) {
                  const otherDoors = otherRoom.openings.filter(o => o.wallIndex === otherWallIdx && o.type === 'door');
                  
                  otherDoors.forEach(d => {
                      const dGlobalCenter = otherBounds.start + (d.centerOffset * 12);
                      const localCenterIn = dGlobalCenter - myBounds.start;
                      const localCenterFt = localCenterIn / 12;
                      
                      if (localCenterIn > 0 && localCenterIn < (myBounds.end - myBounds.start)) {
                          projected.push({
                              ...d,
                              id: `ghost-${d.id}`,
                              wallIndex: targetWallIdx as any,
                              centerOffset: localCenterFt
                          });
                      }
                  });
              }
          });
      });
      return projected;
  };

  const checkAdjacency = (roomA: RoomConfig, wallIdxA: number, startA: number, endA: number) => {
      const boundsA = getWallGlobalBounds(roomA, wallIdxA);
      const globalStart = boundsA.start + startA;
      const globalEnd = boundsA.start + endA;

      for (const otherRoom of rooms) {
          if (otherRoom.id === roomA.id) continue;
          
          for (let i = 0; i < 4; i++) {
              const boundsB = getWallGlobalBounds(otherRoom, i);
              
              if (boundsA.axis === boundsB.axis && Math.abs(boundsA.constVal - boundsB.constVal) < 2) {
                  const overlapStart = Math.max(globalStart, boundsB.start);
                  const overlapEnd = Math.min(globalEnd, boundsB.end);
                  
                  if (overlapEnd > overlapStart) return true;
              }
          }
      }
      return false;
  };

  const hasOverlap = (wallIdx: number, centerFt: number, widthIn: number, ignoreId?: string) => {
      const halfWidth = widthIn / 2;
      const newLeft = (centerFt * 12) - halfWidth;
      const newRight = (centerFt * 12) + halfWidth;

      const myOpenings = activeRoom.openings.filter(o => o.wallIndex === wallIdx);
      const ghostOpenings = getAdjacentOpenings(wallIdx);
      
      const allToCheck = [...myOpenings, ...ghostOpenings];

      return allToCheck.some(o => {
          if (ignoreId && o.id === ignoreId) return false;
          
          const oHalf = o.width / 2;
          const oLeft = (o.centerOffset * 12) - oHalf;
          const oRight = (o.centerOffset * 12) + oHalf;
          
          return !(newRight <= oLeft || newLeft >= oRight);
      });
  };

  const addOpening = (type: 'door' | 'window') => {
    const width = type === 'door' ? 38 : 36;
    const centerOffset = 4;
    
    if (hasOverlap(selectedWallIndex, centerOffset, width)) {
        alert("Cannot add opening: Overlaps with existing opening (possibly from an adjacent room).");
        return;
    }

    if (type === 'window') {
        const halfWidth = width / 2;
        const startIn = (centerOffset * 12) - halfWidth;
        const endIn = (centerOffset * 12) + halfWidth;
        if (checkAdjacency(activeRoom, selectedWallIndex, startIn, endIn)) {
            alert("Cannot add window: This wall segment is adjacent to another room.");
            return;
        }
    }

    const newOpening: Opening = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      wallIndex: selectedWallIndex,
      centerOffset, 
      width, 
      height: type === 'door' ? 82 : 48,
      sillHeight: type === 'door' ? 0 : 36,
    };
    onUpdateRoom({ ...activeRoom, openings: [...activeRoom.openings, newOpening] });
  };

  const updateOpening = (id: string, field: keyof Opening, value: any) => {
    const op = activeRoom.openings.find(o => o.id === id);
    if (!op) return;

    if (field === 'centerOffset' || field === 'width') {
         const newCenter = field === 'centerOffset' ? value : op.centerOffset;
         const newWidth = field === 'width' ? value : op.width;
         
         if (hasOverlap(op.wallIndex, newCenter, newWidth, id)) {
             alert("Cannot move opening: Overlaps with existing opening (possibly from an adjacent room).");
             return;
         }

         if (op.type === 'window') {
            const halfWidth = newWidth / 2;
            const startIn = (newCenter * 12) - halfWidth;
            const endIn = (newCenter * 12) + halfWidth;
            if (checkAdjacency(activeRoom, op.wallIndex, startIn, endIn)) {
                 alert("Cannot move window: This wall segment is adjacent to another room.");
                 return;
            }
         }
    }

    const updatedOpenings = activeRoom.openings.map(op => 
      op.id === id ? { ...op, [field]: value } : op
    );
    onUpdateRoom({ ...activeRoom, openings: updatedOpenings });
  };

  const removeOpening = (id: string) => {
    onUpdateRoom({ ...activeRoom, openings: activeRoom.openings.filter(o => o.id !== id) });
  };

  const activeIndex = rooms.findIndex(r => r.id === activeRoomId);
  const nextRoom = () => {
      if (activeIndex < rooms.length - 1) onSelectRoom(rooms[activeIndex + 1].id);
      else onSelectRoom(rooms[0].id);
  };
  const prevRoom = () => {
      if (activeIndex > 0) onSelectRoom(rooms[activeIndex - 1].id);
      else onSelectRoom(rooms[rooms.length - 1].id);
  };

  const WALL_NAMES = ['Front Wall', 'Back Wall', 'Left Wall', 'Right Wall'];
  
  const currentWallOpenings = activeRoom.openings.filter(o => o.wallIndex === selectedWallIndex);
  const ghostOpenings = getAdjacentOpenings(selectedWallIndex);
  const allOpeningsToShow = [...currentWallOpenings, ...ghostOpenings].sort((a, b) => a.centerOffset - b.centerOffset);

  // Common Input Class
  const inputClass = "w-full p-2 bg-[#171717] border border-neutral-700 rounded-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-neutral-200 text-xs";
  const labelClass = "block text-[10px] font-bold text-neutral-500 uppercase mb-1 tracking-wide";

  return (
    <div className="bg-neutral-900 flex flex-col h-full overflow-hidden text-neutral-300">
      {/* Room Manager Header */}
      <div className="bg-neutral-950 p-4 border-b border-neutral-800 flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-blue-500" />
                <span className="font-bold text-sm truncate max-w-[120px] text-white">{activeRoom.name}</span>
            </div>
            <div className="flex items-center gap-1">
                <button onClick={prevRoom} className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white"><ChevronLeft className="w-4 h-4"/></button>
                <span className="text-[10px] text-neutral-500 font-mono">{activeIndex + 1}/{rooms.length}</span>
                <button onClick={nextRoom} className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white"><ChevronRight className="w-4 h-4"/></button>
                <div className="w-px h-3 bg-neutral-700 mx-1"></div>
                <button onClick={onAddRoom} title="Add Room" className="p-1 hover:bg-blue-600 rounded bg-blue-500/10 text-blue-500 hover:text-white transition-colors"><Plus className="w-4 h-4"/></button>
                {rooms.length > 1 && (
                    <button onClick={() => onRemoveRoom(activeRoom.id)} title="Delete Room" className="p-1 hover:bg-red-900 rounded bg-red-500/10 text-red-500 hover:text-red-100 transition-colors"><Trash2 className="w-4 h-4"/></button>
                )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-neutral-900 p-2 rounded-sm border border-neutral-800">
             <Move className="w-3.5 h-3.5 text-neutral-500" />
             <div className="flex items-center gap-2 flex-1">
                 <label className="text-[9px] uppercase text-neutral-600 font-bold">X</label>
                 <input 
                    type="number" 
                    value={activeRoom.position.x}
                    onChange={(e) => handlePositionChange('x', Number(e.target.value))}
                    className="w-full bg-[#121212] border border-neutral-700 rounded-sm px-1.5 py-0.5 text-xs text-neutral-300 focus:border-blue-500 focus:outline-none"
                 />
             </div>
             <div className="flex items-center gap-2 flex-1">
                 <label className="text-[9px] uppercase text-neutral-600 font-bold">Z</label>
                 <input 
                    type="number" 
                    value={activeRoom.position.z}
                    onChange={(e) => handlePositionChange('z', Number(e.target.value))}
                    className="w-full bg-[#121212] border border-neutral-700 rounded-sm px-1.5 py-0.5 text-xs text-neutral-300 focus:border-blue-500 focus:outline-none"
                 />
             </div>
          </div>
      </div>

      <div className="flex border-b border-neutral-800 bg-neutral-900 shrink-0">
        <button 
          onClick={() => setActiveTab('general')}
          className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'general' ? 'bg-neutral-900 text-blue-500 border-blue-600' : 'bg-neutral-950 text-neutral-500 border-transparent hover:text-neutral-300'}`}
        >
          Structure
        </button>
        <button 
          onClick={() => setActiveTab('openings')}
          className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'openings' ? 'bg-neutral-900 text-blue-500 border-blue-600' : 'bg-neutral-950 text-neutral-500 border-transparent hover:text-neutral-300'}`}
        >
          Openings
        </button>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto custom-scrollbar flex-1">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                <Settings className="w-4 h-4 text-blue-600" />
                <h2 className="text-xs font-bold text-neutral-300 uppercase tracking-wide">Room Dimensions</h2>
            </div>

            <div className="mb-2">
                <label className={labelClass}>Room Name</label>
                <input
                    type="text"
                    value={activeRoom.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={inputClass}
                />
            </div>

            {/* Width & Length */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Width (ft)</label>
                <div className="relative">
                    <input
                    type="number"
                    value={activeRoom.width}
                    onChange={(e) => handleChange('width', Number(e.target.value))}
                    className={`${inputClass} pl-8`}
                    min={4}
                    max={100}
                    />
                    <Ruler className="w-3.5 h-3.5 text-neutral-600 absolute left-2.5 top-2.5" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Length (ft)</label>
                 <div className="relative">
                    <input
                    type="number"
                    value={activeRoom.length}
                    onChange={(e) => handleChange('length', Number(e.target.value))}
                    className={`${inputClass} pl-8`}
                    min={4}
                    max={100}
                    />
                    <Ruler className="w-3.5 h-3.5 text-neutral-600 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>

            {/* Height */}
            <div>
              <label className={labelClass}>Wall Height (ft)</label>
               <div className="relative">
                <input
                    type="number"
                    value={activeRoom.wallHeight}
                    onChange={(e) => handleChange('wallHeight', Number(e.target.value))}
                    className={`${inputClass} pl-8`}
                    min={7}
                    max={12}
                />
                <ArrowUpFromLine className="w-3.5 h-3.5 text-neutral-600 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Stud Spacing */}
            <div>
              <label className={labelClass}>Stud Spacing</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleChange('studSpacing', 16)}
                  className={`p-2 rounded-sm text-xs font-medium border transition-all ${
                    activeRoom.studSpacing === 16
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:border-neutral-500'
                  }`}
                >
                  16" OC
                </button>
                <button
                  onClick={() => handleChange('studSpacing', 24)}
                  className={`p-2 rounded-sm text-xs font-medium border transition-all ${
                    activeRoom.studSpacing === 24
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:border-neutral-500'
                  }`}
                >
                  24" OC
                </button>
              </div>
            </div>

            {/* Lumber Type */}
            <div>
                <label className={labelClass}>Lumber Size</label>
                <div className="relative">
                    <select 
                        value={activeRoom.lumberType}
                        onChange={(e) => handleChange('lumberType', e.target.value)}
                        className={`${inputClass} pl-8 appearance-none`}
                    >
                        <option value="2x4">2x4 (Standard)</option>
                        <option value="2x6">2x6 (Heavy Duty)</option>
                    </select>
                    <Box className="w-3.5 h-3.5 text-neutral-600 absolute left-2.5 top-2.5" />
                </div>
            </div>

            <div className="h-px bg-neutral-800 my-4"></div>

            {/* Roof Toggle */}
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-neutral-300">Roof Framing</label>
                <button
                    onClick={() => handleChange('includeRoof', !activeRoom.includeRoof)}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                        activeRoom.includeRoof ? 'bg-blue-600' : 'bg-neutral-700'
                    }`}
                >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        activeRoom.includeRoof ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                </button>
            </div>
            
            {activeRoom.includeRoof && (
                <div className="bg-neutral-950 p-3 rounded-sm border border-neutral-800 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                        <Triangle className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-[10px] font-bold uppercase text-neutral-500">Roof Settings</span>
                    </div>

                    <div>
                        <label className={labelClass}>Type</label>
                        <select
                            value={activeRoom.roofType || 'gable'}
                            onChange={(e) => handleChange('roofType', e.target.value)}
                            className={inputClass}
                        >
                            <option value="gable">Gable Roof</option>
                            <option value="shed">Shed Roof</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Pitch (/12)</label>
                            <input
                                type="number"
                                value={activeRoom.roofPitch || 6}
                                onChange={(e) => handleChange('roofPitch', Number(e.target.value))}
                                className={inputClass}
                                min={1}
                                max={24}
                            />
                        </div>
                        {activeRoom.roofType === 'shed' && (
                            <div>
                                <label className={labelClass}>High Side</label>
                                <select
                                    value={activeRoom.roofHighSide || 'back'}
                                    onChange={(e) => handleChange('roofHighSide', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="front">Front</option>
                                    <option value="back">Back</option>
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* Sheathing Toggle */}
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-neutral-300">Sheathing (OSB)</label>
                <button
                    onClick={() => handleChange('includeSheathing', !activeRoom.includeSheathing)}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                        activeRoom.includeSheathing ? 'bg-blue-600' : 'bg-neutral-700'
                    }`}
                >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        activeRoom.includeSheathing ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                </button>
            </div>
          </div>
        )}

        {activeTab === 'openings' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                <DoorOpen className="w-4 h-4 text-blue-600" />
                <h2 className="text-xs font-bold text-neutral-300 uppercase tracking-wide">Doors & Windows</h2>
            </div>
            
            {/* Wall Selector */}
             <div>
                <label className={labelClass}>Select Wall</label>
                <select 
                    value={selectedWallIndex}
                    onChange={(e) => onSelectWall(Number(e.target.value) as any)}
                    className={inputClass}
                >
                    {WALL_NAMES.map((name, idx) => (
                        <option key={idx} value={idx}>{name}</option>
                    ))}
                </select>
            </div>

            {/* Add Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <button 
                    onClick={() => addOpening('door')}
                    className="flex items-center justify-center gap-2 p-2 bg-neutral-800 text-neutral-200 rounded-sm text-xs font-medium hover:bg-neutral-700 transition border border-neutral-700"
                >
                    <Plus className="w-3.5 h-3.5" /> Door
                </button>
                <button 
                     onClick={() => addOpening('window')}
                    className="flex items-center justify-center gap-2 p-2 bg-neutral-800 text-neutral-200 rounded-sm text-xs font-medium hover:bg-neutral-700 transition border border-neutral-700"
                >
                    <Plus className="w-3.5 h-3.5" /> Window
                </button>
            </div>

            {/* List */}
            <div className="space-y-3">
                {allOpeningsToShow.length === 0 && (
                    <div className="text-center py-6 text-neutral-600 text-xs bg-neutral-900/50 rounded-sm border border-dashed border-neutral-800">
                        No openings on this wall
                    </div>
                )}
                {allOpeningsToShow.map(op => {
                    const isGhost = op.id.startsWith('ghost-');
                    return (
                        <div key={op.id} className={`p-3 rounded-sm border text-sm relative group ${isGhost ? 'bg-amber-900/10 border-amber-800/50 border-dashed' : 'bg-neutral-950 border-neutral-800'}`}>
                            {isGhost ? (
                                <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-bold text-amber-500 bg-amber-900/30 px-1.5 py-0.5 rounded border border-amber-800/50">
                                    <Lock className="w-2.5 h-2.5" /> ADJACENT
                                </div>
                            ) : (
                                <button 
                                    onClick={() => removeOpening(op.id)}
                                    className="absolute top-2 right-2 text-neutral-600 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            )}
                            
                            <div className="font-semibold text-neutral-300 mb-3 capitalize flex items-center gap-2 text-xs">
                                {op.type === 'door' ? <DoorOpen className={`w-3.5 h-3.5 ${isGhost ? 'text-amber-500' : 'text-blue-500'}`}/> : <Box className="w-3.5 h-3.5 text-neutral-400"/>}
                                {op.type}
                                {isGhost && <span className="text-amber-500/60 font-normal italic text-[10px]">- Neighbor</span>}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <div>
                                    <label className={labelClass}>Offset (ft)</label>
                                    <input 
                                        type="number" 
                                        value={Math.round(op.centerOffset * 100) / 100} 
                                        onChange={(e) => !isGhost && updateOpening(op.id, 'centerOffset', Number(e.target.value))}
                                        className={`w-full p-1 border rounded-sm text-xs ${isGhost ? 'bg-transparent text-neutral-500 border-neutral-800 cursor-not-allowed' : 'bg-[#121212] border-neutral-700 text-neutral-200'}`}
                                        step={0.5}
                                        disabled={isGhost}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Width (in)</label>
                                    <input 
                                        type="number" 
                                        value={op.width} 
                                        onChange={(e) => !isGhost && updateOpening(op.id, 'width', Number(e.target.value))}
                                        className={`w-full p-1 border rounded-sm text-xs ${isGhost ? 'bg-transparent text-neutral-500 border-neutral-800 cursor-not-allowed' : 'bg-[#121212] border-neutral-700 text-neutral-200'}`}
                                        disabled={isGhost}
                                    />
                                </div>
                            </div>
                             <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className={labelClass}>Height (in)</label>
                                    <input 
                                        type="number" 
                                        value={op.height} 
                                        onChange={(e) => !isGhost && updateOpening(op.id, 'height', Number(e.target.value))}
                                        className={`w-full p-1 border rounded-sm text-xs ${isGhost ? 'bg-transparent text-neutral-500 border-neutral-800 cursor-not-allowed' : 'bg-[#121212] border-neutral-700 text-neutral-200'}`}
                                        disabled={isGhost}
                                    />
                                </div>
                                {op.type === 'window' && (
                                    <div>
                                        <label className={labelClass}>Sill Ht (in)</label>
                                        <input 
                                            type="number" 
                                            value={op.sillHeight} 
                                            onChange={(e) => !isGhost && updateOpening(op.id, 'sillHeight', Number(e.target.value))}
                                            className={`w-full p-1 border rounded-sm text-xs ${isGhost ? 'bg-transparent text-neutral-500 border-neutral-800 cursor-not-allowed' : 'bg-[#121212] border-neutral-700 text-neutral-200'}`}
                                            disabled={isGhost}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;