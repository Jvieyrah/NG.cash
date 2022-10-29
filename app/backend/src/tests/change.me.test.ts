import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
import userModel from '../database/models/sequelizUsers';
import teamModel from '../database/models/sequelizeTeams';
import matchModel from '../database/models/sequelizeMatches';
import * as Jwt from 'jsonwebtoken';
import 'dotenv/config';
// @ts-ignore
import chaiHttp = require('chai-http');
import allMatchesMock from '../helpers/mocks/allMatchesMock';
import trueMatchesMock from '../helpers/mocks/trueMatchesMock';
import falseMatchesMock from '../helpers/mocks/falseMatchesMock';

import { app } from '../app';
const secret = process.env.JWT_SECRET || ('secret' as Jwt.Secret);
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';
// import IUser from '../entities/Iuser.interface';

chai.use(chaiHttp);

const { expect } = chai;

describe('1: Teste da rota login', () => {
  // casos de missin parameters
  it('1-1: quando a requisição é feita não permita o acesso sem informar um email, deve ser retornado um status 400', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ password: 'secret_admin' });
    expect(httpResponse.status).to.be.equal(400);
  });

  it('1-2: quando a requisição é feita não permita o acesso sem informar um email, deve ser retornado um erro no formato string', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ password: 'secret_admin' });
    expect(httpResponse.body).to.have.property('message').to.be.a('string');
    expect(httpResponse.body.message).to.deep.equal('All fields must be filled');
  });

  it('1-3: quando a requisição é feita não permita o acesso sem informar uma senha, deve ser retornado um status 400', async () => {
     const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
    expect(httpResponse.status).to.be.equal(400);
  });

  it('1-4: quando a requisição é feita não permita o acesso sem informar um email, deve ser retornado um erro no formato string', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
    expect(httpResponse.body).to.have.property('message').to.be.a('string');
    expect(httpResponse.body.message).to.deep.equal('All fields must be filled');
  });

  it('1-5: quando a requisição é feita não permita o acesso sem informar uma senha, deve ser retornado um status 400', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
    expect(httpResponse.status).to.be.equal(400);
  });

  it('1-6: quando a requisição é feita não permita o acesso sem informar uma senha, deve ser retornado um erro no formato string', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });
    expect(httpResponse.body).to.have.property('message').to.be.a('string');
    expect(httpResponse.body.message).to.deep.equal('All fields must be filled');
  });

  // casos de email inválido
  it('1-7: quando a requisição é feita com um email inválido, deve ser retornado um status 401', async () => {
    sinon.stub(userModel,'findOne').resolves(null);
    const httpResponse = await chai.request(app).post('/login').send({ email: 'fakeuser@fakedomain.com', password: 'secret_admin' });
    expect(httpResponse.status).to.be.equal(401);
  });

  it('1-8: quando a requisição é feita com um email inválido, deve ser retornado um erro no formato string', async () => {
    const httpResponse = await chai.request(app).post('/login').send({ email: 'fakeuser@fakedomain.com', password: 'secret_admin' });
    expect(httpResponse.body).to.have.property('message').to.be.a('string');
    expect(httpResponse.body.message).to.deep.equal('Incorrect email or password');
  });

  // casos de senha inválida
  it('1-9: quando a requisição é feita com uma senha inválida, deve ser retornado um status 401', async () => {
    const httpResponse = await chai.request(app).post('/login').send({email: 'admin@admin.com', password: 'bogus_password'});
    expect(httpResponse.status).to.be.equal(401);
  });

  it('1-10: quando a requisição é feita com uma senha inválida, deve ser retornado um erro no formato string', async () => {
    const httpResponse = await chai.request(app).post('/login').send({email: 'admin@admin.com', password: 'bogus_password'});
    expect(httpResponse.body).to.have.property('message').to.be.a('string');
    expect(httpResponse.body.message).to.deep.equal('Incorrect email or password');
    sinon.restore();
  });

/// caso de sucesso 
  it('1-11: quando a requisição é feita com sucesso, deve ser retornado um status 200', async () => {
    const user = {
      id: 1,
      username: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      role: 'admin',
    }; 
    sinon.stub(userModel,'findOne').resolves(user as any);
    // before(async () => sinon.stub(userModel,'findOne').resolves(user as any));
    // after(() => { sinon.restore() });

    const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });
    expect(httpResponse.status).to.be.equal(200);
  });

  it('1-12: quando a requisição é feita com sucesso, deve ser retornado token no formato string', async () => {
    const user = {
      id: 1,
      username: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      role: 'admin',
    };  
    // before(async () => sinon.stub(userModel, 'findOne').resolves(user as any));
    // after(()=>{ sinon.restore() });
    const httpResponse = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });
    expect(httpResponse.body).to.have.property('token').to.be.a('string');
    sinon.restore();
  });
});


