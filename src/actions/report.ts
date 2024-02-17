"use server";

import { db } from "@/db";
import { reportedUrls } from "@/db/schema";

export async function update_user_details(data: {
  user_id: string;
  link: string;
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
