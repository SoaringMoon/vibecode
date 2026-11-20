
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, Center, BakeShadows, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { LumberPart, RoomConfig } from '../types';
import { COLORS } from '../utils/constants';
import { DimensionLayer } from './DimensionLayer';

interface FramingViewerProps {
  parts: LumberPart[];
  highlightedIds: string[];
  onSelectWall: (index: 0 | 1 | 2 | 3) => void;
  onSelectRoom: (roomId: string) => void;
  activeRoomId: string;
  rooms: RoomConfig[];
  selectedWallIndex: 0 | 1 | 2 | 3;
  showDimensions: boolean;
}

const LumberMesh: React.FC<{ 
    part: LumberPart; 
    isHighlighted: boolean; 
    isActiveContext: boolean;
    onSelectWall: (index: 0 | 1 | 2 | 3) => void; 
    onSelectRoom: (id: string) => void 
}> = React.memo(({ part, isHighlighted, isActiveContext, onSelectWall, onSelectRoom }) => {
  
  // Color Logic: 
  // 1. Explicitly Highlighted (CutList) -> Blue (#3b82f6)
  // 2. Active Context (Current Wall/Room) -> Amber (#f59e0b)
  // 3. Default -> Wood
  
  let color = part.color;
  let emissive = new THREE.Color(0x000000);
  let emissiveIntensity = 0;

  if (isHighlighted) {
      color = '#3b82f6'; // Blueprint Blue
      emissive = new THREE.Color(0x1e40af);
      emissiveIntensity = 0.4;
  } else if (isActiveContext) {
      color = '#f59e0b'; // Amber-500
      emissive = new THREE.Color(0x92400e);
      emissiveIntensity = 0.1;
  }

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelectRoom(part.roomId);
    if (part.wallIndex !== undefined) {
      onSelectWall(part.wallIndex as 0 | 1 | 2 | 3);
    }
  };

  const shape = useMemo(() => {
    if (!part.path) return null;
    const s = new THREE.Shape();
    part.path.forEach((p, i) => {
      if (i === 0) s.moveTo(p.x, p.y);
      else s.lineTo(p.x, p.y);
    });
    s.closePath();
    
    // Process Holes
    if (part.holes && part.holes.length > 0) {
        part.holes.forEach(holePath => {
            const h = new THREE.Path();
            holePath.forEach((p, i) => {
                if (i === 0) h.moveTo(p.x, p.y);
                else h.lineTo(p.x, p.y);
            });
            h.closePath();
            s.holes.push(h);
        });
    }
    
    return s;
  }, [part.path, part.holes]);

  if (part.path && shape) {
    const thickness = part.type === 'sheathing' ? part.actualDimensions[2] : part.actualDimensions[0];
    
    const extrudeSettings = {
      depth: thickness, 
      bevelEnabled: false,
    };

    // Use a Group to handle position/rotation, and a child Mesh to handle centering the extrusion locally
    return (
      <group position={part.position} rotation={part.rotation}>
        <mesh
            position={[0, 0, -thickness/2]}
            castShadow
            receiveShadow
            onClick={handleClick}
        >
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshStandardMaterial 
                color={color} 
                roughness={0.8} 
                metalness={0.05} 
                side={THREE.DoubleSide} 
                emissive={emissive}
                emissiveIntensity={emissiveIntensity}
            />
            <lineSegments>
            <edgesGeometry args={[new THREE.ExtrudeGeometry(shape, extrudeSettings)]} />
            <lineBasicMaterial color={isHighlighted ? "#93c5fd" : "#3f2e00"} opacity={0.3} transparent />
            </lineSegments>
        </mesh>
      </group>
    );
  }

  // Fallback for standard boxes
  return (
    <mesh
      position={part.position}
      rotation={part.rotation}
      castShadow
      receiveShadow
      onClick={handleClick}
    >
      <boxGeometry args={part.actualDimensions} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.7} 
        metalness={0.1}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...part.actualDimensions)]} />
        <lineBasicMaterial color={isHighlighted ? "#93c5fd" : "#3f2e00"} opacity={0.3} transparent />
      </lineSegments>
    </mesh>
  );
});

const FramingViewer: React.FC<FramingViewerProps> = ({ 
    parts, 
    highlightedIds, 
    onSelectWall, 
    onSelectRoom,
    activeRoomId,
    rooms,
    selectedWallIndex,
    showDimensions
}) => {
  const activeRoom = useMemo(() => rooms.find(r => r.id === activeRoomId), [rooms, activeRoomId]);

  return (
    <div className="w-full h-full bg-[#0f0f0f] rounded-none overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 bg-black/80 text-neutral-300 p-3 rounded-sm text-[10px] backdrop-blur-sm border border-white/10 pointer-events-none uppercase tracking-wide">
        <p className="font-bold mb-1 text-white">Viewport Controls</p>
        <div className="flex flex-col gap-0.5 opacity-80">
            <p>Left Click: Select Part</p>
            <p>Right Click: Pan</p>
            <p>Scroll: Zoom</p>
        </div>
        <div className="mt-2 border-t border-white/10 pt-2 text-amber-500 font-bold">
           Active Wall Highlighted (Amber)
        </div>
      </div>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [-150, 150, 250], fov: 40 }}>
        <color attach="background" args={['#0f0f0f']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight 
            position={[100, 200, 50]} 
            intensity={1.0} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
        >
             <orthographicCamera attach="shadow-camera" args={[-200, 200, 200, -200]} />
        </directionalLight>

        <Environment preset="city" />
        <BakeShadows />

        <Center top>
            <group>
            {parts.map((part) => (
                <LumberMesh 
                    key={part.id} 
                    part={part} 
                    isHighlighted={highlightedIds.includes(part.id)} 
                    isActiveContext={part.roomId === activeRoomId && part.wallIndex === selectedWallIndex && highlightedIds.length === 0}
                    onSelectWall={onSelectWall}
                    onSelectRoom={onSelectRoom}
                />
            ))}
            </group>
            
            <DimensionLayer room={activeRoom} visible={showDimensions} />
        </Center>
        
        <Grid 
            position={[0, -0.1, 0]} 
            args={[1000, 1000]} 
            cellSize={12} 
            cellThickness={0.5} 
            sectionSize={48} 
            sectionThickness={1.0} 
            fadeDistance={400}
            sectionColor="#333333" 
            cellColor="#1a1a1a" 
            infiniteGrid
        />
        
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} />
        
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="white" />
        </GizmoHelper>
      </Canvas>
    </div>
  );
};

export default FramingViewer;
