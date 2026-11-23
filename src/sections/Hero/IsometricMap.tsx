import { clientTypes } from '../../data/clients';

// Must match the viewBox in public/hero-city.svg.
const VIEW = { x: 66, y: 64, w: 668, h: 500 };

// Pin anchor (top-left of the pill) in viewBox units, and the building's colour.
const pinAt: Record<string, { x: number; y: number; color: string }> = {
  revenue: { x: 254, y: 71, color: '#f4886b' },
  geospatial: { x: 494, y: 148, color: '#b6a5ef' },
  financial: { x: 552, y: 262, color: '#f6cf52' },
  welfare: { x: 74, y: 214, color: '#f8c08b' },
  agriculture: { x: 215, y: 262, color: '#93d4a6' },
  healthcare: { x: 445, y: 359, color: '#8cbbea' },
};

// The city art lives in public/ and animates itself with SMIL; <img> keeps its ids isolated
// from the page and its markup out of the JS bundle. Labels are HTML so they stay readable on phones.
export function IsometricMap() {
  return (
    // 2xl: bleed 6rem past the container toward the right edge (side margins are ≥9rem there).
    <div
      className="relative mx-auto w-full max-w-xl md:max-w-2xl lg:max-w-none 2xl:ml-0 2xl:w-[calc(100%+6rem)]"
      data-hero-map
    >
      {/* width/height only reserve the SVG's viewBox ratio to avoid layout shift. */}
      <img
        src={`${process.env.PUBLIC_URL}/hero-city.svg`}
        alt="Isometric city of the sectors I've delivered for: revenue & taxation, geospatial, social welfare, agriculture, financial and healthcare"
        width={VIEW.w}
        height={VIEW.h}
        className="h-auto w-full"
      />

      {/* Outer span positions the pin; GSAP animates the inner one so transforms don't clash. */}
      {clientTypes.map((c) => {
        const pin = pinAt[c.id];
        return (
          <span
            key={c.id}
            aria-hidden="true"
            className="absolute"
            style={{ left: `${((pin.x - VIEW.x) / VIEW.w) * 100}%`, top: `${((pin.y - VIEW.y) / VIEW.h) * 100}%` }}
          >
            <span
              data-pin
              className="flex items-center gap-1 whitespace-nowrap rounded-full border-2 border-ink bg-white py-0.5 pl-0.5 pr-1.5 text-[0.5625rem] font-bold shadow-pop-sm sm:gap-1.5 sm:pr-2 sm:text-[0.625rem]"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink sm:h-3 sm:w-3"
                style={{ background: pin.color }}
              />
              {/* Phones drop the "Government · " prefix so labels fit the smaller map. */}
              <span className="sm:hidden">{c.label.split(' · ').pop()}</span>
              <span className="hidden sm:inline">{c.label}</span>
            </span>
          </span>
        );
      })}
    </div>
  );
}
