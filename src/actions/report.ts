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
    const getReportedUrl = await db
      .select({
        url: reportedUrls.link,
        count: reportedUrls.count,
      })
      .from(reportedUrls);

    getReportedUrl.some((url) => {
      if (url.url === data.link) {
        return db
          .update(reportedUrls)
          .set({
            count: getReportedUrl[0].count + 1,
          })
          .where(eq(reportedUrls.link, data.link))
          .returning()
          .then((res) => res[0]);
      }
    });

    return db
      .insert(reportedUrls)
      .values({
        link: data.link,
        user_id: data.user_id,
        reason: data.reason,
        count: 1,
      })
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
        count: reportedUrls.count,
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
        count: reportedUrls.count,
      })
      .from(reportedUrls)
      .where(eq(reportedUrls.user_id, user_id));
    return res;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}
