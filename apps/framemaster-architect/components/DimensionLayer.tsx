import React from 'react';
import { Text, Line, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { RoomConfig } from '../types';

interface DimensionLayerProps {
  room: RoomConfig | undefined;
  visible: boolean;
}

interface DimLineProps {
  start: [number, number, number];
  end: [number, number, number];
  text: string;
  offsetDir: [number, number, number];
  offsetAmt?: number;
}

const DimLine: React.FC<DimLineProps> = ({ start, end, text, offsetDir, offsetAmt = 12 }) => {
    // Calculate offset positions
    const pStart = new THREE.Vector3(...start);
    const pEnd = new THREE.Vector3(...end);
    
    // Direction vector for the line
    const dir = new THREE.Vector3().subVectors(pEnd, pStart).normalize();
    
    // Offset vector
    const off = new THREE.Vector3(...offsetDir).multiplyScalar(offsetAmt);
    
    const lStart = pStart.clone().add(off);
    const lEnd = pEnd.clone().add(off);
    
    const center = new THREE.Vector3().addVectors(lStart, lEnd).multiplyScalar(0.5);

    // Tick marks logic
    // Ticks should be perpendicular to the measurement line and the offset direction usually
    // Simple heuristic: Cross product with Y up, unless line is vertical
    let tickDir = dir.clone().cross(new THREE.Vector3(0, 1, 0));
    if (tickDir.lengthSq() < 0.01) {
        // Line is vertical, cross with X
        tickDir = new THREE.Vector3(1, 0, 0); 
    }
    tickDir.normalize().multiplyScalar(4); // 4 inch tick mark

    return (
        <group>
            {/* Main Line */}
            <Line points={[lStart, lEnd]} color="white" lineWidth={1} opacity={0.8} transparent />
            
            {/* Ticks */}
            <Line points={[lStart.clone().sub(tickDir), lStart.clone().add(tickDir)]} color="white" lineWidth={1} opacity={0.8} transparent />
            <Line points={[lEnd.clone().sub(tickDir), lEnd.clone().add(tickDir)]} color="white" lineWidth={1} opacity={0.8} transparent />
            
            {/* Extension lines (from object to dim line) */}
            <Line points={[pStart, lStart]} color="#666" lineWidth={0.5} dashed dashScale={4} gapSize={2} opacity={0.5} transparent />
            <Line points={[pEnd, lEnd]} color="#666" lineWidth={0.5} dashed dashScale={4} gapSize={2} opacity={0.5} transparent />

            {/* Text */}
            <Billboard position={center.toArray()}>
                <Text 
                    fontSize={6} 
                    color="white" 
                    anchorX="center" 
                    anchorY="middle" 
                    outlineWidth={0.5}
                    outlineColor="#000"
                    renderOrder={100} // Ensure text renders on top of grid/lines
                >
                    {text}
                </Text>
            </Billboard>
        </group>
    );
};

export const DimensionLayer: React.FC<DimensionLayerProps> = ({ room, visible }) => {
    if (!visible || !room) return null;

    const x = room.position.x * 12;
    const z = room.position.z * 12;
    const w = room.width * 12;
    const l = room.length * 12;
    const h = room.wallHeight * 12;

    const format = (inches: number) => {
        const ft = Math.floor(inches / 12);
        const inc = Math.round(inches % 12 * 10) / 10;
        return `${ft}' ${inc}"`;
    };

    const offset = 24; // 2ft offset for dimensions
    
    // Lift dimensions slightly off the ground (y=0) to prevent Z-fighting with the Grid (at y=-0.1)
    const yLevel = 2; 

    return (
        <group>
             {/* Front Width */}
             <DimLine 
                start={[x, yLevel, z]} 
                end={[x + w, yLevel, z]} 
                text={format(w)} 
                offsetDir={[0, 0, -1]} 
                offsetAmt={offset} 
            />
             {/* Back Width */}
             <DimLine 
                start={[x, yLevel, z + l]} 
                end={[x + w, yLevel, z + l]} 
                text={format(w)} 
                offsetDir={[0, 0, 1]} 
                offsetAmt={offset} 
            />
            {/* Left Length */}
             <DimLine 
                start={[x, yLevel, z]} 
                end={[x, yLevel, z + l]} 
                text={format(l)} 
                offsetDir={[-1, 0, 0]} 
                offsetAmt={offset} 
            />
            {/* Right Length */}
             <DimLine 
                start={[x + w, yLevel, z]} 
                end={[x + w, yLevel, z + l]} 
                text={format(l)} 
                offsetDir={[1, 0, 0]} 
                offsetAmt={offset} 
            />
            
            {/* Height (at Front Left Corner) */}
             <DimLine 
                start={[x, yLevel, z]} 
                end={[x, h, z]} 
                text={format(h)} 
                offsetDir={[-1, 0, -1]} 
                offsetAmt={12} 
            />
        </group>
    );
};