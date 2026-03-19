import Header from "@/components/header/Header";
import HelpNav from "@/components/help/HelpNav";
import CommissionSection from "@/components/help/sections/CommissionSection";
import FeeCalculationsSection from "@/components/help/sections/FeeCalculationsSection";
import InventorySection from "@/components/help/sections/InventorySection";
import InvoicesSection from "@/components/help/sections/InvoicesSection";
import OverviewSection from "@/components/help/sections/OverviewSection";
import PatientsSection from "@/components/help/sections/PatientsSection";
import RolesSection from "@/components/help/sections/RolesSection";
import TreatmentsSection from "@/components/help/sections/TreatmentsSection";
import { HELP_NAV } from "@/data/helpContent";
import { useEffect, useRef, useState } from "react";

const HelpPage = () => {
  const initialHash = window.location.hash.slice(1);
  const [active, setActive] = useState(
    HELP_NAV.some((n) => n.id === initialHash) ? initialHash : "overview",
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (initialHash) {
      document.getElementById(initialHash)?.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    history.replaceState(null, "", `#${active}`);
  }, [active]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    HELP_NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex gap-12 pb-24">
      <HelpNav active={active} onScrollTo={scrollTo} />

      <div className="min-w-0 flex-1 pl-56 pr-4">
        <Header
          header="Help & Documentation"
          className="text-2xl"
          subHeader="How the system works — for staff and administrators."
        />

        <OverviewSection />
        <PatientsSection />
        <TreatmentsSection />
        <InvoicesSection />
        <FeeCalculationsSection />
        <CommissionSection />
        <InventorySection />
        <RolesSection />
      </div>
    </div>
  );
};

export default HelpPage;