describe('2: Teste da rota login/validate', () => {
  it('2-1: quando a requisição é feita sem informar um token, deve ser retornado um status 401', async () => {
    const httpResponse = await chai.request(app).get('/login/validate');
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body.message).to.be.equal('Token not found');
  });

  it('2-2: quando a requisição é feita com um token inválido, deve ser retornado um status 401', async () => {
    const httpResponse = await chai.request(app).get('/login/validate').set({ authorization: 'invalid_token' });
    expect(httpResponse.status).to.be.equal(500);
    expect(httpResponse.body.message).to.be.equal('jwt malformed');
  });

  it('2-3: quando a requisição é feita com um token incorreto (expirado), deve ser retornado um status 500', async () => {
    const token = Jwt.sign({ data: { id: 1, email: 'blablabla' } }, secret, { algorithm: 'HS256', expiresIn: '1s' });
    const httpResponse = await chai.request(app).get('/login/validate').set({ authorization: token });
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body.message).to.be.undefined
  });

  it('2-4: quando a requisição é feita com um token válido, deve ser retornado um status 200', async () => {
    const token = Jwt.sign({ data: { email: 'admin@admin.com', role: 'admin' }}, secret, { algorithm: 'HS256', expiresIn: '1h' });
    const httpResponse = await chai.request(app).get('/login/validate').set({ authorization: token });
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body.role).to.be.equal('admin');
  });
});

describe('3: Teste da rota teams ', () => {
  const response: any = [{
    "id": 16,
    "teamName": "São Paulo"
  },
  {
    "id": 17,
    "teamName": "São Paulo2"
  }];
  it('3-1: quando a requisição é feita com sucesso deve ser retornado um status 200', async () => {
    sinon.stub(teamModel, 'findAll').resolves(response as any);
    const httpResponse = await chai.request(app).get('/teams');
    expect(httpResponse.status).to.be.equal(200);
  });
  it('3-2: quando a requisição é feita com sucesso deve ser retornado um array', async () => {
    const httpResponse = await chai.request(app).get('/teams');
    expect(httpResponse.body).to.be.an('array');
    expect(httpResponse.body).to.deep.equal(response);
    sinon.restore();
  });
});

describe('4:  Teste da rota teams/:id', () => {
  const responseOne: any = [{
    "id": 16,
    "teamName": "São Paulo"
  }];
  it('4-1: quando a requisição é feita com sucesso deve ser retornado um status 200', async () => {
    sinon.stub(teamModel, 'findOne').resolves(responseOne as any);
    const httpResponse = await chai.request(app).get('/teams/16');
    expect(httpResponse.status).to.be.equal(200);
  });
  it('4-2: quando a requisição é feita com sucesso deve ser retornado um objeto', async () => {
    const httpResponse = await chai.request(app).get('/teams/16');
    expect(httpResponse.body).to.be.an('array');
    expect(httpResponse.body).to.deep.equal(responseOne);
    sinon.restore();
  });
  it('4-3: quando a requisição é feita com um id inválido deve ser retornado um status 404', async () => {
    sinon.stub(teamModel, 'findOne').resolves(null as any);
    const httpResponse = await chai.request(app).get('/teams/106');
    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body.message).to.be.equal('Team not found');
    sinon.restore();
  });
});

describe('5: Teste da rota matches ', () => {
  it('5-1: quando a requisição /matches é feita com sucesso deve ser retornado um status 200', async () => {
    sinon.stub(matchModel, 'findAll').resolves(allMatchesMock as any);
    const httpResponse = await chai.request(app).get('/matches');
    expect(httpResponse.status).to.be.equal(200);
  });
  it('5-2: quando a requisição /matches é feita com sucesso deve ser retornado um array', async () => {
    const httpResponse = await chai.request(app).get('/matches');
    expect(httpResponse.body).to.be.an('array');
    expect(httpResponse.body).to.deep.equal(allMatchesMock);
    sinon.restore();
  });
  it('5-3: quando a requisição /matches?inProgress=true é feita com sucesso deve ser retornado um status 200', async () => {
    sinon.stub(matchModel, 'findAll').resolves(trueMatchesMock as any);
    const httpResponse = await chai.request(app).get('/matches?inProgress=true');
    expect(httpResponse.status).to.be.equal(200);
  });
  it('5-4: quando a requisição /matches?inProgress=true é feita com sucesso deve ser retornado um array', async () => {
    const httpResponse = await chai.request(app).get('/matches?inProgress=true');
    expect(httpResponse.body).to.be.an('array');
    expect(httpResponse.body).to.deep.equal(trueMatchesMock);
    sinon.restore();
  });
  it('5-5: quando a requisição /matches?inProgress=false é feita com sucesso deve ser retornado um status 200', async () => {
    sinon.stub(matchModel, 'findAll').resolves(falseMatchesMock as any);
    const httpResponse = await chai.request(app).get('/matches?inProgress=false');
    expect(httpResponse.status).to.be.equal(200);
  });
  it('5-6: quando a requisição /matches?inProgress=false é feita com sucesso deve ser retornado um array', async () => {
    const httpResponse = await chai.request(app).get('/matches?inProgress=false');
    expect(httpResponse.body).to.be.an('array');
    expect(httpResponse.body).to.deep.equal(falseMatchesMock);
    sinon.restore();
  });
});     
