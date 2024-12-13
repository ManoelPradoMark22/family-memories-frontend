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

# Features Developed in Frontend:

- [x] Sign-in (login)
  ![image](https://github.com/user-attachments/assets/bc78dcaa-73a5-4f7c-a599-699b9527299c)
- [x] Sign-up (register user)
  ![image](https://github.com/user-attachments/assets/ee1a4233-c29c-4c65-9203-db8d1afa362e)
- [x] Sign-out (logout)
  ![image](https://github.com/user-attachments/assets/26063e9a-bf77-4597-aca3-341ea68439d1)
- [x] Edit Profile
  ![image](https://github.com/user-attachments/assets/4379b0be-3930-4e49-91b2-f2e125932323)
- [x] List Photos (Gallery)
  ![image](https://github.com/user-attachments/assets/4b8b4682-04c9-4de2-8fcb-d8163b1f3c90)
- [x] Delete Photo
  ![image](https://github.com/user-attachments/assets/3f3ff74c-aeca-4a96-9f84-8c39637184b6)
- [x] Theme Toggle
  ![image](https://github.com/user-attachments/assets/beb51fa9-79eb-493d-8c4e-09c5e1eafaae)
- [x] Responsive application <br>
  ![image](https://github.com/user-attachments/assets/4ed53976-662f-4c0c-a368-82d10d4ce269)

# Features Frontend - TO-DO:

- [ ] Upload Photo (incomplete)
- [ ] List Families
- [ ] Create a family
- [ ] Join to a family by code (id)
- [ ] Join to a family by Qr-code (id)
- [ ] List Albums
- [ ] Create an Album
- [ ] Add Photo to Album
- [ ] Remove Photo from Album

# Libs and Technologies:

- [x] React-Query
- [x] react-hook-form
- [x] zod (validations)
- [x] axios
- [x] Test Coverage - Jest (some examples)
- [x] E2E Tests - Playwright (some examples)

- [x] Tailwind (style)
- [x] Shadcn/ui (componentizing)

- [x] Prettier
- [x] ESLint

---

- PS.: I tried my best to finish everything in the 3 days I was given to do this challenge, but since I'm still employed at the current company, this was all I could do in that time.
Note: Since the Photo Upload functionality in the Frontend was not integrated with the Backend in time, it is possible to upload the photo for a user:
- PS.: tentei ao máximo finalizar tudo nos 3 dias que recebi para fazer esse desafio, mas como ainda estou empregado na atual compania, isso foi tudo que consegui realizar nesse prazo.
Notas: Como no Frontend a funcionalidade de Upload de Photo não foi integrada com o Backend a tempo, é possivel fazer o upload da foto para um usuário:

- 1 | Identify your user's id (if you don't have a user created, create an example one):
- 1 | Identifique o id do seu usuário (se não tiver o usuario criado, crie um de exemplo):
![image](https://github.com/user-attachments/assets/64a9f7e3-6899-45c8-a97a-b4607238359c)
- 2 | Upload the image (1 at a time). in the route, put the user id as a parameter: http://localhost:3000/upload/USER_ID_HERE
- 2 | Faça o upload da imagem (1 por vez). na rota, coloque o id do usuario como parametro: http://localhost:3000/upload/ID_DO_USUARIO_AQUI
![image](https://github.com/user-attachments/assets/ac0902af-0307-45ee-bb42-6ab615dc441d)
- 3 | The photos will appear for the user in question in the Home
- 3 | As fotos irão aparecer para o usuário em questão na Home
![image](https://github.com/user-attachments/assets/0b255fa8-57a1-406e-b09f-c3346b3ea424)
