## First, run the API: https://github.com/ManoelPradoMark22/family-memories-api

## Now, follow the steps:

- check if the VITE_API_URL in .env.local matches the URL the backend is running on
- npm i
- npx playwright install

## Run the aplication
- npm run dev

## Run test coverage
- npm run coverage

## Run e2e tests
- npm run e2e
- /or/
- npm run e2e:ui

---

PS.: I tried my best to finish everything in the 3 days I was given to do this challenge, but since I'm still employed at the current company, this was all I could do in that time.
Note: Since the Photo Upload functionality in the Frontend was not integrated with the Backend in time, it is possible to upload the photo for a user:
PS.: tentei ao máximo finalizar tudo nos 3 dias que recebi para fazer esse desafio, mas como ainda estou empregado na atual compania, isso foi tudo que consegui realizar nesse prazo.
Notas: Como no Frontend a funcionalidade de Upload de Photo não foi integrada com o Backend a tempo, é possivel fazer o upload da foto para um usuário:

1. Identify your user's id (if you don't have a user created, create an example one):
1. Identifique o id do seu usuário (se não tiver o usuario criado, crie um de exemplo):
![image](https://github.com/user-attachments/assets/64a9f7e3-6899-45c8-a97a-b4607238359c)
2. Upload the image (1 at a time). in the route, put the user id as a parameter: http://localhost:3000/upload/USER_ID_HERE
2. Faça o upload da imagem (1 por vez). na rota, coloque o id do usuario como parametro: http://localhost:3000/upload/ID_DO_USUARIO_AQUI
![image](https://github.com/user-attachments/assets/ac0902af-0307-45ee-bb42-6ab615dc441d)
3. The photos will appear for the user in question in the Home
3. As fotos irão aparecer para o usuário em questão na Home
![image](https://github.com/user-attachments/assets/0b255fa8-57a1-406e-b09f-c3346b3ea424)
