import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.defaults({ ease: "power3.out" });

export const REDUCED = "(prefers-reduced-motion: reduce)";
export const prefersReducedMotion = () => window.matchMedia(REDUCED).matches;

/**
 * Seitenbewegung, bewusst zurückhaltend:
 * 1. ein Auftritt im Hero beim Laden
 * 2. einmalige, gestaffelte Reveals beim Scrollen
 * Bei «Bewegung reduzieren» passiert nichts, alles ist sofort sichtbar.
 */
export function setupPageMotion() {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.timeline({ delay: 0.1 })
      .from(".hero h1, .hero-set, .hero-lead, .hero-cta > *", { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.08 })
      .from(".hero video", { y: 24, scale: 0.97, autoAlpha: 0, duration: 0.9 }, 0.15)
      .from(".hero-scroll", { autoAlpha: 0, duration: 0.6 }, 0.9);

    const reveal = (selector: string, stagger = 0.07) => {
      gsap.set(selector, { y: 20, autoAlpha: 0 });
      ScrollTrigger.batch(selector, {
        start: "top 90%",
        once: true,
        onEnter: (els) => gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.6, stagger, overwrite: true }),
      });
    };
    reveal(".kit h2, .kit li");
    reveal(".important h2, .important .points li", 0.05);
    reveal(".contra .acc, .guide-head, .guide .acc", 0.06);
  });
  return mm;
}

/** Kurze Staffelung der Inhalte beim Aufklappen eines Akkordeons. */
export function revealPanel(panel: HTMLElement) {
  if (prefersReducedMotion()) return;
  gsap.from(panel.querySelectorAll(".hint, .module, .points li"), { y: 12, autoAlpha: 0, duration: 0.4, stagger: 0.04, clearProps: "transform,opacity,visibility" });
}

export { gsap, ScrollTrigger, useGSAP };
