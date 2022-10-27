import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teams = [
  [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
    {
      "id": 4,
      "teamName": "Corinthians"
    },
    {
      "id": 5,
      "teamName": "Cruzeiro"
    },
    {
      "id": 6,
      "teamName": "Ferroviária"
    },
    {
      "id": 7,
      "teamName": "Flamengo"
    },
    {
      "id": 8,
      "teamName": "Grêmio"
    },
    {
      "id": 9,
      "teamName": "Internacional"
    },
    {
      "id": 10,
      "teamName": "Minas Brasília"
    },
    {
      "id": 11,
      "teamName": "Napoli-SC"
    },
    {
      "id": 12,
      "teamName": "Palmeiras"
    },
    {
      "id": 13,
      "teamName": "Real Brasília"
    },
    {
      "id": 14,
      "teamName": "Santos"
    },
    {
      "id": 15,
      "teamName": "São José-SP"
    },
    {
      "id": 16,
      "teamName": "São Paulo"
    }
  ]

describe('Teste da rota login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // casos de missin parameters
  it('quando a requisição é feita não permita o acesso sem informar um email, deve ser retornado um status 400', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ password: 'secret_admin' });
    expect(httpResponse.status).to.be.equal(400);
  });

  it('quando a requisição é feita não permita o acesso sem informar um email, deve ser retornado um erro no formato string', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ password: 'secret_admin' });
    expect(httpResponse.body).to.have.property('message').to.be.a('string');
    expect(httpResponse.body.message).to.deep.equal('All fields must be filled');
  });

  it('quando a requisição é feita não permita o acesso sem informar uma senha, deve ser retornado um status 400', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
    expect(httpResponse.status).to.be.equal(400);
  });

  it('quando a requisição é feita não permita o acesso sem informar um email, deve ser retornado um erro no formato string', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
    expect(httpResponse.body).to.have.property('message').to.be.a('string');
    expect(httpResponse.body.message).to.deep.equal('All fields must be filled');
  });

  it('quando a requisição é feita não permita o acesso sem informar uma senha, deve ser retornado um status 400', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
    expect(httpResponse.status).to.be.equal(400);
  });

  it('quando a requisição é feita não permita o acesso sem informar uma senha, deve ser retornado um erro no formato string', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
    expect(httpResponse.body).to.have.property('message').to.be.a('string');
    expect(httpResponse.body.message).to.deep.equal('All fields must be filled');
  });

  // casos de email inválido
  it('quando a requisição é feita com um email inválido, deve ser retornado um status 401', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ email: 'fakeuser@fakedomain.com', password: 'secret_admin' });
    expect(httpResponse.status).to.be.equal(401);
  });

  it('quando a requisição é feita com um email inválido, deve ser retornado um erro no formato string', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ email: 'fakeuser@fakedomain.com', password: 'secret_admin' });
    expect(httpResponse.body).to.have.property('message').to.be.a('string');
    expect(httpResponse.body.message).to.deep.equal('Incorrect email or password');
  });

  // casos de senha inválida
  it('quando a requisição é feita com uma senha inválida, deve ser retornado um status 401', async () => {
    const httpResponse = await chai.request(app).post('/login').send({email: 'admin@admin.com', password: 'bogus_password'});
    expect(httpResponse.status).to.be.equal(401);
  });

  it('quando a requisição é feita com uma senha inválida, deve ser retornado um erro no formato string', async () => {
    const httpResponse = await chai.request(app).post('/login').send({email: 'admin@admin.com', password: 'bogus_password'});
    expect(httpResponse.body).to.have.property('message').to.be.a('string');
    expect(httpResponse.body.message).to.deep.equal('Incorrect email or password');
  });

/// caso de sucesso 
  it('quando a requisição é feita com sucesso, deve ser retornado um status 200', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });
    expect(httpResponse.status).to.be.equal(200);
  });
  it('quando a requisição é feita com sucesso, deve ser retornado token no formato string', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });
    expect(httpResponse.body).to.have.property('token').to.be.a('string');
  });
});

describe('Teste da rota login/validate', () => {
  it('quando a requisição é feita sem informar um token, deve ser retornado um status 401', async () => {
    const httpResponse = await chai.request(app).post('/login/validate');
    expect(httpResponse.status).to.be.equal(401);
  });
});

describe('Teste da rota teams ', () => {
  it(' quando a resuisição é feita com sucesso deve ser retornado um status 200', async () => {
    const httpResponse = await chai.request(app).get('/teams');
    expect(httpResponse.status).to.be.equal(200);
  });
  it(' quando a resuisição é feita com sucesso deve ser retornado um array', async () => {
    const httpResponse = await chai.request(app).get('/teams');
    expect(httpResponse.body).to.be.an('array');
    expect(httpResponse.body).to.deep.equal(teams);
  });
});

describe('Teste da rota teams/:id', () => {
  it('quando a requisição é feita com sucesso deve ser retornado um status 200', async () => {
    const httpResponse = await chai.request(app).get('/teams/1');
    expect(httpResponse.status).to.be.equal(200);
  });
  it('quando a requisição é feita com sucesso deve ser retornado um objeto', async () => {
    const httpResponse = await chai.request(app).get('/teams/1');
    expect(httpResponse.body).to.be.an('object');
    expect(httpResponse.body).to.deep.equal(teams[0]);
  });
  it('quando a requisição é feita com um id inválido deve ser retornado um status 404', async () => {
    const httpResponse = await chai.request(app).get('/teams/100');
    expect(httpResponse.status).to.be.equal(404);
  });
}


