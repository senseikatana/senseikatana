import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@libsql/client';
import type { StoredChat, StoredMessage } from './schema';

function defaultUrl(): string {
	const dbPath = fileURLToPath(new URL('./data/whm.db', import.meta.url));
	mkdirSync(dirname(dbPath), { recursive: true });
	return `file:${dbPath}`;
}

const url = process.env.LIBSQL_URL ?? defaultUrl();

export const client = createClient({ url });

const DDL = [
	`CREATE TABLE IF NOT EXISTS chats (
		id TEXT PRIMARY KEY,
		channel TEXT NOT NULL,
		external_id TEXT NOT NULL,
		contact_name TEXT,
		last_message_at INTEGER NOT NULL,
		updated_at INTEGER NOT NULL
	)`,
	`CREATE TABLE IF NOT EXISTS messages (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		chat_id TEXT NOT NULL,
		channel TEXT NOT NULL,
		direction TEXT NOT NULL,
		text TEXT NOT NULL,
		timestamp INTEGER NOT NULL,
		status TEXT NOT NULL
	)`,
	`CREATE TABLE IF NOT EXISTS meta (
		key TEXT PRIMARY KEY,
		value TEXT NOT NULL
	)`,
];

export async function ensureSchema(): Promise<void> {
	for (const ddl of DDL) {
		await client.execute(ddl);
	}
}

function toMessage(row: Record<string, unknown>): StoredMessage {
	return {
		id: Number(row.id),
		chatId: String(row.chat_id),
		channel: String(row.channel),
		direction: row.direction as StoredMessage['direction'],
		text: String(row.text),
		timestamp: Number(row.timestamp),
		status: row.status as StoredMessage['status'],
	};
}

function toChat(row: Record<string, unknown>): StoredChat {
	return {
		id: String(row.id),
		channel: String(row.channel),
		externalId: String(row.external_id),
		contactName: row.contact_name === null ? null : String(row.contact_name),
		lastMessageAt: Number(row.last_message_at),
		updatedAt: Number(row.updated_at),
	};
}

export interface UpsertChatInput {
	channel: string;
	externalId: string;
	contactName: string | null;
	timestamp: number;
}

export async function upsertChat(input: UpsertChatInput): Promise<StoredChat> {
	const id = `${input.channel}:${input.externalId}`;
	await client.execute({
		sql: `INSERT INTO chats (id, channel, external_id, contact_name, last_message_at, updated_at)
			VALUES (?, ?, ?, ?, ?, ?)
			ON CONFLICT(id) DO UPDATE SET
				contact_name = COALESCE(excluded.contact_name, chats.contact_name),
				last_message_at = MAX(chats.last_message_at, excluded.last_message_at),
				updated_at = excluded.updated_at`,
		args: [id, input.channel, input.externalId, input.contactName, input.timestamp, input.timestamp],
	});
	return {
		id,
		channel: input.channel,
		externalId: input.externalId,
		contactName: input.contactName,
		lastMessageAt: input.timestamp,
		updatedAt: input.timestamp,
	};
}

export interface InsertMessageInput {
	chatId: string;
	channel: string;
	direction: StoredMessage['direction'];
	text: string;
	status: StoredMessage['status'];
}

export async function insertMessage(input: InsertMessageInput): Promise<StoredMessage> {
	const timestamp = Date.now();
	const result = await client.execute({
		sql: `INSERT INTO messages (chat_id, channel, direction, text, timestamp, status)
			VALUES (?, ?, ?, ?, ?, ?)`,
		args: [input.chatId, input.channel, input.direction, input.text, timestamp, input.status],
	});
	const id = Number(result.lastInsertRowid);
	return { id, timestamp, ...input };
}

export async function listChats(channel?: string): Promise<StoredChat[]> {
	const rows = (
		await client.execute({
			sql: 'SELECT * FROM chats ORDER BY last_message_at DESC',
		})
	).rows;
	return rows.map(toChat).filter((chat) => (channel ? chat.channel === channel : true));
}

export async function listMessages(chatId: string, afterId: number): Promise<StoredMessage[]> {
	const rows = (
		await client.execute({
			sql: 'SELECT * FROM messages WHERE chat_id = ? AND id > ? ORDER BY id ASC',
			args: [chatId, afterId],
		})
	).rows;
	return rows.map(toMessage);
}

export async function metaGet(key: string): Promise<string | null> {
	const rows = (
		await client.execute({
			sql: 'SELECT value FROM meta WHERE key = ?',
			args: [key],
		})
	).rows;
	return rows.length > 0 ? String(rows[0].value) : null;
}

export async function metaSet(key: string, value: string): Promise<void> {
	await client.execute({
		sql: 'INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
		args: [key, value],
	});
}
