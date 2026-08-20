export class SKUGenerator {
	static generate(category: string, name: string): string {
		const cat = (category || 'GEN').slice(0, 3).toUpperCase();
		const nm = (name || 'XX').slice(0, 2).toUpperCase();
		const num = Math.floor(1000 + Math.random() * 9000);
		return `${cat}-${nm}-${num}`;
	}
}
