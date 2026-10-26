import { clientTypes } from '../../data/clients';

// 2:1 isometric projection on a 10×10 grid inside a 480×320 viewBox.
const VIEW_W = 480;
const VIEW_H = 320;
const UNIT = 20;
const ORIGIN = { x: 240, y: 70 };

type Point = [number, number];

function iso(x: number, y: number, z = 0): Point {
  return [ORIGIN.x + (x - y) * UNIT, ORIGIN.y + (x + y) * (UNIT / 2) - z * UNIT];
}

const pts = (...points: Point[]) => points.map((p) => p.join(',')).join(' ');

interface Palette {
  top: string;
  left: string;
  right: string;
}

const palettes: Record<string, Palette> = {
  coral: { top: '#FBC3B0', left: '#F2876A', right: '#D9663F' },
  lilac: { top: '#EEE8FB', left: '#C9BCEF', right: '#A592DC' },
  butter: { top: '#FFF4C2', left: '#F7CF4F', right: '#D9A916' },
  peach: { top: '#FFEBD6', left: '#F5C08C', right: '#DE9C5E' },
  mint: { top: '#E6F6EC', left: '#A6D9BB', right: '#74B892' },
  rose: { top: '#FDE5EB', left: '#F2A9BC', right: '#D9809A' },
  ice: { top: '#E8F3FC', left: '#A9CDEE', right: '#7AAFE0' },
  fog: { top: '#F5F6F9', left: '#D3D7E0', right: '#A9AFBD' },
};

interface Building {
  kind: 'building';
  x: number;
  y: number;
  dx: number;
  dy: number;
  h: number;
  palette: Palette;
  label?: PinLabel;
}

interface PinLabel {
  /** Id of the client type shown on this building. */
  client: string;
  /** Which side of the roof centre the label sits on. Defaults to centred. */
  align?: 'left' | 'center' | 'right';
  /** Nudge in viewBox units. */
  dx?: number;
  dy?: number;
}

interface Tree {
  kind: 'tree';
  x: number;
  y: number;
}

// Roofs sit close together, so long labels are aligned and nudged to avoid overlapping.
// Buildings without a `label` are decoration.
const buildings: Building[] = [
  { kind: 'building', x: 1, y: 1, dx: 2, dy: 2, h: 2, palette: palettes.coral, label: { client: 'revenue', align: 'right', dx: 15 } },
  { kind: 'building', x: 1, y: 6.5, dx: 2, dy: 2, h: 1.5, palette: palettes.peach, label: { client: 'welfare' } },
  { kind: 'building', x: 6.5, y: 6.5, dx: 1.5, dy: 1.5, h: 3, palette: palettes.rose },
  { kind: 'building', x: 4.2, y: 6.2, dx: 1.6, dy: 2.2, h: 2.2, palette: palettes.mint, label: { client: 'agriculture', dy: 12 } },
  { kind: 'building', x: 4, y: 3.2, dx: 1.5, dy: 1.2, h: 1, palette: palettes.fog },
  { kind: 'building', x: 4, y: 0.8, dx: 1.6, dy: 1.6, h: 3.5, palette: palettes.lilac, label: { client: 'geospatial', align: 'left', dx: -14 } },
  { kind: 'building', x: 8, y: 6, dx: 1.6, dy: 3, h: 5, palette: palettes.ice, label: { client: 'healthcare' } },
  { kind: 'building', x: 7, y: 1, dx: 2, dy: 2, h: 2.5, palette: palettes.butter, label: { client: 'financial' } },
];

const trees: Tree[] = [
  { kind: 'tree', x: 3.6, y: 2.6 },
  { kind: 'tree', x: 6.4, y: 3.4 },
  { kind: 'tree', x: 0.6, y: 3.8 },
  { kind: 'tree', x: 9.3, y: 3.6 },
  { kind: 'tree', x: 2.6, y: 9.3 },
  { kind: 'tree', x: 6.2, y: 9.2 },
];

const ROAD = { from: 4.6, to: 5.8 };

// Painter's algorithm: draw items further back first.
const scene = [...buildings, ...trees].sort((a, b) => {
  const depth = (item: Building | Tree) =>
    item.kind === 'building' ? item.x + item.dx + item.y + item.dy : item.x + item.y;
  return depth(a) - depth(b);
});

const STROKE = { stroke: '#262838', strokeWidth: 1.5, strokeLinejoin: 'round' as const };

