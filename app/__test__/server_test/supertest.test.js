const request = require("supertest");
const router = require('/Users/meimeixiong/Desktop/Desktop/Desktop Documents/Coding/CodeSmith/Immersive Program/Projects/OSP/Orcastration/server/routes/dockerContainer.js');

describe('Route integration', () => {
    describe('GET CONTAINERS', () => {
      it('responds with the correct status code', async () => {
        const response = await request(router).get('/getContainers')
        .expect(response.status).toEqual(200);
      });

    //   it('responds with containers list', async () => {
    //     const response = await request(router).get('/getContainers');
    //     expect(typeof response.body).toBe('object');
    //   })
    })
})