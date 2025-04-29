# 🧪 Testes Automatizados da API de Reservas (Restful Booker)

![Node.js CI](https://github.com/SavioHolandaQA/Supertest-API-Actions/actions/runs/14652157526)

Este projeto implementa testes automatizados de ponta a ponta da [API pública Restful Booker](https://restful-booker.herokuapp.com/) utilizando **Node.js**, **Jest** e **Supertest**. O fluxo cobre todo o ciclo de vida de uma reserva e está integrado a um pipeline de CI com **GitHub Actions**.

---

## 🚀 Funcionalidades Testadas

1. 🔐 Autenticação e obtenção de token (`POST /auth`)
2. ✅ Criação de reserva (`POST /booking`)
3. 🔍 Consulta da reserva criada (`GET /booking/{id}`)
4. ✏️ Atualização da reserva (`PUT /booking/{id}`)
5. 🧾 Validação da reserva atualizada (`GET /booking/{id}`)
6. 🗑️ Exclusão da reserva (`DELETE /booking/{id}`)
7. ❌ Verificação de exclusão (`GET /booking/{id}` → 404)

---

## 🧪 Tecnologias Utilizadas

- Node.js  v 22.12.0
- Supertest
- Jest  v 29.5.0
- GitHub Actions (CI/CD)

## 🧬 Como Executar

1. Instale as dependências:
   ```bash
   npm install
   
Execute os testes:
npm test

🧪 Exemplo de Saída Esperada

 Token obtido:  abc123xyz
 ID da reserva criada:  1010
 Dados da reserva validados com sucesso 
 Reserva atualizada com sucesso
 Confirmação de deleção recebida (404)

 👤 Autor
  Sávio Holanda do Nascimento 

