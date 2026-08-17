import { z } from "zod";
import { USUARIO_ROLES } from "../../../db/schema";

export const roleSchema = z.enum(USUARIO_ROLES);

export const createUserSchema = z.object({
	name: z.string().trim().min(1, "Nombre obligatorio").max(60, "Máximo 60 caracteres"),
	fullName: z.string().trim().min(1, "Nombre completo obligatorio").max(30, "Máximo 30 caracteres"),
	phone: z.string().trim().regex(/^\+?[0-9\s-]{6,20}$/, "Teléfono inválido"),
	email: z.email("Email inválido").max(254, "Email demasiado largo").transform((value) => value.toLowerCase()),
	passkey: z.string().regex(/^[A-Za-z0-9]{8}$/, "El passkey debe tener 8 caracteres alfanuméricos"),
	username: z.string().trim().regex(/^[a-zA-Z0-9_.]{3,15}$/, "Username: 3-15 caracteres (letras, números, punto o guion bajo)"),
	role: roleSchema.default("client"),
});

export const updateUserSchema = createUserSchema
	.partial()
	.refine((data) => Object.keys(data).length > 0, "Nada que actualizar");

export const loginSchema = z.object({
	username: z.string().trim().min(1, "Username obligatorio"),
	passkey: z.string().min(1, "Passkey obligatorio"),
});

export function formatValidationError(error: z.ZodError) {
	return {
		error: "validation_failed",
		issues: error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
	};
}
