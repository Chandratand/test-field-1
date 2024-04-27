// seed/seed.ts
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const usersSeed = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St',
    birthdate: new Date('1990-01-01'),
    birthplace: 'New York',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    address: '456 Elm St',
    birthdate: new Date('1992-05-15'),
    birthplace: 'Los Angeles',
  },
  {
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    address: '789 Oak St',
    birthdate: new Date('1985-09-20'),
    birthplace: 'Chicago',
  },
  {
    name: 'Emily Brown',
    email: 'emily.brown@example.com',
    address: '101 Pine St',
    birthdate: new Date('1994-03-10'),
    birthplace: 'Houston',
  },
  {
    name: 'William Wilson',
    email: 'william.wilson@example.com',
    address: '202 Maple St',
    birthdate: new Date('1988-07-25'),
    birthplace: 'Miami',
  },
];
const productsSeed = [
  {
    name: 'Product 1',
    description: 'This is product 1',
    stock: 10,
    price: 10000,
  },
  {
    name: 'Product 2',
    description: 'This is product 2',
    stock: 5,
    price: 12000,
  },
  {
    name: 'Product 3',
    description: 'This is product 3',
    stock: 20,
    price: 10000,
  },
  {
    name: 'Product 4',
    description: 'This is product 4',
    stock: 15,
    price: 15000,
  },
  {
    name: 'Product 5',
    description: 'This is product 5',
    stock: 8,
    price: 18000,
  },
];

async function seed() {
  await prisma.user.createMany({ data: usersSeed });
  await prisma.product.createMany({ data: productsSeed });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
