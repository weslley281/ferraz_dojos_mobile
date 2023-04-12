import { verify } from 'jsonwebtoken';

export const id_dojo = (token: any) => {
  const test = verify(token, 'sua_chave_secreta', (err: any, decoded: any) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`O ID do usuário é: ${decoded.subject}`);
    // O ID do usuário pode estar incluído no payload do token
    return decoded.subject;
  });
  return test;
};
