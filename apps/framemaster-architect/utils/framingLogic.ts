
import { RoomConfig, LumberPart, Opening } from '../types';
import { LUMBER_DIMENSIONS, COLORS } from './constants';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const generateProjectFraming = (rooms: RoomConfig[]): LumberPart[] => {
  const allParts: LumberPart[] = [];

  rooms.forEach(room => {
    const roomParts = generateRoomFraming(room, rooms);
    allParts.push(...roomParts);
  });

  return allParts;
};

// Helper types for geometry checks
interface WallBounds {
    axis: 'x' | 'z';
    constVal: number; // The constant coordinate (Z for Front/Back, X for Side)
    start: number;
    end: number;
}

interface Rect2D {
    x: number;
    y: number;
    w: number;
    h: number;
}

const getWallGlobalBounds = (room: RoomConfig, wallIndex: number): WallBounds => {
    const x = room.position.x * 12;
    const z = room.position.z * 12;
    const w = room.width * 12;
    const l = room.length * 12;
    
    // Assumes walls are on the outer perimeter lines of the defined room rectangle
    switch(wallIndex) {
        case 0: // Front (runs along X, at Z=0 relative)
            return { axis: 'x', constVal: z, start: x, end: x + w };
        case 1: // Back (runs along X, at Z=Length relative)
            return { axis: 'x', constVal: z + l, start: x, end: x + w };
        case 2: // Left (runs along Z, at X=0 relative)
            return { axis: 'z', constVal: x, start: z, end: z + l };
        case 3: // Right (runs along Z, at X=Width relative)
            return { axis: 'z', constVal: x + w, start: z, end: z + l };
    }
    return { axis: 'x', constVal: 0, start: 0, end: 0 };
};

export const areWallsAdjacent = (w1: WallBounds, w2: WallBounds): boolean => {
    if (w1.axis !== w2.axis) return false;
    // Check if they are on the same plane (within small tolerance)
    if (Math.abs(w1.constVal - w2.constVal) > 1.0) return false;
    // Check for linear overlap
    const overlapStart = Math.max(w1.start, w2.start);
    const overlapEnd = Math.min(w1.end, w2.end);
    return overlapEnd > overlapStart; // Positive overlap
};

// Helper to determine exterior segments of a wall (removing adjacent shared sections)
const getExteriorSegments = (
    config: RoomConfig, 
    wallIndex: number, 
    wallLength: number, 
    allRooms: RoomConfig[]
): {start: number, end: number}[] => {
    const myBounds = getWallGlobalBounds(config, wallIndex);
    
    // Start with one full segment
    let segments = [{start: 0, end: wallLength}];

    // Find all adjacent intervals to subtract
    const adjacentIntervals: {start: number, end: number}[] = [];

    allRooms.forEach(otherRoom => {
        if (otherRoom.id === config.id) return;
        
        [0, 1, 2, 3].forEach(otherWallIdx => {
             const otherBounds = getWallGlobalBounds(otherRoom, otherWallIdx);
             
             if (areWallsAdjacent(myBounds, otherBounds)) {
                 // Calculate overlap in global coords
                 const globalOverlapStart = Math.max(myBounds.start, otherBounds.start);
                 const globalOverlapEnd = Math.min(myBounds.end, otherBounds.end);
                 
                 // Check if there is significant overlap
                 if (globalOverlapEnd > globalOverlapStart + 1.0) { 
                     // Convert to local relative to myBounds.start
                     const localStart = globalOverlapStart - myBounds.start;
                     const localEnd = globalOverlapEnd - myBounds.start;
                     
                     adjacentIntervals.push({start: localStart, end: localEnd});
                 }
             }
        });
    });

    // Subtract adjacentIntervals from segments
    adjacentIntervals.forEach(adj => {
        const newSegments: {start: number, end: number}[] = [];
        segments.forEach(seg => {
            // Check intersection between seg and adj
            const overlapStart = Math.max(seg.start, adj.start);
            const overlapEnd = Math.min(seg.end, adj.end);
            
            if (overlapEnd > overlapStart) {
                // Split segment
                // Part before overlap
                if (overlapStart > seg.start) {
                    newSegments.push({start: seg.start, end: overlapStart});
                }
                // Part after overlap
                if (overlapEnd < seg.end) {
                    newSegments.push({start: overlapEnd, end: seg.end});
                }
            } else {
                // No overlap, keep segment
                newSegments.push(seg);
            }
        });
        segments = newSegments;
    });

    return segments.filter(s => (s.end - s.start) > 0.1);
};

// Helper to subtract a cutout rect from a list of source rects
const subtractRects = (sources: Rect2D[], cutout: Rect2D): Rect2D[] => {
    const result: Rect2D[] = [];
    
    sources.forEach(source => {
        // Check intersection
        const x_overlap = Math.max(0, Math.min(source.x + source.w, cutout.x + cutout.w) - Math.max(source.x, cutout.x));
        const y_overlap = Math.max(0, Math.min(source.y + source.h, cutout.y + cutout.h) - Math.max(source.y, cutout.y));

        if (x_overlap <= 0.01 || y_overlap <= 0.01) {
            result.push(source);
            return;
        }

        // Subtraction logic - Split source into up to 4 rects surrounding the cutout
        const sLeft = source.x;
        const sRight = source.x + source.w;
        const sBottom = source.y;
        const sTop = source.y + source.h;

        const cLeft = Math.max(sLeft, cutout.x);
        const cRight = Math.min(sRight, cutout.x + cutout.w);
        const cBottom = Math.max(sBottom, cutout.y);
        const cTop = Math.min(sTop, cutout.y + cutout.h);

        // Top strip
        if (sTop > cTop + 0.01) {
            result.push({ x: sLeft, y: cTop, w: source.w, h: sTop - cTop });
        }
        // Bottom strip
        if (sBottom < cBottom - 0.01) {
            result.push({ x: sLeft, y: sBottom, w: source.w, h: cBottom - sBottom });
        }
        // Left strip (between top/bottom cut planes)
        if (sLeft < cLeft - 0.01) {
            result.push({ x: sLeft, y: cBottom, w: cLeft - sLeft, h: cTop - cBottom });
        }
        // Right strip
        if (sRight > cRight + 0.01) {
            result.push({ x: cRight, y: cBottom, w: sRight - cRight, h: cTop - cBottom });
        }
    });
    
    return result;
};


