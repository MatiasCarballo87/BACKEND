import { faker } from "@faker-js/faker";

/* faker = "es"; */

export const createFakerProd = () => {
    return {
        id: faker.string.alphanumeric(10),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(5),
        price: faker.number.float({ min: 10, max: 100, precision: 0.001}),
        stock: faker.number.int({ min: 10, max: 100 }),
        category: faker.commerce.productMaterial(),
        thumbnail: faker.image.urlPicsumPhotos(),
    }
};


