const request = require('supertest');
const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('GET', () => {
    it('responds with 200 status code and json content type', () => {
      return request(server)
        .get('/dockerCont/getTasks')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('responds to invalid request with 400 status code and error message in body', () => {
      return request(server).get('/dockerCont/saveSwarmDat').expect(400);
    });

    // it('responds with containers list', () => {
    //   const response = request(server).get('/getContainers');
    //   expect(typeof response.body).toBe('array');
    // })
  });

  describe('POST', () => {
    it('responds with 500 status code and json content type', () => {
      return request(server)
        .post('/dockerCont/saveSwarmData')
        .send({ UUID: '', containerList: '' })
        .expect('Content-Type', /json/)
        .expect(500);
    });
  });
});
