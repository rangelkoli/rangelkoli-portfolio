// Cached server-side for all visitors; regenerated at most once an hour.
export const revalidate = 3600;

export async function GET() {
  const response = await fetch(
    "https://github-contributions-api.jogruber.de/v4/rangelkoli?y=last",
  );
  if (!response.ok) return new Response(null, { status: 502 });
  return Response.json(await response.json());
}
