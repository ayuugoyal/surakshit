import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
});

export type User = typeof users.$inferSelect;

export const reportedUrls = pgTable("reported_urls", {
  id: uuid("id").primaryKey().defaultRandom(),
  link: varchar("link").notNull(),
  user_id: uuid("user_id").notNull(),
  reason: varchar("reason").notNull(),
  count: integer("count").notNull(),
});

export type reportedUrls = typeof reportedUrls.$inferSelect;
