// Tipos de respuesta de DummyJSON
export interface Users {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	username?: string;
}

export interface UsersResponse {
	users: Users[];
	total: number;
	skip: number;
	limit: number;
}
