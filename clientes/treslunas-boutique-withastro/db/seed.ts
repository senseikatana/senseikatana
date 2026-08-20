import { db, Category, Product, ProductVariant } from 'astro:db';

export default async function seed() {
  console.log('Fetching products from DummyJSON API...');
  const res = await fetch('https://dummyjson.com/products?limit=100');
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }
  const data = await res.json();
  const apiProducts = data.products;

  console.log(`Fetched ${apiProducts.length} products. Processing categories...`);

  // Extract unique categories
  const categoriesMap = new Map();
  for (const prod of apiProducts) {
    const catName = prod.category; // e.g. "beauty", "fragrances", etc.
    const catId = `cat-${catName}`;
    if (!categoriesMap.has(catId)) {
      const displayName = catName
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      categoriesMap.set(catId, {
        id: catId,
        name: displayName,
        slug: catName,
      });
    }
  }

  // Insert categories
  const categoriesList = Array.from(categoriesMap.values());
  console.log(`Inserting ${categoriesList.length} categories into Astro DB...`);
  await db.insert(Category).values(categoriesList);

  // Insert products and variants
  const productsToInsert = [];
  const variantsToInsert = [];

  for (const prod of apiProducts) {
    const prodId = `prod-${prod.id}`;
    const categoryId = `cat-${prod.category}`;
    // Slugify title and add ID for uniqueness
    const slug = prod.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${prod.id}`;

    // Standardize images array
    const imagesArray = Array.isArray(prod.images) && prod.images.length > 0 
      ? prod.images 
      : [prod.thumbnail];

    productsToInsert.push({
      id: prodId,
      categoryId: categoryId,
      title: prod.title,
      slug: slug,
      description: prod.description,
      price: prod.price,
      images: JSON.stringify(imagesArray),
      isFeatured: prod.rating >= 4.5, // Featured if rating is high
      isActive: true,
      createdAt: new Date(),
    });

    // Generate variants for clothes/shoes, or simple default variants for beauty/food/etc.
    const isFashion = ['beauty', 'fragrances'].includes(prod.category) === false;
    const sizes = isFashion ? ['S', 'M', 'L'] : ['Única'];
    const colors = isFashion ? ['Negro', 'Blanco', 'Gris'] : ['Estándar'];

    sizes.forEach((size) => {
      colors.forEach((color, colorIdx) => {
        const varId = `var-${prod.id}-${size}-${colorIdx}`;
        variantsToInsert.push({
          id: varId,
          productId: prodId,
          size: size,
          color: color,
          stockOnline: Math.floor(Math.random() * 25) + 5, // 5 to 30 online stock
          stockPhysical: Math.floor(Math.random() * 8) + 1, // 1 to 9 in-store stock
          sku: `${prod.sku || 'SKU'}-${size}-${colorIdx}-${prod.id}`.toUpperCase(),
        });
      });
    });
  }

  console.log(`Inserting ${productsToInsert.length} products...`);
  await db.insert(Product).values(productsToInsert);

  console.log(`Inserting ${variantsToInsert.length} product variants...`);
  await db.insert(ProductVariant).values(variantsToInsert);

  console.log('Database successfully seeded with DummyJSON data!');
}

