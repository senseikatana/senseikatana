import { defineApiConfig } from "@/core/services/http.service.js";

import { dummyJsonApiConfig } from "./dummyjson.service.js";
import { useBunStart } from "./server.js";

defineApiConfig(dummyJsonApiConfig);

const server = useBunStart(Number(process.env.PORT ?? 3000), process.env.HOST ?? "localhost");
console.log(`Server running at ${server.url}`);
