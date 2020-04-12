//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('/GET order', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/v1/listorders')
            .end((err, res) => {
                 console.log(res)
              done();
            });
      });
  });