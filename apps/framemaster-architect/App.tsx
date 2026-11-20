
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { RoomConfig } from './types';
import { generateProjectFraming } from './utils/framingLogic';
import FramingViewer from './components/FramingViewer';
import Controls from './components/Controls';
import CutList from './components/CutList';
import { Hammer, ClipboardList, Save, Upload, FilePlus, Download, Ruler } from 'lucide-react';

const STORAGE_KEY = 'framemaster_project_v1';

const DEFAULT_ROOM: RoomConfig = {
  id: 'room-1',
  name: 'Main Room',
  width: 12,
  length: 16,
  wallHeight: 8,
  position: { x: 0, z: 0 },
  studSpacing: 16,
  lumberType: '2x4',
  includeRoof: false,
  roofType: 'gable',
  roofPitch: 6,
  roofHighSide: 'back',
  includeSheathing: false,
  openings: [],
};

const DEFAULT_PRICES: Record<string, number> = {
    '2x4': 0.85,
    '2x6': 1.15,
    '2x8': 1.60,
    '2x10': 2.10,
    '2x12': 2.50,
    '1x8': 2.00,
    '4x4': 3.00,
    '4x8': 25.00, // Price per sheet for sheathing
};

const App: React.FC = () => {
  const [rooms, setRooms] = useState<RoomConfig[]>([DEFAULT_ROOM]);
  const [activeRoomId, setActiveRoomId] = useState<string>('room-1');
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);
  const [selectedWallIndex, setSelectedWallIndex] = useState<0 | 1 | 2 | 3>(0);
  const [isCutListOpen, setIsCutListOpen] = useState(true);
  const [priceSettings, setPriceSettings] = useState<Record<string, number>>(DEFAULT_PRICES);
  const [showDimensions, setShowDimensions] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Persistence Logic ---

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.rooms && Array.isArray(parsed.rooms) && parsed.rooms.length > 0) {
            // Migration: Ensure new fields exist
            const migratedRooms = parsed.rooms.map((r: any) => ({
                ...DEFAULT_ROOM,
                ...r,
                // Explicitly preserve arrays if they exist in r, otherwise default
                openings: r.openings || []
            }));
            
            setRooms(migratedRooms);
            
            if (parsed.activeRoomId && migratedRooms.find((r: RoomConfig) => r.id === parsed.activeRoomId)) {
                setActiveRoomId(parsed.activeRoomId);
            } else {
                setActiveRoomId(migratedRooms[0].id);
            }
        }
        
        if (parsed.priceSettings) {
            setPriceSettings({ ...DEFAULT_PRICES, ...parsed.priceSettings });
        }
      } catch (e) {
        console.error("Failed to load autosave data", e);
      }
    }
  }, []);

  useEffect(() => {
     const state = {
         rooms,
         activeRoomId,
         priceSettings,
         version: '1.0',
         updatedAt: new Date().toISOString()
     };
     localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [rooms, activeRoomId, priceSettings]);

  const handleNewProject = () => {
      if (window.confirm("Are you sure you want to start a new project? Your current work will be overwritten.")) {
          setRooms([DEFAULT_ROOM]);
          setActiveRoomId(DEFAULT_ROOM.id);
          setSelectedWallIndex(0);
      }
  };

  const handleExportProject = () => {
      const state = {
         rooms,
         activeRoomId,
         priceSettings,
         version: '1.0',
         exportedAt: new Date().toISOString()
     };
     const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = `framemaster-${new Date().toISOString().slice(0,10)}.json`;
     a.click();
     URL.revokeObjectURL(url);
  };

  const handleImportProject = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
          try {
              const content = e.target?.result as string;
              const parsed = JSON.parse(content);
               if (parsed.rooms && Array.isArray(parsed.rooms) && parsed.rooms.length > 0) {
                    if (window.confirm("Load project from file? This will overwrite your current workspace.")) {
                        const migratedRooms = parsed.rooms.map((r: any) => ({
                            ...DEFAULT_ROOM,
                            ...r
                        }));
                        setRooms(migratedRooms);

                        if (parsed.activeRoomId && migratedRooms.find((r: RoomConfig) => r.id === parsed.activeRoomId)) {
                            setActiveRoomId(parsed.activeRoomId);
                        } else {
                            setActiveRoomId(migratedRooms[0].id);
                        }
                        if (parsed.priceSettings) {
                            setPriceSettings(parsed.priceSettings);
                        }
                    }
                } else {
                    alert("Invalid project file format.");
                }
          } catch (err) {
              alert("Failed to parse project file.");
              console.error(err);
          }
      };
      reader.readAsText(file);
      event.target.value = '';
  };

  // --- End Persistence Logic ---

  const parts = useMemo(() => generateProjectFraming(rooms), [rooms]);

  useEffect(() => {
    setHighlightedIds([]);
  }, [rooms]);

  const updateRoom = (updatedRoom: RoomConfig) => {
    setRooms(rooms.map(r => r.id === updatedRoom.id ? updatedRoom : r));
  };

  const addRoom = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const lastRoom = rooms[rooms.length - 1];
    
    const newRoom: RoomConfig = {
        ...DEFAULT_ROOM,
        id: newId,
        name: `Room ${rooms.length + 1}`,
        position: { x: lastRoom.position.x + lastRoom.width + 2, z: lastRoom.position.z },
    };
    setRooms([...rooms, newRoom]);
    setActiveRoomId(newId);
  };

  const removeRoom = (id: string) => {
      if (rooms.length <= 1) return;
      const newRooms = rooms.filter(r => r.id !== id);
      setRooms(newRooms);
      if (activeRoomId === id) {
          setActiveRoomId(newRooms[0].id);
      }
  };

  const handleSelectRoom = (id: string) => {
      setActiveRoomId(id);
  }

  return (
    <div className="h-screen w-full flex flex-col bg-neutral-900 text-neutral-200 font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-neutral-950 h-12 px-4 flex items-center justify-between shrink-0 border-b border-neutral-800 z-20 shadow-md">
         {/* Logo section */}
         <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-1 rounded-sm shadow-lg shadow-blue-900/20">
               <Hammer className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-sm tracking-wide text-neutral-100">FrameMaster <span className="text-neutral-500 font-normal">ARCHITECT</span></h1>
            
            <div className="h-5 w-px bg-neutral-800 mx-2"></div>

            {/* Project Controls */}
            <div className="flex items-center gap-1">
                <button 
                    onClick={handleNewProject}
                    title="New Project"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-sm transition-colors"
                >
                    <FilePlus className="w-3.5 h-3.5" />
                    New
                </button>
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    title="Open Project"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-sm transition-colors"
                >
                    <Upload className="w-3.5 h-3.5" />
                    Open
                </button>
                <button 
                    onClick={handleExportProject}
                    title="Save Project"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-sm transition-colors"
                >
                    <Save className="w-3.5 h-3.5" />
                    Save
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".json" 
                    onChange={handleImportProject} 
                />
            </div>
         </div>

         {/* Right Actions */}
         <div className="flex items-center gap-2">
            <button
                onClick={() => setShowDimensions(!showDimensions)}
                className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-sm transition-all border ${showDimensions ? 'bg-neutral-800 border-neutral-600 text-white' : 'bg-neutral-950 border-neutral-800 text-neutral-500 hover:border-neutral-600'}`}
                title="Toggle Dimensions"
            >
                <Ruler className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">DIMS</span>
            </button>

            <button
                onClick={() => setIsCutListOpen(!isCutListOpen)}
                className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-sm transition-all border ${isCutListOpen ? 'bg-blue-600 border-blue-600 text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white'}`}
            >
                <ClipboardList className="w-3.5 h-3.5" />
                {isCutListOpen ? 'HIDE MATERIALS' : 'SHOW MATERIALS'}
            </button>
         </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Controls */}
        <div className="w-80 flex flex-col bg-neutral-900 border-r border-neutral-800 z-10 shrink-0 shadow-xl">
            <Controls 
              rooms={rooms} 
              activeRoomId={activeRoomId}
              onUpdateRoom={updateRoom}
              onAddRoom={addRoom}
              onRemoveRoom={removeRoom}
              onSelectRoom={handleSelectRoom}
              selectedWallIndex={selectedWallIndex}
              onSelectWall={setSelectedWallIndex}
            />
        </div>

        {/* Center: 3D Viewer */}
        <div className="flex-1 min-w-0 bg-[#0f0f0f] relative">
            <FramingViewer 
              parts={parts} 
              highlightedIds={highlightedIds} 
              onSelectWall={setSelectedWallIndex}
              onSelectRoom={handleSelectRoom}
              activeRoomId={activeRoomId}
              rooms={rooms}
              selectedWallIndex={selectedWallIndex}
              showDimensions={showDimensions}
            />
        </div>

        {/* Right Sidebar: Cut List */}
        {isCutListOpen && (
            <div className="w-96 flex flex-col bg-neutral-900 border-l border-neutral-800 z-10 shrink-0 shadow-xl transition-all">
                <CutList 
                    parts={parts} 
                    onSelect={setHighlightedIds} 
                    selectedIds={highlightedIds}
                    priceSettings={priceSettings}
                    onUpdatePrices={setPriceSettings}
                />
            </div>
        )}

      </div>
    </div>
  );
};

export default App;