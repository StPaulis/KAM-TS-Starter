import { CategoryModel, CompanyModel } from '../schemas';

export async function initDefaultData() {
  console.log('[Startup] Initializing Data...');
  await chekAndInsertIfNoDataExists();
  console.log('[Startup] Data Initialized ...');
}

async function chekAndInsertIfNoDataExists() {
  const categoriesCount = await CategoryModel.count({}).exec();

  if (!categoriesCount) {
    const temp = ['Sports', 'Music', 'Food'];
    const categories = await CategoryModel.insertMany([
      {
        name: temp[0],
      },
      {
        name: temp[1],
      },
      {
        name: temp[2],
      },
    ]);

    await CompanyModel.insertMany([
      {
        name: 'Keratsini',
        logoUrl:
          'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        email: 'kera@gmail.com',
        categories: [categories.find(x => x.name === temp[0])._id.toString()],
      },
      {
        name: 'Super Fest',
        logoUrl:
          'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        email: 'kera@gmail.com',
        categories: [categories.find(x => x.name === temp[1])._id.toString()],
      },
      {
        name: 'Man Donalts',
        logoUrl:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        email: 'man@donalts.com',
        categories: [categories.find(x => x.name === temp[2])._id.toString()],
      },
    ]);
  }
}
