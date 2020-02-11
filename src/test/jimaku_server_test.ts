import chai from 'chai'
import { expect } from 'chai'
import chaiHttp from 'chai-http'
import JimakuServer from 'server/jimaku_server'

chai.use(chaiHttp)

describe('JimakuServer', () => {

  describe('#/show_jimaku', () => {
    const server: JimakuServer = new JimakuServer()
    before(() => { server.listen(3030) })
    after(()=>{ server.close() })

    context('when received URL encoded queris', () => {
      context('when EUC-JP', () => {
        it('should return URI malformed', (done) => {
          chai.request('http://localhost:3030')
            .get('/show_jimaku')
            .query({ jimaku: '%BB%FA%CB%EBtest' })
            .end((err, res) => {
              expect(res.status).to.equal(500)
              expect(res.body.title).to.equal('URI malformed')
              done()
            })
        })
      })

      context('when UTF-8', () => {
        let jimaku = '%E5%AD%97%E5%B9%95test'

        it('should return status code 200', (done) => {
          chai.request('http://localhost:3030')
            .get('/show_jimaku')
            .query({ jimaku: jimaku })
            .end((err, res) => {
              expect(res.status).to.equal(200)
              done()
            })
        })

        context('when specified style query', () => {
          context('when JSON format is wrong', () => {
            let style = '{"color"; red}'
            it('should return JSON format error', (done) => {
              chai.request('http://localhost:3030')
                .get('/show_jimaku')
                .query({ jimaku: jimaku, style: style })
                .end((err, res) => {
                  expect(res.status).to.equal(500)
                  expect(res.body.title).to.equal('JSON format error')
                  done()
                })
            })
          })

          context('when JSON format is correct', () => {
            let style = '{"color":"blue","font-size":"50px"}'
            it('should return status code 200', (done) => {
              chai.request('http://localhost:3030')
                .get('/show_jimaku')
                .query({ jimaku: jimaku, style: style })
                .end((err, res) => {
                  expect(res.status).to.equal(200)
                  done()
                })
            })
          })
        })
      })
    })
  })
})