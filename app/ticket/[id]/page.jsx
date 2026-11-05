export const instant = false;
import TicketForm from "@/components/TicketForm";
 
export default async function EditTicket({ params }) {
  const { id } = await params;
  const res = await fetch(`${process.env.BASE_URL}/api/tickets/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Ticket not found");
  const { ticket } = await res.json();
  return <TicketForm ticket={JSON.parse(JSON.stringify(ticket))} />;
}
