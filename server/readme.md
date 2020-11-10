npm install multer -- Instalar upload de imagem
npm install @types/multer -D
npm install celebrate

npm install -- Adicionar todas dependencias no node_modules
npx knex migrate:latest --knexfile knexfile.ts migrate:latest     --Adicionar as migrations
npm run knex:seed --Adicionar os items no bd
npm run dev