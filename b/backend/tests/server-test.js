const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const expect = chai.expect
chai.use(chaiHttp)

describe('server', () => {
  describe('GET /', () => {
    it('should return an empty array', () => {
      return chai.request(server.app)
        .get('/')
        .then(res => {
          expect(res.body).to.deep.equal({ success: true, items: [] })
        })
    })
  })
  describe('POST / item=abc!@$^&*()-=_+[];\',./{}|:"<>?', () => {
    it('should be successful', () => {
      return chai.request(server.app)
        .post('/')
        .type('form')
        .send({ item: 'abc!@$^&*()-=_+[];\',./{}|:"<>?' })
        .then(res => {
          expect(res.body).to.deep.equal({ success: true })
          return chai.request(server.app).get('/')
        })
        .then(res => {
          expect(res.body).to.deep.equal({
            success: true,
            items: ['abc!@$^&*()-=_+[];\',./{}|:"<>?']
          })
        })
    })
  })
  describe('PUT /abc!@$^&*()-=_+[];\',./{}|:"<>?', () => {
    it('should be successful', () => {
      return chai.request(server.app)
        .put('/abc!@$^&*()-=_+[];\',./{}|:"<>?')
        .type('form')
        .send({ company: 'ABC Bank', price: 123000 })
        .then(res => {
          expect(res.body).to.deep.equal({ success: true })
        })
    })
    it('should be successful again', () => {
      return chai.request(server.app)
        .put('/abc!@$^&*()-=_+[];\',./{}|:"<>?')
        .type('form')
        .send({ company: 'DEF Bank', price: 456000 })
        .then(res => {
          expect(res.body).to.deep.equal({ success: true })
        })
    })
  })
  describe('GET /abc!@$^&*()-=_+[];\',./{}|:"<>?', () => {
    it('should return the quotes', () => {
      return chai.request(server.app)
        .get('/abc!@$^&*()-=_+[];\',./{}|:"<>?')
        .then(res => {
          expect(res.body).to.deep.equal({ success: true, quotes: {
            'ABC Bank': '123000',
            'DEF Bank': '456000'
          }})
        })
    })
  })
  describe('DELETE /abc!@$^&*()-=_+[];\',./{}|:"<>?', () => {
    it('should be successful', () => {
      return chai.request(server.app)
        .delete('/abc!@$^&*()-=_+[];\',./{}|:"<>?')
        .type('form')
        .then(res => {
          expect(res.body).to.deep.equal({ success: true })
          return chai.request(server.app).get('/')
        })
        .then(res => {
          expect(res.body).to.deep.equal({ success: true, items: [] })
        })
    })
  })
  describe('GET /abc!@$^&*()-=_+[];\',./{}|:"<>?', () => {
    it('should be unsuccessful', () => {
      return chai.request(server.app)
        .get('/abc!@$^&*()-=_+[];\',./{}|:"<>?')
        .then(res => {
          expect(res.body.success).to.be.false
        })
    })
  })
  describe('GET / after deleting item', () => {
    it('should return an empty array', () => {
      return chai.request(server.app)
        .get('/')
        .then(res => {
          expect(res.body).to.deep.equal({ success: true, items: [] })
        })
    })
  })
})
