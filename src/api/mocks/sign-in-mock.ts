import { http, HttpResponse } from 'msw'

import { ISignInBody } from '../sign-in'

export const signInMock = http.post<never, ISignInBody>(
  '/login',
  async ({ request }) => {
    const { email, password } = await request.json();

    if (email === 'manoelprado.aecjr@gmail.com' && password === 'senha123') {
      const fakeJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczNDA2ODM1MSwiZXhwIjoxNzM0MDcxOTUxfQ.NkoEZaNO_LHtMGhldbWcOKsQHiyNU7AwypPtEF2Tuk4';

      return new HttpResponse(
        JSON.stringify(fakeJwt),
        {
          status: 200,
        }
      );
    }

    return new HttpResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  },
);