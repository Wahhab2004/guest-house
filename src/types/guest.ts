export interface Guest {
	id: string;
	name: string;
	email: string | null;
	username: string;
	phone: string;
	gender: "Male" | "Female";
	passport: string;
	dateOfBirth?: string;
	country?: string;
	createdAt: string;
}
