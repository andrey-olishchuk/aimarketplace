import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Data Source schema
export const dataSources = pgTable("data_sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  connectedAt: timestamp("connected_at").notNull(),
  size: text("size").notNull(),
  status: text("status").notNull(),
  userId: integer("user_id").notNull(),
});

export const insertDataSourceSchema = createInsertSchema(dataSources).omit({
  id: true,
});

// Agent schema
export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'free' or 'premium'
  iconName: text("icon_name").notNull(),
  iconBg: text("icon_bg").notNull(),
  iconColor: text("icon_color").notNull(),
  compatibleWith: text("compatible_with").notNull(),
});

export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
});

// Agent tags schema
export const agentTags = pgTable("agent_tags", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").notNull(),
  name: text("name").notNull(),
  color: text("color").notNull(),
});

export const insertAgentTagSchema = createInsertSchema(agentTags).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDataSource = z.infer<typeof insertDataSourceSchema>;
export type DataSource = typeof dataSources.$inferSelect;

export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Agent = typeof agents.$inferSelect;

export type InsertAgentTag = z.infer<typeof insertAgentTagSchema>;
export type AgentTag = typeof agentTags.$inferSelect;
