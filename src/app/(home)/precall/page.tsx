import { HeroNav } from "../_components/hero-nav";
import { ConfirmationHeader } from "../_components/confirmation-header";
import { PreCallStepsSection } from "../_components/pre-call-steps-section";
import { ConfirmCallSection } from "../_components/confirm-call-section";
import { PreCallAssetsSection } from "../_components/pre-call-assets-section";
import { ShowUpPreparedSection } from "../_components/show-up-prepared-section";
import { SiteFooter } from "../_components/site-footer";
import { SectionArrow } from "../_components/section-arrow";
import { Spacer } from "../_components/spacer";
import { Starfield } from "../_components/starfield";

// Layout: a single overflow-x-clip wrapper so burgundy glows can bleed vertically between
// sections without producing horizontal scrollbars from the §15A weak variant's 110% width.
// All sections are transparent; the body bg (#121212 in globals.css) is the page floor and
// the BurgundyGlow tapestry visually spans the entire scroll without per-section clipping.
//
// Loop 2: section transitions carry a minimalist SectionArrow chevron — each instance owns
// its own pad so the chevron sits centered within the inter-section breathing.

export default function Page() {
  return (
    <>
      <HeroNav />
      <main className="relative" style={{ overflowX: "clip" }}>

        {/* Fixed starfield — invisible during hero, fades in as user scrolls into steps */}
        <Starfield />

        {/* Hero — eyebrow + H1 + subhead + orientation VSL */}
        <ConfirmationHeader />

        {/* Hero → 3-step grid */}
        <SectionArrow pad="5vh" />
        <PreCallStepsSection />

        {/* 3-step grid → confirm-call */}
        <SectionArrow pad="8px" />
        <ConfirmCallSection />

        {/* Confirm-call → pre-call assets */}
        <SectionArrow pad="3vh" />
        <PreCallAssetsSection />

        {/* Pre-call assets → numbers */}
        <SectionArrow pad="3vh" />
        <ShowUpPreparedSection />

        {/* No arrow before footer — experience ends here */}
        <Spacer h="8vh" />
      </main>
      <SiteFooter />
    </>
  );
}
