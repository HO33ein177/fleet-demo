// app/page.tsx (Server Component can import a Client Component)
import FleetDashboard from "./FleetDashboard";

export default function Page() {
  return (
    <main className="min-h-screen">
      <FleetDashboard />
    </main>
  );
}
