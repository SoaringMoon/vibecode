

export interface Opening {
  id: string;
  type: 'door' | 'window';
  wallIndex: 0 | 1 | 2 | 3; // 0: Front, 1: Back, 2: Left, 3: Right
  centerOffset: number; // feet from start of wall
  width: number; // inches
  height: number; // inches
  sillHeight: number; // inches (0 for doors)
}

export interface RoomConfig {
  id: string;
  name: string;
  width: number; // in feet
  length: number; // in feet
  wallHeight: number; // in feet
  position: { x: number; z: number }; // Offset in feet
  studSpacing: 16 | 24; // inches on center
  lumberType: '2x4' | '2x6';
  includeRoof: boolean;
  roofType: 'gable' | 'shed';
  roofPitch: number; // rise over 12
  roofHighSide: 'front' | 'back' | 'left' | 'right'; 
  includeSheathing: boolean;
  openings: Opening[];
}

export interface LumberPart {
  id: string;
  roomId: string; // ID of the room this part belongs to
  name: string; // e.g., "King Stud", "Bottom Plate"
  type: string; // "stud", "plate", "header", "joist", "rafter", "fascia", "block", "sheathing"
  nominalSize: string; // "2x4", "2x6", "4x8"
  actualDimensions: [number, number, number]; // width, thickness, length (in inches) -- For boxes. For custom shapes: [BoundingWidth, BoundingHeight, Thickness]
  position: [number, number, number]; // x, y, z (in inches)
  rotation: [number, number, number]; // x, y, z (in radians)
  color?: string;
  path?: { x: number; y: number }[]; // Optional 2D path for custom shapes
  holes?: { x: number; y: number }[][]; // Array of paths representing holes
  wallIndex?: number; // Optional index of the wall this part belongs to
}

export interface CutListItem {
  name: string;
  nominalSize: string;
  length: number;
  count: number;
  ids: string[];
}