// The city art (sector labels included) lives in public/ and animates itself with SMIL;
// <img> keeps its ids isolated from the page and its markup out of the JS bundle.
export function IsometricMap() {
  return (
    <div className="mx-auto w-full max-w-xl lg:max-w-none" data-hero-map>
      {/* width/height only reserve the SVG's viewBox ratio to avoid layout shift. */}
      <img
        src={`${process.env.PUBLIC_URL}/hero-city.svg`}
        alt="Isometric city of the sectors I've delivered for: revenue & taxation, geospatial, social welfare, agriculture, financial and healthcare"
        width={700}
        height={510}
        className="h-auto w-full"
      />
    </div>
  );
}
