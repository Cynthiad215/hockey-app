const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('./server');

describe('Teams API', () => {
    context('GET /teams', () => {
        it('Should have property "West"', (done)=>{
            chai.request(app).get('/teams')
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('West');
                    done(err);
                })
        });
    });
});