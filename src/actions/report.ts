"use server";

import { db } from "@/db";
import { reportedUrls } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function report_url(data: {
  user_id: string;
  link: string;
  reason: string;
}) {
  try {
    return db
      .insert(reportedUrls)
      .values(data)
      .returning()
      .then((res) => res[0]);
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

export async function get_reported_urls() {
  try {
    const res = await db
      .select({
        reportId: reportedUrls.id,
        url: reportedUrls.link,
        reason: reportedUrls.reason,
        user_id: reportedUrls.user_id,
      })
      .from(reportedUrls);
    return res;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

export async function get_user_reported_urls({ user_id }: { user_id: string }) {
  try {
    const res = await db
      .select({
        reportId: reportedUrls.id,
        url: reportedUrls.link,
        reason: reportedUrls.reason,
      })
      .from(reportedUrls)
      .where(eq(reportedUrls.user_id, user_id));
    return res;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}
