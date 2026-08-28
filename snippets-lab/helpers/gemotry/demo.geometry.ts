import { GeometryUtils, GeometryArea, GeometryPerimeter } from "./utils/geometry.utils";

// Usando el namespace consolidado
const rectArea = GeometryUtils.area.rectangle(5, 10, { digits: 2, unit: "m²" });
// "50.00 m²"

const circlePerimeter = GeometryUtils.perimeter.circle(3, { unit: "cm" });
// "18.85 cm"

const sphereVolume = GeometryUtils.volume.sphere(5, { digits: 3, unit: "L" });
// "523.599 L"

// Usando clases directamente
const triangleArea = GeometryArea.triangle(8, 6);
const hexagonPerimeter = GeometryPerimeter.hexagon(4);

// Con opciones de formato
const squareArea = GeometryArea.square(10, {
	locale: "es-ES",
	digits: 0,
	unit: "m²",
});
// "100 m²"