// controllers/ProductController.ts
// import { ProductType } from '../types/product.types';
// import { Request, Response } from 'express';
// types/product.types.ts
export type ProductType = {
	id: number;
	name: string;
	price: number;
};

export class ProductController {
	private products: ProductType[] = [];

	// GET /products
	getAll(_req: Request, res: Response): void {
		res.json(this.products);
	}

	// GET /products/:id
	getProductById(req: Request, res: Response): void {
		const getProductid: number = parseInt(req.params.id) as number;
		const product: ProductType = this.products.find(
			({ id }) => id === getProductid,
		);

		if (!product) res.json({ productById: product });
	}

	// POST /products
	createdProduct(req: Request, res: Response): void {
		const { name, price } = req.body;

		const setProductNew: ProductType = {
			id: this.products.length + 1,
			name,
			price: parseFloat(price),
		};

		this.products.push(setProductNew);
		res.status(201).json(setProductNew);
	}

	// PUT /products/:id
	upsertProduct(req: Request, res: Response): void {
		const id: number = parseInt(req.params.id);
		const product: ProductType = this.products.find(
			({ id: productId }) => productId === id,
		);

		if (!product) {
			res.status(404).json({ error: "Product not found" });
			return;
		}

		const { name, price } = req.body;
		product.name = name;
		product.price = parseFloat(price);

		res.json(product);
	}

	// DELETE /products/:id
	deleteProductById(req: Request, res: Response): void {
		const getProductById: number = parseInt(req.params.id);
		const getProductIndex: number = this.products.findIndex(
			({ id: productId }) => productId === getProductById,
		);

		if (getProductIndex === -1) {
			res.status(404).json({ error: "Product not found" });
			return;
		}

		this.products.splice(getProductIndex, 1);
		res.status(204).send();
	}
}

// routes/product.routes.ts
// import { Router } from 'express';
// import { ProductController } from '../controllers/ProductController';

// const router: any = Router();
// const controller = new ProductController();

// router.get('/', controller.getAll.bind(controller));
// router.get('/:id', controller.getById.bind(controller));
// router.post('/', controller.create.bind(controller));
// router.put('/:id', controller.update.bind(controller));
// router.delete('/:id', controller.delete.bind(controller));
// export default router;
