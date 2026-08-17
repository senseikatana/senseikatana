import { usuarios, type UsuarioRole } from "../../db/schema";

export interface PublicUser {
	id: number;
	name: string;
	fullName: string;
	phone: string;
	email: string;
	username: string;
	role: UsuarioRole;
	createdAt: Date | null;
}

export function publicUser(row: typeof usuarios.$inferSelect): PublicUser {
	return {
		id: row.id,
		name: row.name,
		fullName: row.fullName,
		phone: row.phone,
		email: row.email,
		username: row.username,
		role: row.role,
		createdAt: row.createdAt,
	};
}
