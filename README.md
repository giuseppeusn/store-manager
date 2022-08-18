# Store Manager

## Project

Projeto backend para gerenciamento do estoque de uma loja. Neste projeto foi possível colocar em prática aprendizados com a arquitetura MSC _(Model, Service e Controller)_, Node JS para execução do código, Express JS para a criação da API que comunica com o banco de dados, MySQL para armazenar os dados no banco, Mocha/Chai para desenvolvimento dos testes e Sinon JS para fazer o dublê das funções das camadas MSC

## Developed using
> JavaScript, Node JS, MySQL, Express JS, MSC Architecture, Mocha, Chai, Sinon

## API Endpoints

<details closed>
  <summary>Products</summary>

  - Select all products
  
  > ```
  > Method: GET
  > Endpoint: /products
  > ```
  
  - Select products by ID

  > ```
  > Method: GET
  > Endpoint: /products/:id
  > ```

  - Create product

  > ```
  > Method: POST
  > Endpoint: /products
  > ```
  > ```json
  > Body:
  > {
  >   "name": "example"
  > }
  > ```

 - Update product

  > ```
  > Method: PUT
  > Endpoint: /products/:id
  > ```
  > ```json
  > Body:
  > {
  >   "name": "new_name_example"
  > }
  > ```

  - Delete product

  > ```
  > Method: DELETE
  > Endpoint: /products/:id
  > ```
  
  - Search product by name

  > ```
  > Method: GET
  > Endpoint: /products/search?q={query}
  > ```
</details>

<details closed>
  <summary>Sales</summary>

  - Select all sales
  
  > ```
  > Method: GET
  > Endpoint: /sales
  > ```
  
  - Select sales by ID

  > ```
  > Method: GET
  > Endpoint: /sales/:id
  > ```

  - Create sale

  > ```
  > Method: POST
  > Endpoint: /sales
  > ```
  > ```json
  > Body:
  > [
  >   {
  >     "productId": 1,
  >     "quantity": 1
  >   },
  >   {
  >     "productId": 2,
  >     "quantity":5
  >   }
  > ]
  > ```

 - Update sales

  > ```
  > Method: PUT
  > Endpoint: /sales/:id
  > ```
  > ```json
  > Body:
  >  [
  >   {
  >     "productId": 1,
  >     "quantity":10
  >   },
  >   {
  >     "productId": 2,
  >     "quantity":50
  >   }
  > ]
  > ```

  - Delete sale

  > ```
  > Method: DELETE
  > Endpoint: /sales/:id
  > ```
</details>

## Running the project
> 1 - Clone the project <br>
> 2 - Enter the directory `store-manager/` <br>
> 3 - Start docker <br>
> 4 - Run the command `docker compose up -d` <br>
> 5 - Run the command `docker exec -it store_manager bash` <br>
> 6 - Run the command `npm install` inside docker <br>
> 7 - Run the command `npm run debug` inside docker

## Checking tests
> 1 - Do the previous steps up to 6 <br>
> 2 - Run the command `npm run test:mocha` inside docker

