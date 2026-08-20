import { generateUniqueNutCode } from './nut-codes-generator';

// 1. Traemos el array de códigos ya existentes en el sistema
const codigosEnDB = ["NUT001", "NUT002", "NUT010"];

// 2. Generamos el nuevo código vacío:
const nuevoCodigo1 = generateUniqueNutCode(codigosEnDB);
console.log(nuevoCodigo1); 
// Salida: "NUT000" -> Porque el 0 está libre, el 1 y 2 ocupados, el 3 libre... hasta el 10. 

// 3. Si añadimos el 000 a la base de datos y volvemos a llamarla:
const codigosActualizados = ["NUT001", "NUT002", "NUT010", "NUT000"];
const nuevoCodigo2 = generateUniqueNutCode(codigosActualizados);
console.log(nuevoCodigo2); 
// Salida: "NUT003" -> Porque el 0, 1 y 2 ya están ocupados.