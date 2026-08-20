import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const chats = sqliteTable('chats', {
	id: text('id').primaryKey(),
	channel: text('channel').notNull(),
	externalId: text('external_id').notNull(),
	contactName: text('contact_name'),
	lastMessageAt: integer('last_message_at').notNull(),
	updatedAt: integer('updated_at').notNull(),
});

export const messages = sqliteTable('messages', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	chatId: text('chat_id').notNull(),
	channel: text('channel').notNull(),
	direction: text('direction').notNull(),
	text: text('text').notNull(),
	timestamp: integer('timestamp').notNull(),
	status: text('status').notNull(),
});

export const meta = sqliteTable('meta', {
	key: text('key').primaryKey(),
	value: text('value').notNull(),
});

export type MessageDirection = 'in' | 'out';
export type MessageStatus = 'sent' | 'failed';

export interface StoredMessage {
	id: number;
	chatId: string;
	channel: string;
	direction: MessageDirection;
	text: string;
	timestamp: number;
	status: MessageStatus;
}

export interface StoredChat {
	id: string;
	channel: string;
	externalId: string;
	contactName: string | null;
	lastMessageAt: number;
	updatedAt: number;
}
