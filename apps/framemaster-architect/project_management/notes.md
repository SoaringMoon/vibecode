
# Application Design Notes

## Core Features
- **3D Viewer**: Uses React Three Fiber.
- **Parametric Framing**: Logic in `utils/framingLogic.ts`.
- **Rooms**: Multiple room support with adjacency detection for openings.
- **Dimensions**: Real-time 3D measurement lines for room dimensions.
- **Roof Styles**: 
  - **Gable**: Standard symmetrical gable.
  - **Shed**: Single slope roof with configurable high side (Front, Back, Left, Right) and pitch.

## Data Structure
- `RoomConfig` defines dimensions, openings, and toggles (Roof, Sheathing).
- **New Roof Properties**: `roofType` ('gable' | 'shed'), `roofPitch`, `roofHighSide`.
- `LumberPart` defines generated 3D objects. Now supports `holes` for complex shapes (e.g. Sheathing cutouts).
- `nominalSize` is used for cut lists and pricing.

## Persistence Schema
- **Storage Key**: `framemaster_project_v1`
- **JSON Structure**:
  ```json
  {
    "rooms": [ ... ],
    "activeRoomId": "string",
    "priceSettings": { "2x4": 0.85, "4x8": 25.00, ... },
    "version": "1.0",
    "updatedAt": "ISOString"
  }
  ```
- **Autosave**: Triggers on `rooms` or `activeRoomId` change using `localStorage`.

## UI / Layout (Dark Theme)
- **High Contrast Dark Mode**: Primary background `#171717`.
- **Layout**: 
  - Left: Controls (Persistent, Neutral-900)
  - Center: 3D Viewport (Canvas #0f0f0f)
  - Right: Materials (Collapsible, Neutral-900)
- **Typography**: Sans-serif, technical styling (uppercase labels, monospace numbers).
- **Accents**: 
  - Action/Select: Blueprint Blue (`#3b82f6`)
  - Warning/Context: Amber (`#f59e0b`)

## Optimization & Materials
- **Cut List**: Shows exact geometry lengths.
- **Purchase List**: Generates a stock order using a bin-packing heuristic (`utils/optimization.ts`).
  - Identifies Pre-cut studs (approx 92-5/8" and 104-5/8").
  - Optimizes linear lumber into stock lengths (8', 10', 12', 14', 16', 20').
  - **Sheathing**: Counts full 4x8 sheets required based on generated panel count (simple count, naive optimization).
- **Cost Estimation**:
  - Purchase List cost is based on the volume of the stock boards (includes waste) or unit count for sheets.
  - Cut List cost is theoretical minimum (excludes waste).
  - Sheathing pricing is usually per sheet, mapped to "4x8" key in price settings.

## Future Improvements
- **Roof**: 
  - Hip Roofs.
  - Complex intersections (valleys).
  - Soffit/Fascia for Shed roofs.
- **Sheathing**: Plywood calculations for roof sheathing.
- **Interaction**: Click-to-edit dimensions directly in 3D view.