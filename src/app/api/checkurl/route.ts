import { get_reported_urls } from "@/actions/report";

export async function GET() {
  const res = await get_reported_urls();
  const data = res.map((url) => ({
    id: url.reportId,
    url: url.url,
    reason: url.reason,
  }));
  return Response.json({ data });
}
