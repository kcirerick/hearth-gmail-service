// import app from './app';
// import request from 'supertest';
//
// describe('GET /', () => {
//   it('responds with status 200 and an array of contacts', async () => {
//     const response = await request(app).get('/');
//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Array);
//   });
// });

// Test the number of contacts === 100. (or less in the case that the user has no exchanged messages with 100 unique users)
// Test that contacts are unique by passing the results into a Set() object and making sure results match.
// OAuth2 flow was tested manually by navigating to http://localhost:3000/google/auth and trying to log in with
//      accounts that were and were not authorized test users.