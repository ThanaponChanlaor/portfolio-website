import { clientTypes } from '../../data/clients';

// Building colours, matching the label dots inside hero-city.svg.
const dotColor: Record<string, string> = {
  revenue: '#f4886b',
  geospatial: '#b6a5ef',
  financial: '#f6cf52',
  welfare: '#f8c08b',
  agriculture: '#93d4a6',
  healthcare: '#8cbbea',
};

// The city art (sector labels included) lives in public/ and animates itself with SMIL;
// <img> keeps its ids isolated from the page and its markup out of the JS bundle.
export function IsometricMap() {
  return (
    // 2xl: bleed 6rem past the container toward the right edge (side margins are ≥9rem there).
    <div
      className="mx-auto w-full max-w-xl md:max-w-2xl lg:max-w-none 2xl:ml-0 2xl:w-[calc(100%+6rem)]"
      data-hero-map
    >
      {/* width/height only reserve the SVG's viewBox ratio to avoid layout shift. */}
      <img
        src={`${process.env.PUBLIC_URL}/hero-city.svg`}
        alt="Isometric city of the sectors I've delivered for: revenue & taxation, geospatial, social welfare, agriculture, financial and healthcare"
        width={668}
        height={500}
        className="h-auto w-full"
      />

      {/* Below 592px the map is under 560px wide and the SVG hides its own labels
          (media query in hero-city.svg), so show them here as readable chips instead. */}
      <ul aria-hidden="true" className="mt-4 flex flex-wrap justify-center gap-2 min-[592px]:hidden">
        {clientTypes.map((c) => (
          <li
            key={c.id}
            className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-white py-1 pl-1.5 pr-2.5 text-xs font-bold shadow-pop-sm"
          >
            <span
              className="h-3 w-3 shrink-0 rounded-full border-2 border-ink"
              style={{ background: dotColor[c.id] }}
            />
            {c.label.split(' · ').pop()}
          </li>
        ))}
      </ul>
    </div>
  );
}
