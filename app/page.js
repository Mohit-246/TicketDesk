
import DashboardContent from "@/components/DashboardContent";

export const instant = false;

async function getTickets() {
  const res = await fetch(`${process.env.BASE_URL}/api/tickets`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load tickets");

  return res.json();
}

export default async function Dashboard() {
  const { tickets } = await getTickets();

  return <DashboardContent tickets={tickets} />;
}
