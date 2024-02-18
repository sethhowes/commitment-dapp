import NavLinks from "@/components/nav-links";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function NavBar() {
  return (
    <nav className="bg-white flex justify-end mx-10 mt-5 mb-12 h-24 items-center gap-8 rounded-lg drop-shadow-xl">
      <NavLinks />
      <div className="mr-4">
        <ConnectButton />
      </div>
    </nav>
  );
}
