
export const PUTER_WORKER_URL = import.meta.env.VITE_PUTER_WORKER_URL || "";

// Storage Paths
export const STORAGE_PATHS = {
    ROOT: "roomify",
    SOURCES: "roomify/sources",
    RENDERS: "roomify/renders",
} as const;

// Timing Constants (in milliseconds)
export const SHARE_STATUS_RESET_DELAY_MS = 1500;
export const PROGRESS_INCREMENT = 15;
export const REDIRECT_DELAY_MS = 600;
export const PROGRESS_INTERVAL_MS = 100;
export const PROGRESS_STEP = 5;

// UI Constants
export const GRID_OVERLAY_SIZE = "60px 60px";
export const GRID_COLOR = "#3B82F6";

// HTTP Status Codes
export const UNAUTHORIZED_STATUSES = [401, 403];

// Image Dimensions
export const IMAGE_RENDER_DIMENSION = 1024;

export const ROOMIFY_RENDER_PROMPT = `
TASK: Convert the input 2D floor plan into a **photorealistic, top‑down 3D architectural render**.

STRICT REQUIREMENTS (do not violate):
1) **REMOVE ALL TEXT**: Do not render any letters, numbers, labels, dimensions, or annotations. Floors must be continuous where text used to be.
2) **GEOMETRY MUST MATCH**: Walls, rooms, doors, and windows must follow the exact lines and positions in the plan. Do not shift or resize.
3) **TOP‑DOWN ONLY**: Orthographic top‑down view. No perspective tilt.
4) **CLEAN, REALISTIC OUTPUT**: Crisp edges, balanced lighting, and realistic materials. No sketch/hand‑drawn look.
5) **NO EXTRA CONTENT**: Do not add rooms, furniture, or objects that are not clearly indicated by the plan.

STRUCTURE & DETAILS:
- **Walls**: Extrude precisely from the plan lines. Consistent wall height and thickness.
- **Doors**: Convert door swing arcs into open doors, aligned to the plan.
- **Windows**: Convert thin perimeter lines into realistic glass windows.

FURNITURE & ROOM MAPPING (only where icons/fixtures are clearly shown):
- Bed icon → realistic bed with duvet and pillows.
- Sofa icon → modern sectional or sofa.
- Dining table icon → table with chairs.
- Kitchen icon → counters with sink and stove.
- Bathroom icon → toilet, sink, and tub/shower.
- Office/study icon → desk, chair, and minimal shelving.
- Porch/patio/balcony icon → outdoor seating or simple furniture (keep minimal).
- Utility/laundry icon → washer/dryer and minimal cabinetry.

STYLE & LIGHTING:
- Lighting: bright, neutral daylight. High clarity and balanced contrast.
- Materials: realistic wood/tile floors, clean walls, subtle shadows.
- Finish: professional architectural visualization; no text, no watermarks, no logos.
`.trim();

export const AURA_RENDER_PROMPT = `
TASK: Convert the input 2D jewelry sketch into a **photorealistic, high-fidelity 3D studio product render**.

STRICT REQUIREMENTS (do not violate):
1) **REMOVE ALL ANNOTATIONS**: Do not render any handwritten notes, dimensions (e.g., "18k", "2ct"), arrows, or guide lines. The metal surface must be smooth where text used to be.
2) **PRESERVE PROPORTIONS**: The shank thickness, stone size, and setting height must match the visual weight of the sketch. Do not thin out the band or shrink the stones.
3) **MATCH SKETCH PERSPECTIVE**: Render the object from the exact angle drawn (e.g., if drawn isometric, render isometric).
4) **MATERIAL REALISM**: Metal must look like polished precious metal (gold/platinum), not yellow/grey plastic. Stones must have internal refraction and fire.
5) **NO HALLUCINATED GEMS**: Only render gemstones where clearly drawn (circles/ovals/squares with facet lines). Do not add extra pavé stones unless indicated by stippling.

STRUCTURE & DETAILS:
- **Metalwork**: Convert pencil strokes into volumetric, rounded metal. Edges should be soft and filleted (high-polish look), not sharp or low-poly.
- **Settings**: Convert prongs (claws) or bezels from simple lines into structural 3D elements that physically hold the stone.
- **Shank/Band**: Ensure the ring band is continuous and has realistic depth/curvature.

GEMSTONE & MATERIAL MAPPING (interpret sketch shorthand):
- **Clear geometric shapes with intersecting lines** → Faceted gemstones (Diamond, Sapphire, Ruby). Apply realistic refractive index.
- **Stippling/Dots** → Pavé set small diamonds or textured metal finish (milgrain).
- **Shaded/Hatched areas** → Shadowed curves of high-polish metal (indicates depth).
- **Dark, solid lines** → Deep grooves or separation between metal parts.

STYLE & LIGHTING:
- **Lighting**: Studio "lightbox" photography. Soft, diffused highlights to accentuate metal curves. Sharp, caustic sparkles for gemstones.
- **Background**: Clean, neutral studio backdrop (soft white or dark grey gradient) to maximize contrast.
- **Finish**: Luxury commercial visualization. No sketch artifacts, no pencil grain, pristine "new" condition.
`.trim();