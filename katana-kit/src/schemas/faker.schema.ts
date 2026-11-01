import { z } from "zod";

/** Generic fake vehicle shape returned by `useFakeVehicle`. */
export const FakeVehicleSchema = z.object({
	brand: z.string(),
	model: z.string(),
	type: z.string(),
	fuel: z.string(),
	color: z.string(),
	vin: z.string(),
	plate: z.string(),
});