const generateRoomFraming = (config: RoomConfig, allRooms: RoomConfig[]): LumberPart[] => {
  const parts: LumberPart[] = [];
  const { width, length, wallHeight, studSpacing, lumberType, includeRoof, includeSheathing, openings, position } = config;

  // Global Room Offsets (convert feet to inches)
  const offsetX = position.x * 12;
  const offsetZ = position.z * 12;

  // Convert feet to inches
  const widthIn = width * 12;
  const lengthIn = length * 12;
  const heightIn = wallHeight * 12;

  const dim = LUMBER_DIMENSIONS[lumberType];
  const plateThickness = dim.thickness; 
  const studDepth = dim.depth; 
  const studWidth = dim.thickness; 

  const studLength = heightIn - (3 * plateThickness);
  
  const baseHeaderDepth = 9.25; 
  const headerThickness = 1.5; 

  // Helper to add a part with global offset applied
  const addPart = (
    name: string,
    type: string,
    dims: [number, number, number],
    localPos: [number, number, number],
    rot: [number, number, number],
    isPressureTreated = false,
    nominalSizeOverride?: string,
    path?: { x: number; y: number }[],
    wallIndex?: number,
    holes?: { x: number; y: number }[][],
    colorOverride?: string
  ) => {
    parts.push({
      id: generateId(),
      roomId: config.id,
      name,
      type,
      nominalSize: nominalSizeOverride || lumberType,
      actualDimensions: dims,
      position: [localPos[0] + offsetX, localPos[1], localPos[2] + offsetZ], // Apply Room Offset Here
      rotation: rot,
      color: colorOverride ? colorOverride : (isPressureTreated ? COLORS.pressureTreated : COLORS.wood),
      path,
      holes,
      wallIndex
    });
  };

  // --- SHEATHING GENERATOR ---
  const generateSheathing = (
    wallIndex: number,
    wallStart: number, // 0 for local relative
    wallEnd: number,
    openingsOnWall: Opening[]
  ) => {
      // Get valid exterior segments (removing adjacent shared walls)
      const exteriorSegments = getExteriorSegments(config, wallIndex, wallEnd - wallStart, allRooms);
      
      const fullPanelWidth = 48; // 4ft
      const fullPanelHeight = 96; // 8ft
      const sheathingThickness = 0.5;
      
      let rotation: [number, number, number] = [0, 0, 0];
      // posFunc takes X, Width, Y, Height
      let posFunc: (pX: number, pW: number, pY: number, pH: number) => [number, number, number];

      // Note: Sheathing goes on EXTERIOR.
      switch(wallIndex) {
          case 0: // Front
            rotation = [0, 0, 0];
            posFunc = (pX, pW, pY, pH) => [pX + pW/2, pY + pH/2, -sheathingThickness/2];
            break;
          case 1: // Back
            rotation = [0, 0, 0]; 
            posFunc = (pX, pW, pY, pH) => [pX + pW/2, pY + pH/2, lengthIn + sheathingThickness/2];
            break;
          case 2: // Left
            // Rotated -90 degrees so local X+ maps to Global Z+
            rotation = [0, -Math.PI / 2, 0];
            posFunc = (pX, pW, pY, pH) => [-sheathingThickness/2, pY + pH/2, pX + pW/2];
            break;
          case 3: // Right
             // Rotated -90 degrees so local X+ maps to Global Z+
             rotation = [0, -Math.PI / 2, 0];
             posFunc = (pX, pW, pY, pH) => [widthIn + sheathingThickness/2, pY + pH/2, pX + pW/2];
             break;
           default:
             posFunc = () => [0,0,0];
      }

      exteriorSegments.forEach(seg => {
        const segStart = seg.start;
        const segLen = seg.end - seg.start;

        // Tile Horizontally
        for (let x = 0; x < segLen; x += fullPanelWidth) {
            const remainingW = segLen - x;
            const actualW = Math.min(fullPanelWidth, remainingW);
            
            if (actualW < 0.1) continue;

            const panelXOnWall = segStart + x;

            // Tile Vertically
            for (let y = 0; y < heightIn; y += fullPanelHeight) {
                const remainingH = heightIn - y;
                const actualH = Math.min(fullPanelHeight, remainingH);

                if (actualH < 0.1) continue;

                // Initial Panel Rect
                let panelRects: Rect2D[] = [{
                    x: panelXOnWall,
                    y: y,
                    w: actualW,
                    h: actualH
                }];

                // Subtract Openings
                openingsOnWall.forEach(op => {
                   const center = op.centerOffset * 12;
                   const opW = op.width;
                   const opH = op.height;
                   const sill = op.type === 'window' ? op.sillHeight : 0;
                   
                   const opLeft = center - opW/2;
                   const opBottom = sill;
                   
                   const cutout: Rect2D = {
                       x: opLeft,
                       y: opBottom,
                       w: opW,
                       h: opH
                   };

                   panelRects = subtractRects(panelRects, cutout);
                });

                // Generate parts for remaining rects
                panelRects.forEach(rect => {
                    // Create Part (Standard Box)
                    // Note: We use BoxGeometry (no path/holes) because we are cutting the panels into rectangles.
                    addPart(
                        'Sheathing Panel',
                        'sheathing',
                        [rect.w, rect.h, sheathingThickness],
                        posFunc(rect.x, rect.w, rect.y, rect.h),
                        rotation,
                        false,
                        '4x8',
                        undefined, // No path
                        wallIndex,
                        undefined, // No holes
                        COLORS.sheathing
                    );
                });
            }
        }
      });
  };

  // --- WALL GENERATION ---

  const generateWall = (
    wallIndex: number,
    startX: number,
    startZ: number,
    wallLength: number,
    isHorizontal: boolean, // Horizontal runs along X, Vertical runs along Z
    rotationY: number,
    isThroughWall: boolean 
  ) => {
    // 1. GATHER OPENINGS (Own + Adjacent Doors)
    let combinedOpenings = openings.filter(o => o.wallIndex === wallIndex);

    const myWallBounds = getWallGlobalBounds(config, wallIndex);

    // Check adjacent rooms for doors that should penetrate this wall
    allRooms.forEach(otherRoom => {
        if (otherRoom.id === config.id) return;
        
        [0, 1, 2, 3].forEach(otherWallIdx => {
            const otherWallBounds = getWallGlobalBounds(otherRoom, otherWallIdx);
            
            if (areWallsAdjacent(myWallBounds, otherWallBounds)) {
                // Find doors in the other wall
                const otherDoors = otherRoom.openings.filter(o => o.wallIndex === otherWallIdx && o.type === 'door');
                
                otherDoors.forEach(door => {
                    // Calculate global center of the door
                    const otherWallStart = otherWallBounds.start;
                    const doorGlobalCenter = otherWallStart + (door.centerOffset * 12);
                    
                    // Project to local coordinates of current wall
                    const localCenterIn = doorGlobalCenter - myWallBounds.start;
                    const localCenterFt = localCenterIn / 12;

                    // Check if valid within this wall
                    if (localCenterIn > 0 && localCenterIn < (myWallBounds.end - myWallBounds.start)) {
                        // Avoid duplicates if user already added a matching opening locally
                        const duplicate = combinedOpenings.find(existing => 
                            Math.abs(existing.centerOffset - localCenterFt) < 1 // within 1 foot
                        );
                        
                        if (!duplicate) {
                             // Add ghost opening
                             combinedOpenings.push({
                                 ...door,
                                 id: `ghost-${door.id}`,
                                 centerOffset: localCenterFt,
                                 // Ensure it references this wall index now
                                 wallIndex: wallIndex as 0|1|2|3
                             });
                        }
                    }
                });
            }
        });
    });


    // 2. PLATES
    // Bottom Plate
    addPart(
      'Bottom Plate',
      'plate',
      [wallLength, plateThickness, studDepth], 
      isHorizontal 
        ? [startX + wallLength / 2, plateThickness / 2, startZ + studDepth / 2]
        : [startX + studDepth / 2, plateThickness / 2, startZ + wallLength / 2],
      [0, rotationY, 0],
      true,
      undefined,
      undefined,
      wallIndex
    );

    // Top Plates (Double)
    addPart(
      'Top Plate (Lower)',
      'plate',
      [wallLength, plateThickness, studDepth],
      isHorizontal
        ? [startX + wallLength / 2, heightIn - plateThickness * 1.5, startZ + studDepth / 2]
        : [startX + studDepth / 2, heightIn - plateThickness * 1.5, startZ + wallLength / 2],
      [0, rotationY, 0],
      false, undefined, undefined, wallIndex
    );
    addPart(
      'Top Plate (Upper)',
      'plate',
      [wallLength, plateThickness, studDepth],
      isHorizontal
        ? [startX + wallLength / 2, heightIn - plateThickness * 0.5, startZ + studDepth / 2]
        : [startX + studDepth / 2, heightIn - plateThickness * 0.5, startZ + wallLength / 2],
      [0, rotationY, 0],
      false, undefined, undefined, wallIndex
    );

    const verticalMembers: { pos: number, width: number }[] = [];

    const addVertical = (name: string, type: string, dims: [number, number, number], relPos: number, yCenter: number) => {
       const xPos = isHorizontal ? startX + relPos : startX + studDepth / 2;
       const zPos = isHorizontal ? startZ + studDepth / 2 : startZ + relPos;
       
       const actualDims: [number, number, number] = isHorizontal 
        ? dims
        : [dims[2], dims[1], dims[0]]; 

       addPart(name, type, actualDims, [xPos, yCenter, zPos], [0, 0, 0], false, undefined, undefined, wallIndex);
       verticalMembers.push({ pos: relPos, width: isHorizontal ? dims[0] : dims[2] }); 
    };

    if (isThroughWall) {
        const leftBackerCenter = studDepth - (studWidth / 2);
        addVertical('Corner Backer', 'stud', [studWidth, studLength, studDepth], leftBackerCenter, plateThickness + studLength/2);

        const rightBackerCenter = (wallLength - studDepth) + (studWidth / 2);
        addVertical('Corner Backer', 'stud', [studWidth, studLength, studDepth], rightBackerCenter, plateThickness + studLength/2);
    }

    // 3. OPENINGS
    const occupiedRanges: { start: number, end: number, headerTop: number, sillTop: number }[] = [];

    combinedOpenings.forEach(op => {
        // Calculate center relative to the start of this framing segment.
        // startX (for horizontal) or startZ (for vertical) is the offset of the framing start from the room corner.
        // op.centerOffset is relative to the room corner.
        const wallOffset = isHorizontal ? startX : startZ; 
        const centerIn = (op.centerOffset * 12) - wallOffset;
        
        const halfWidth = op.width / 2;
        
        const openingLeft = centerIn - halfWidth;
        const openingRight = centerIn + halfWidth;

        if (openingLeft < 0 || openingRight > wallLength) return;

        const headerHeight = op.type === 'door' ? (op.height + 0) : (op.sillHeight + op.height);
        
        const jackHeight = headerHeight; 
        const jackTop = plateThickness + jackHeight;
        const topPlateBottom = heightIn - (2 * plateThickness); 

        let actualHeaderDepth = baseHeaderDepth;
        if (jackTop + actualHeaderDepth > topPlateBottom) {
            actualHeaderDepth = Math.max(1.5, topPlateBottom - jackTop);
        }

        const headerY = jackTop + (actualHeaderDepth / 2);
        
        const kingLeftPos = openingLeft - studWidth - (studWidth/2); 
        const kingRightPos = openingRight + studWidth + (studWidth/2); 

        addVertical('King Stud', 'stud', [studWidth, studLength, studDepth], kingLeftPos, plateThickness + studLength/2);
        addVertical('King Stud', 'stud', [studWidth, studLength, studDepth], kingRightPos, plateThickness + studLength/2);

        const jackLeftPos = openingLeft - (studWidth/2);
        const jackRightPos = openingRight + (studWidth/2);
        
        addVertical('Jack Stud', 'stud', [studWidth, jackHeight, studDepth], jackLeftPos, plateThickness + jackHeight/2);
        addVertical('Jack Stud', 'stud', [studWidth, jackHeight, studDepth], jackRightPos, plateThickness + jackHeight/2);

        const headerLen = op.width + (2 * studWidth);
        const headerPos = centerIn;
        const headerActualDims: [number, number, number] = isHorizontal
            ? [headerLen, actualHeaderDepth, studDepth] 
            : [studDepth, actualHeaderDepth, headerLen];
        
        // Determine header nominal size based on actual depth available
        let headerName = 'Header';
        let headerNominal = '2x10'; // Default backup

        if (actualHeaderDepth <= 3.6) {
             headerName = 'Header (2x4)'; 
             headerNominal = '2x4';
        } else if (actualHeaderDepth <= 5.6) {
             headerName = 'Header (2x6)';
             headerNominal = '2x6';
        } else if (actualHeaderDepth <= 7.3) {
             headerName = 'Header (2x8)';
             headerNominal = '2x8';
        } else if (actualHeaderDepth <= 9.3) {
             headerName = 'Header (2x10)';
             headerNominal = '2x10';
        } else {
             headerName = 'Header (2x12)';
             headerNominal = '2x12';
        }
        
        addPart(headerName, 'header', headerActualDims, 
            isHorizontal 
                ? [startX + headerPos, headerY, startZ + studDepth/2]
                : [startX + studDepth/2, headerY, startZ + headerPos],
            [0, 0, 0], false, headerNominal, undefined, wallIndex
        );

        let sillTop = 0;
        if (op.type === 'window') {
            const sillPos = centerIn;
            const sillLen = op.width; 
            sillTop = op.sillHeight;
            
            const sillY = plateThickness + sillTop - (plateThickness/2);
            
            const sillActualDims: [number, number, number] = isHorizontal
                ? [sillLen, plateThickness, studDepth]
                : [studDepth, plateThickness, sillLen];

            addPart('Sill Plate', 'plate', sillActualDims,
                isHorizontal 
                    ? [startX + sillPos, sillY, startZ + studDepth/2]
                    : [startX + studDepth/2, sillY, startZ + sillPos],
                [0, 0, 0], false, undefined, undefined, wallIndex
            );
        }

        occupiedRanges.push({
            start: kingLeftPos - studWidth/2,
            end: kingRightPos + studWidth/2,
            headerTop: jackTop + actualHeaderDepth, 
            sillTop: op.type === 'window' ? (plateThickness + op.sillHeight - plateThickness) : 0 
        });
    });

    // 4. COMMON STUDS
    const numStuds = Math.ceil(wallLength / studSpacing);
    
    for (let i = 0; i <= numStuds; i++) {
      let currentLoc = i * studSpacing;
      if (currentLoc > wallLength - studWidth) currentLoc = wallLength - studWidth;
      
      const studCenter = currentLoc + studWidth / 2;
      const conflict = occupiedRanges.find(r => studCenter > r.start && studCenter < r.end);

      if (!conflict) {
          addVertical('Common Stud', 'stud', [studWidth, studLength, studDepth], studCenter, plateThickness + studLength/2);
      } else {
          const headerTop = conflict.headerTop;
          const topPlateBottom = heightIn - (2 * plateThickness);
          const topCrippleLen = topPlateBottom - headerTop;
          
          if (topCrippleLen > 1) { 
              addVertical('Cripple Stud', 'stud', [studWidth, topCrippleLen, studDepth], studCenter, headerTop + topCrippleLen/2);
          }
          if (conflict.sillTop > 0) {
              const bottomPlateTop = plateThickness;
              const sillBottom = conflict.sillTop;
              const botCrippleLen = sillBottom - bottomPlateTop;
              
              if (botCrippleLen > 1) {
                  addVertical('Cripple Stud', 'stud', [studWidth, botCrippleLen, studDepth], studCenter, bottomPlateTop + botCrippleLen/2);
              }
          }
      }
    }

    // 5. BLOCKING
    verticalMembers.sort((a, b) => a.pos - b.pos);
    
    const baseBlockHeight = 48;
    const staggerAmount = 3;

    for (let i = 0; i < verticalMembers.length - 1; i++) {
        const current = verticalMembers[i];
        const next = verticalMembers[i+1];
        
        const gapStart = current.pos + (studWidth/2);
        const gapEnd = next.pos - (studWidth/2);
        const gapSize = gapEnd - gapStart;

        if (gapSize > 3.5) {
            const blockY = baseBlockHeight + ((i % 2) * staggerAmount);
            const blockCenterRel = gapStart + (gapSize/2);

            // Important: Use adjusted center for obstruction checks
            const isObstructed = combinedOpenings.some(op => {
                const wallOffset = isHorizontal ? startX : startZ;
                const centerIn = (op.centerOffset * 12) - wallOffset;
                const halfWidth = op.width / 2;
                const opLeft = centerIn - halfWidth;
                const opRight = centerIn + halfWidth;

                if (blockCenterRel > opLeft && blockCenterRel < opRight) {
                    const opBottom = plateThickness + (op.type === 'window' ? op.sillHeight : 0);
                    const opTop = plateThickness + (op.type === 'window' ? (op.sillHeight + op.height) : op.height);
                    
                    if (blockY >= opBottom && blockY <= opTop) {
                        return true;
                    }
                }
                return false;
            });

            if (!isObstructed) {
                const blockDims: [number, number, number] = isHorizontal
                    ? [gapSize, studWidth, studDepth]
                    : [studDepth, studWidth, gapSize];
                
                addPart('Blocking', 'block', blockDims,
                    isHorizontal 
                        ? [startX + blockCenterRel, blockY, startZ + studDepth/2]
                        : [startX + studDepth/2, blockY, startZ + blockCenterRel],
                    [0, 0, 0], false, undefined, undefined, wallIndex
                );
            }
        }
    }

    if (includeSheathing) {
        // For side walls (Index 2 & 3), we want the sheathing to span the full Room Length (covering corners),
        // whereas the framing is shorter (infill).
        // Front/Back walls (0 & 1) framing covers full width, so sheathing matches framing.
        const sheathingLen = (wallIndex === 2 || wallIndex === 3) ? lengthIn : widthIn;
        generateSheathing(wallIndex, 0, sheathingLen, combinedOpenings);
    }
  };

  // Helper to check for adjacency on a specific wall index to clip roofs
  const hasNeighbor = (wallIndex: number): boolean => {
      const myBounds = getWallGlobalBounds(config, wallIndex);
      return allRooms.some(otherRoom => {
          if (otherRoom.id === config.id) return false;
          for(let i=0; i<4; i++) {
              const otherBounds = getWallGlobalBounds(otherRoom, i);
              if (areWallsAdjacent(myBounds, otherBounds)) return true;
          }
          return false;
      });
  };

  generateWall(0, 0, 0, widthIn, true, 0, true);
  generateWall(1, 0, lengthIn - studDepth, widthIn, true, 0, true);
  const sideWallLength = lengthIn - 2 * studDepth;
  generateWall(2, 0, studDepth, sideWallLength, false, Math.PI / 2, false);
  generateWall(3, widthIn - studDepth, studDepth, sideWallLength, false, Math.PI / 2, false);

  if (includeRoof) {
      if (config.roofType === 'shed') {
          // SHED ROOF LOGIC
          const pitch = config.roofPitch || 4; // Rise over 12
          const angleRad = Math.atan(pitch / 12);
          const overhang = 12; // Standard overhang

          const rafterNominal = '2x8'; 
          const rafterDims = LUMBER_DIMENSIONS[rafterNominal];
          const rafterDepth = rafterDims.depth;
          const rafterThickness = rafterDims.thickness;

          const highSide = config.roofHighSide || 'back';
          
          let highWallIdx = 1; // Default Back
          let rakeWallIndices: number[] = [2, 3]; // Default Side
          
          let getDistanceFromLow: (x: number, z: number) => number;
          let isZRun = true;
          let slopeRotX = 0;
          let slopeRotZ = 0;

          if (highSide === 'back') {
              highWallIdx = 1; rakeWallIndices = [2, 3];
              getDistanceFromLow = (x, z) => z;
              isZRun = true;
              slopeRotX = -angleRad; 
          } else if (highSide === 'front') {
              highWallIdx = 0; rakeWallIndices = [2, 3];
              getDistanceFromLow = (x, z) => lengthIn - z;
              isZRun = true;
              slopeRotX = angleRad; 
          } else if (highSide === 'right') {
              highWallIdx = 3; rakeWallIndices = [0, 1];
              getDistanceFromLow = (x, z) => x;
              isZRun = false;
              slopeRotZ = angleRad; 
          } else if (highSide === 'left') {
              highWallIdx = 2; rakeWallIndices = [0, 1];
              getDistanceFromLow = (x, z) => widthIn - x;
              isZRun = false;
              slopeRotZ = -angleRad; 
          }
          else {
              getDistanceFromLow = () => 0; // Fallback
          }

          const run = isZRun ? lengthIn : widthIn;
          const totalRise = run * Math.tan(angleRad);
          const wallTopHeight = heightIn; // Top of double top plate

          // --- 1. Generate High Wall Extension (Knee Wall) ---
          let hwStart: [number, number, number] = [0,0,0];
          let hwLen = 0;
          let hwAxisStr = '';
          
          if (highWallIdx === 0) { hwStart = [0, wallTopHeight, 0]; hwLen = widthIn; hwAxisStr = 'x'; }
          else if (highWallIdx === 1) { hwStart = [0, wallTopHeight, lengthIn]; hwLen = widthIn; hwAxisStr = 'x'; }
          else if (highWallIdx === 2) { hwStart = [0, wallTopHeight, 0]; hwLen = lengthIn; hwAxisStr = 'z'; }
          else if (highWallIdx === 3) { hwStart = [widthIn, wallTopHeight, 0]; hwLen = lengthIn; hwAxisStr = 'z'; }

          // Stud length for extension (minus top plate)
          const extensionStudLength = Math.max(0, totalRise - plateThickness);
          
          if (extensionStudLength > 0.5) {
              const studSpacing = config.studSpacing;
              const numStuds = Math.ceil(hwLen / studSpacing);
              
              // Top Plate of Extension
              const platePos: [number, number, number] = [...hwStart];
              if (hwAxisStr === 'x') {
                  platePos[0] += hwLen/2;
                  platePos[1] += totalRise - plateThickness/2;
                  platePos[2] += (highWallIdx === 1 ? -studDepth/2 : studDepth/2);
                  
                  addPart('High Wall Ext. Plate', 'plate', [hwLen, plateThickness, studDepth], platePos, [0,0,0], false, lumberType);
              } else {
                  platePos[2] += hwLen/2;
                  platePos[1] += totalRise - plateThickness/2;
                  platePos[0] += (highWallIdx === 3 ? -studDepth/2 : studDepth/2);

                  addPart('High Wall Ext. Plate', 'plate', [studDepth, plateThickness, hwLen], platePos, [0,0,0], false, lumberType);
              }

              // Extension Studs
              for(let i=0; i<=numStuds; i++) {
                  let offset = i * studSpacing;
                  if (offset > hwLen - studWidth) offset = hwLen - studWidth;
                  
                  let posX=0, posZ=0;
                  if (hwAxisStr === 'x') {
                       posX = offset + studWidth/2;
                       posZ = hwStart[2] + (highWallIdx === 1 ? -studDepth/2 : studDepth/2);
                  } else {
                       posX = hwStart[0] + (highWallIdx === 3 ? -studDepth/2 : studDepth/2);
                       posZ = offset + studWidth/2;
                  }

                  addPart(
                      'High Wall Ext. Stud', 'stud',
                      hwAxisStr === 'x' ? [studWidth, extensionStudLength, studDepth] : [studDepth, extensionStudLength, studWidth],
                      [posX, wallTopHeight + extensionStudLength/2, posZ],
                      [0,0,0],
                      false, lumberType
                  );
              }
          }

          // --- 2. Generate Rake Wall Extensions (Wedges) ---
          rakeWallIndices.forEach(idx => {
               let wLen = 0;
               let axis = 'x';
               let wallCoord = 0;
               
               if (idx === 0) { wLen = widthIn; axis = 'x'; wallCoord = 0; }
               else if (idx === 1) { wLen = widthIn; axis = 'x'; wallCoord = lengthIn; }
               else if (idx === 2) { wLen = lengthIn; axis = 'z'; wallCoord = 0; }
               else if (idx === 3) { wLen = lengthIn; axis = 'z'; wallCoord = widthIn; }

               // Determine intersection with High Wall and Low Wall to trim
               let trimStart = 0;
               let trimEnd = 0;
               
               // High Back (1): Side walls (2/3) touch at End. Low Front (0) touch at Start.
               if (highSide === 'back' && (idx === 2 || idx === 3)) { trimEnd = studDepth; trimStart = studDepth; }
               // High Front (0): Side walls touch at Start (High) and End (Low).
               if (highSide === 'front' && (idx === 2 || idx === 3)) { trimStart = studDepth; trimEnd = studDepth; }
               // High Right (3): Front/Back walls (0/1) touch at End (High) and Start (Low).
               if (highSide === 'right' && (idx === 0 || idx === 1)) { trimEnd = studDepth; trimStart = studDepth; }
               // High Left (2): Front/Back walls touch at Start (High) and End (Low).
               if (highSide === 'left' && (idx === 0 || idx === 1)) { trimStart = studDepth; trimEnd = studDepth; }

               // Determine center alignment for studs
               let centerOffset = studDepth/2;
               if (idx === 1 || idx === 3) centerOffset = -studDepth/2;
               const wallCenter = wallCoord + centerOffset;

               const numStuds = Math.ceil(wLen / config.studSpacing);
               
               for(let i=0; i<=numStuds; i++) {
                   let offset = i * config.studSpacing;
                   if (offset > wLen - studWidth) offset = wLen - studWidth;
                   
                   // SKIP STUDS THAT FALL INSIDE THE TRIMMED AREA (The High/Low Wall corners)
                   if (offset < trimStart - 0.1 || offset > wLen - trimEnd + 0.1) continue;
                   
                   let dist = 0;
                   if (axis === 'x') {
                       // Wall 0 or 1. Running X.
                       dist = getDistanceFromLow(offset, 0); 
                   } else {
                       // Wall 2 or 3. Running Z.
                       dist = getDistanceFromLow(0, offset); 
                   }
                   
                   const heightAtStud = dist * Math.tan(angleRad);
                   const studH = Math.max(0, heightAtStud - plateThickness);
                   
                   if (studH > 1) {
                        let sX = 0, sZ = 0;
                        let sRot: [number, number, number] = [0,0,0];
                        let isSlopeUp = false;

                        if (axis === 'x') {
                            sX = offset + studWidth/2;
                            sZ = wallCenter;
                            sRot = [0,0,0];
                            isSlopeUp = (highSide === 'right');
                        } else {
                            sX = wallCenter;
                            sZ = offset + studWidth/2;
                            sRot = [0, -Math.PI/2, 0];
                            isSlopeUp = (highSide === 'back');
                        }

                        // Generate Cut Path (Trapezoid)
                        const halfW = studWidth / 2;
                        const drop = halfW * Math.tan(angleRad);
                        
                        const yLeft = isSlopeUp ? studH - drop : studH + drop;
                        const yRight = isSlopeUp ? studH + drop : studH - drop;
                        
                        const safeYLeft = Math.max(0.1, yLeft);
                        const safeYRight = Math.max(0.1, yRight);
                        
                        const path = [
                            { x: -halfW, y: 0 },
                            { x: halfW, y: 0 },
                            { x: halfW, y: safeYRight },
                            { x: -halfW, y: safeYLeft }
                        ];

                        const studPos: [number, number, number] = [sX, wallTopHeight, sZ];
                        const pathDims: [number, number, number] = [studDepth, studH, studWidth]; 

                        addPart('Rake Stud', 'stud', pathDims, studPos, sRot, false, lumberType, path);
                   }
               }

               // Rake Top Plate - Adjusted for Trim
               const effectiveRun = wLen - trimStart - trimEnd;
               
               if (effectiveRun > 0) {
                   const rakeLen = effectiveRun / Math.cos(angleRad);
                   
                   // Calculate center of the effective run
                   const localCenter = trimStart + (effectiveRun / 2);
                   
                   let midDist = 0;
                   if (axis === 'x') {
                        midDist = getDistanceFromLow(localCenter, 0);
                   } else {
                        midDist = getDistanceFromLow(0, localCenter);
                   }
                     
                   const midHeight = midDist * Math.tan(angleRad);
                   const plateY = wallTopHeight + midHeight; // Pivot point is bottom center due to rotation offset? No.
                   
                   // Fix for Rake Plate Intersection:
                   // The plate is angled. The standard positioning puts the center at mid-height.
                   // The bottom corners dip down. We need to lift it or trim slightly more.
                   // However, with trimStart/trimEnd handling the corner overlap, we just need to place it correctly.
                   // The pivot point for the plate rotation is the center of the box.
                   // Y position should be `wallTopHeight + midHeight` minus the vertical drop of half-thickness.
                   // Drop = (thickness/2) / cos(angle).
                   const plateCenterY = wallTopHeight + midHeight - (plateThickness/2)/Math.cos(angleRad); // Approx correction?
                   // Actually existing code was `wallTopHeight + midHeight - plateThickness/2`.
                   // Let's stick to simple placement but trust the trim.

                   let pX=0, pZ=0;
                   let rot: [number, number, number] = [0,0,0];

                   if (axis === 'x') {
                       pX = localCenter;
                       pZ = wallCenter;
                       rot = [0, 0, slopeRotZ]; 
                       addPart('Rake Plate', 'plate', [rakeLen, plateThickness, studDepth], [pX, plateY, pZ], rot, false, lumberType);
                   } else {
                       pZ = localCenter;
                       pX = wallCenter;
                       rot = [slopeRotX, 0, 0];
                       addPart('Rake Plate', 'plate', [studDepth, plateThickness, rakeLen], [pX, plateY, pZ], rot, false, lumberType);
                   }
               }
          });

          // --- 3. Generate Rafters (With Birdmouths) ---
          const rafterSpacing = 24;
          const widthOfSpan = isZRun ? widthIn : lengthIn; 
          const numRafters = Math.ceil(widthOfSpan / rafterSpacing);
          
          const actualLen = (run + overhang * 2) / Math.cos(angleRad);

          // Generate Shed Rafter Path (with birdmouth cuts)
          // Returns points for the 2D Shape relative to the rafter center.
          const getShedRafterPath = () => {
              // We define the shape in "Global Vertical Space" first (X=Run, Y=Rise), then rotate points by -angle to get Local.
              // Origin (0,0) for calculation is the Low Wall Outer Corner (Top of Plate).
              
              const tanA = Math.tan(angleRad);
              const cosA = Math.cos(angleRad);
              const sinA = Math.sin(angleRad);

              // Heuristic for Heel Height (HAP) - Ensure rafter sits nicely on plate
              // We want a minimum heel (vertical cut) above the plate.
              const minHeel = 1.0; 
              // C_bot is the Y-intercept of the bottom rafter line relative to pivot (0,0).
              // At x=studDepth (inner edge of low plate), we want Y >= minHeel.
              // Y_at_inner = studDepth * tanA + C_bot >= minHeel
              const C_bot = Math.max(0.25, minHeel - (studDepth * tanA));

              // Define Points (Global Coords relative to Low Wall Pivot)
              // Top Surface: y = x*tanA + C_bot + depth/cosA
              // Bottom Surface: y = x*tanA + C_bot
              
              const pts = [];

              // 1. Tail End
              const tailX = -overhang;
              const tailYBot = tailX * tanA + C_bot;
              const tailYTop = tailX * tanA + C_bot + (rafterDepth / cosA);
              
              pts.push({x: tailX, y: tailYTop}); // Tail Top
              pts.push({x: tailX, y: tailYBot}); // Tail Bottom

              // 2. Low Birdmouth
              // "Toe" (Vertical cut at wall line)
              pts.push({x: 0, y: C_bot});
              // "Seat" (Horizontal cut on plate)
              pts.push({x: 0, y: 0});
              pts.push({x: studDepth, y: 0});
              // "Heel" (Vertical cut at inner wall line)
              const lowHeelY = studDepth * tanA + C_bot;
              pts.push({x: studDepth, y: lowHeelY});

              // 3. High Birdmouth
              // Calculate High Wall Position
              const highWallX = run;
              const highPlateY = run * tanA; // Rise
              const highInnerX = run - studDepth;

              // Bottom surface line continues to high heel
              // High Heel (Vertical cut at inner wall line)
              const highHeelY = highInnerX * tanA + C_bot;
              pts.push({x: highInnerX, y: highHeelY});
              
              // High Seat (Horizontal cut on plate)
              pts.push({x: highInnerX, y: highPlateY});
              pts.push({x: highWallX, y: highPlateY});

              // High Toe (Vertical cut at outer wall line)
              const highToeY = highWallX * tanA + C_bot;
              pts.push({x: highWallX, y: highToeY});

              // 4. Head End
              const headX = run + overhang;
              const headYBot = headX * tanA + C_bot;
              const headYTop = headX * tanA + C_bot + (rafterDepth / cosA);

              pts.push({x: headX, y: headYBot});
              pts.push({x: headX, y: headYTop});

              // Rotate all points by -angle to align with local X axis
              const rotatedPts = pts.map(p => {
                  return {
                      x: p.x * cosA + p.y * sinA,
                      y: -p.x * sinA + p.y * cosA
                  };
              });
              
              // Shift so the center of the bounding box is (0,0) for easier placement?
              // Or better, align so the pivot (0,0 original) is at a known spot.
              // The pivot (0,0) rotated is (0,0).
              // So if we place the part at the Low Wall Corner, the shape will be correct.
              return rotatedPts.reverse(); // Ensure standard winding
          };

          const rafterPath = getShedRafterPath();
          
          for(let i=0; i<=numRafters; i++) {
              let offset = i * rafterSpacing;
              if (offset > widthOfSpan) offset = widthOfSpan;
              if (i === numRafters) offset = widthOfSpan - rafterThickness/2;
              if (i === 0) offset = rafterThickness/2;

              let posX = 0, posZ = 0, posY = wallTopHeight; 
              let rot: [number, number, number] = [0,0,0];

              // We position the rafter at the Low Wall Corner (Top).
              // The custom path handles the slope and length relative to this pivot.
              
              if (isZRun) {
                  // Front/Back run. Rafters run along Z. Spaced along X.
                  posX = offset;
                  if (highSide === 'back') {
                      // Front Low (Z=0). Rafter runs Z+.
                      posZ = 0;
                      rot = [0, -Math.PI/2, angleRad]; // Fixed: Positive angle to pitch up
                  } else {
                      // Back Low (Z=Length). Rafter runs Z-.
                      posZ = lengthIn;
                      rot = [0, Math.PI/2, angleRad]; 
                  }
              } else {
                  // Left/Right run. Rafters run along X. Spaced along Z.
                  posZ = offset;
                  if (highSide === 'right') {
                      // Left Low (X=0). Rafter runs X+.
                      posX = 0;
                      rot = [0, 0, angleRad];
                  } else {
                      // Right Low (X=Width). Rafter runs X-.
                      posX = widthIn;
                      rot = [0, Math.PI, angleRad]; // Fixed: Positive angle to pitch up
                  }
              }

              addPart(
                  'Shed Rafter',
                  'rafter',
                  [rafterThickness, rafterDepth, actualLen], // Dimensions for optimization only
                  [posX, posY, posZ],
                  rot,
                  false,
                  rafterNominal,
                  rafterPath
              );
          }

      } else {
        // GABLE ROOF LOGIC (Original)
        const PITCH = config.roofPitch || 6; 
        const STANDARD_OVERHANG = 12;

        const hasFrontNeighbor = hasNeighbor(0);
        const hasBackNeighbor = hasNeighbor(1);
        const hasLeftNeighbor = hasNeighbor(2);
        const hasRightNeighbor = hasNeighbor(3);

        const frontOverhang = hasFrontNeighbor ? 0 : STANDARD_OVERHANG;
        const backOverhang = hasBackNeighbor ? 0 : STANDARD_OVERHANG;
        const leftOverhang = hasLeftNeighbor ? 0 : STANDARD_OVERHANG;
        const rightOverhang = hasRightNeighbor ? 0 : STANDARD_OVERHANG;

        const angleRad = Math.atan(PITCH / 12);
        
        const rafterNominal = '2x6';
        const rafterDims = LUMBER_DIMENSIONS[rafterNominal];
        const rafterDepth = rafterDims.depth; 
        const rafterThickness = rafterDims.thickness; 

        const ridgeNominal = '2x10'; 
        const ridgeDims = LUMBER_DIMENSIONS[ridgeNominal];
        const ridgeDepth = ridgeDims.depth; 
        const ridgeThickness = ridgeDims.thickness; 

        const fasciaNominal = '1x8';
        const fasciaDepth = 7.25; 
        const fasciaThickness = 0.75;
        
        const joistNominal = '2x6';
        const joistDims = LUMBER_DIMENSIONS[joistNominal];
        const joistDepth = joistDims.depth; 

        const centerX = widthIn / 2;
        const wallOuterX = centerX; 
        const wallInnerX = centerX - studDepth; 
        
        const roofBaseY = heightIn + joistDepth;
        const verticalDepth = rafterDepth / Math.cos(angleRad);
        const peakY = roofBaseY + (wallInnerX * Math.tan(angleRad)) + verticalDepth;
        
        const ridgeHalfThick = ridgeThickness / 2;
        
        // Function to generate rafter path based on variable overhang
        const getRafterPath = (overhang: number) => {
            const tailX = wallOuterX + overhang;
            const ptRidgeTop = { x: ridgeHalfThick, y: peakY - (ridgeHalfThick * Math.tan(angleRad)) };
            const ptTailTop = { x: tailX, y: peakY - (tailX * Math.tan(angleRad)) };
            const ptTailBottom = { x: tailX, y: ptTailTop.y - verticalDepth };
            
            const yAtWallOuter = peakY - (wallOuterX * Math.tan(angleRad)) - verticalDepth;
            const ptHeel = { x: wallOuterX, y: yAtWallOuter };
            
            const ptSeatCorner = { x: wallOuterX, y: roofBaseY };
            const ptSeatInner = { x: wallInnerX, y: roofBaseY };
            
            const ptRidgeBottom = {
                x: ridgeHalfThick,
                y: peakY - (ridgeHalfThick * Math.tan(angleRad)) - verticalDepth
            };

            return [
                ptRidgeTop,
                ptTailTop,
                ptTailBottom,
                ptHeel,
                ptSeatCorner,
                ptSeatInner,
                ptRidgeBottom
            ];
        };

        const rightRafterPath = getRafterPath(rightOverhang);
        const leftRafterPath = getRafterPath(leftOverhang).map(p => ({ x: -p.x, y: p.y }));

        // Function to calculate cut length based on overhang
        const getCutLength = (overhang: number) => {
            const tailX = wallOuterX + overhang;
            const ptRidgeTopX = ridgeHalfThick;
            const ptRidgeTopY = peakY - (ridgeHalfThick * Math.tan(angleRad));
            const ptTailTopY = peakY - (tailX * Math.tan(angleRad));
            
            const dx = tailX - ptRidgeTopX;
            const dy = ptRidgeTopY - ptTailTopY;
            return Math.ceil(Math.sqrt(dx*dx + dy*dy));
        };

        const cutLengthRight = getCutLength(rightOverhang);
        const cutLengthLeft = getCutLength(leftOverhang);
        
        const ridgeTopY = peakY; 
        
        const ridgeLen = lengthIn + frontOverhang + backOverhang;
        const ridgeZCenter = (lengthIn + backOverhang - frontOverhang) / 2;

        addPart(
            'Ridge Board',
            'ridge',
            [ridgeThickness, ridgeDepth, ridgeLen], 
            [widthIn / 2, ridgeTopY - (ridgeDepth/2), ridgeZCenter],
            [0, 0, 0],
            false,
            ridgeNominal
        );
        
        const rafterSpacing = 24; 
        const numRafters = Math.ceil(lengthIn / rafterSpacing);

        for (let i = 0; i <= numRafters; i++) {
            let zPos = i * rafterSpacing;
            
            if (i === 0) zPos = rafterThickness / 2; 
            else if (i === numRafters) zPos = lengthIn - rafterThickness / 2;
            else if (zPos > lengthIn) zPos = lengthIn - rafterThickness / 2;

            // Common Rafter Right
            addPart(
                'Common Rafter',
                'rafter',
                [rafterThickness, rafterDepth, cutLengthRight],
                [widthIn / 2, 0, zPos], 
                [0, 0, 0],
                false,
                rafterNominal,
                rightRafterPath
            );

            // Common Rafter Left
            addPart(
                'Common Rafter',
                'rafter',
                [rafterThickness, rafterDepth, cutLengthLeft],
                [widthIn / 2, 0, zPos],
                [0, 0, 0],
                false,
                rafterNominal,
                leftRafterPath 
            );

            // Ceiling Joist
            addPart(
                'Ceiling Joist',
                'joist',
                [widthIn, joistDepth, 1.5], 
                [widthIn / 2, heightIn + joistDepth/2, zPos],
                [0, 0, 0],
                false,
                joistNominal
            );
        }
        
        const calculateFasciaY = (overhang: number) => {
            const tailX = wallOuterX + overhang;
            const ptTailTopY = peakY - (tailX * Math.tan(angleRad));
            const ptTailBottomY = ptTailTopY - verticalDepth;
            return (ptTailTopY + ptTailBottomY) / 2;
        };

        const fasciaLen = ridgeLen;
        const fasciaZ = ridgeZCenter;

        // Right Fascia
        const tailXRight = wallOuterX + rightOverhang;
        const fasciaXRight = tailXRight + (fasciaThickness/2);
        const fasciaYRight = calculateFasciaY(rightOverhang);

        addPart(
            'Fascia Board', 'fascia',
            [fasciaThickness, fasciaDepth, fasciaLen],
            [widthIn/2 + fasciaXRight, fasciaYRight, fasciaZ],
            [0, 0, 0], false, fasciaNominal
        );
        
        // Left Fascia
        const tailXLeft = wallOuterX + leftOverhang;
        const fasciaXLeft = tailXLeft + (fasciaThickness/2);
        const fasciaYLeft = calculateFasciaY(leftOverhang);

        addPart(
            'Fascia Board', 'fascia',
            [fasciaThickness, fasciaDepth, fasciaLen],
            [widthIn/2 - fasciaXLeft, fasciaYLeft, fasciaZ],
            [0, 0, 0], false, fasciaNominal
        );
      }
  }

  return parts;
};
