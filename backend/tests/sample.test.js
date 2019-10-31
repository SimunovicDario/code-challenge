const request = require('supertest');
const app = require('../app');

describe('Encoder', () => {
  it('should succeed and return A1', async () => {
    const res = await request(app)
      .post('/encoder')
      .set('Authorization', 'xyz0987654321')
      .send({input: 'A'});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({output: 'A1'});
  });

  it('should succeed and return X3Y4Z2Q1X2', async () => {
    const res = await request(app)
      .post('/encoder')
      .set('Authorization', 'xyz0987654321')
      .send({input: 'XXXYYYYZZQXX'});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({output: 'X3Y4Z2Q1X2'});
  });

  it('should succeed even with lowercase letters', async () => {
    const res = await request(app)
      .post('/encoder')
      .set('Authorization', 'xyz0987654321')
      .send({input: 'Aa'});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({output: 'A2'});
  });

  it('should fail because the string is empty', async () => {
    const res = await request(app)
      .post('/encoder')
      .set('Authorization', 'xyz0987654321')
      .send({input: ''});
    expect(res.statusCode).toEqual(400);
  });

  it('should fail because the string contains non-alphabet characters', async () => {
    const res = await request(app)
      .post('/encoder')
      .set('Authorization', 'xyz0987654321')
      .send({input: 'A1a#'});
    expect(res.statusCode).toEqual(400);
  });




});