function Box({ x, y, dx, dy, h, palette }: Building) {
  return (
    <g {...STROKE}>
      <polygon
        fill={palette.left}
        points={pts(iso(x, y + dy), iso(x + dx, y + dy), iso(x + dx, y + dy, h), iso(x, y + dy, h))}
      />
      <polygon
        fill={palette.right}
        points={pts(iso(x + dx, y), iso(x + dx, y + dy), iso(x + dx, y + dy, h), iso(x + dx, y, h))}
      />
      <polygon
        fill={palette.top}
        points={pts(iso(x, y, h), iso(x + dx, y, h), iso(x + dx, y + dy, h), iso(x, y + dy, h))}
      />
    </g>
  );
}

function TreeShape({ x, y }: Tree) {
  const [px, py] = iso(x, y);
  return (
    <g {...STROKE}>
      <rect x={px - 2} y={py - 10} width={4} height={10} fill="#A0714F" />
      <polygon fill="#5DBB7A" points={pts([px, py - 36], [px - 10, py - 8], [px + 10, py - 8])} />
      <polygon fill="#3E9A5C" strokeWidth={0} points={pts([px, py - 36], [px + 10, py - 8], [px, py - 8])} />
    </g>
  );
}

const alignClass = {
  left: '-translate-x-2', // dot sits on the anchor, text runs right
  center: '-translate-x-1/2',
  right: '-translate-x-full', // label ends at the anchor
};

const pins = buildings.flatMap((b) => {
  if (!b.label) return [];
  const { client, align = 'center', dx = 0, dy = 0 } = b.label;
  const [px, py] = iso(b.x + b.dx / 2, b.y + b.dy / 2, b.h);
  const label = clientTypes.find((c) => c.id === client)?.label ?? '';
  return {
    id: client,
    label,
    // Mobile drops the "Government · " prefix so labels fit the smaller map.
    shortLabel: label.split(' · ').pop() ?? label,
    color: b.palette.left,
    align: alignClass[align],
    left: ((px + dx) / VIEW_W) * 100,
    top: ((py + dy) / VIEW_H) * 100,
  };
});

export function IsometricMap() {
  return (
    <div className="relative mx-auto aspect-[3/2] w-full max-w-xl" data-hero-map>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        role="img"
        aria-label="Isometric town map of the client sectors I've delivered for"
      >
        {/* Ground slab */}
        <g {...STROKE}>
          <polygon fill="#9CCB8C" points={pts(iso(0, 10), iso(10, 10), [iso(10, 10)[0], iso(10, 10)[1] + 12], [iso(0, 10)[0], iso(0, 10)[1] + 12])} />
          <polygon fill="#7DB36D" points={pts(iso(10, 0), iso(10, 10), [iso(10, 10)[0], iso(10, 10)[1] + 12], [iso(10, 0)[0], iso(10, 0)[1] + 12])} />
          <polygon fill="#C5E8B7" points={pts(iso(0, 0), iso(10, 0), iso(10, 10), iso(0, 10))} />
        </g>

        {/* Road */}
        <polygon
          {...STROKE}
          fill="#B9C3D3"
          points={pts(iso(0, ROAD.from), iso(10, ROAD.from), iso(10, ROAD.to), iso(0, ROAD.to))}
        />
        <line
          x1={iso(0, (ROAD.from + ROAD.to) / 2)[0]}
          y1={iso(0, (ROAD.from + ROAD.to) / 2)[1]}
          x2={iso(10, (ROAD.from + ROAD.to) / 2)[0]}
          y2={iso(10, (ROAD.from + ROAD.to) / 2)[1]}
          stroke="#fff"
          strokeWidth={2}
          strokeDasharray="8 6"
        />

        {scene.map((item, i) =>
          item.kind === 'building' ? <Box key={`b${i}`} {...item} /> : <TreeShape key={`t${i}`} {...item} />,
        )}
      </svg>

      {/* Outer span positions the pin; GSAP animates the inner one so transforms don't clash. */}
      {pins.map((pin) => (
        <span
          key={pin.id}
          className={`absolute -translate-y-[130%] ${pin.align}`}
          style={{ left: `${pin.left}%`, top: `${pin.top}%` }}
        >
          <span
            data-pin
            className="flex items-center gap-1 whitespace-nowrap rounded-full border-2 border-ink bg-white p-0.5 pr-1.5 text-[0.5rem] font-bold shadow-pop-sm sm:gap-1.5 sm:p-1 sm:pr-2 sm:text-[0.625rem]"
          >
            {/* Dot matches the building's colour so each label reads as belonging to it. */}
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink sm:h-3 sm:w-3"
              style={{ background: pin.color }}
            />
            <span className="sm:hidden">{pin.shortLabel}</span>
            <span className="hidden sm:inline">{pin.label}</span>
          </span>
        </span>
      ))}
    </div>
  );
}
