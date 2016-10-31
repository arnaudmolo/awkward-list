const accessToken = '179001457.57f57aa.99c4cc1fcafb4f76b9ac104c40026bee'
const Ig = require('instagram-api')
const ig = new Ig(accessToken)
const Twitter = require('twitter')
const giphy = require('giphy')('dc6zaTOxFJmzC')

const client = new Twitter({
  consumer_key: '2MhB22tw8xyNAABFzrCwL0eqw',
  consumer_secret: '1RlVJt8eVFBxLjjlUOEYdX0xp4ojMCgoAjhMq1iCh47WBD32yB',
  access_token_key: '132712308-KlNGXAqPMwrGsCknRGLIC2mnlbDG0hxCPJJqGffB',
  access_token_secret: 'dI3P6yCqMavYjn3eyD3JIeyKkCD6dirTmqw5z278GpDX9'
})

const listParams = {
  list_id: '717719667406725121',
  slug: 'wtf-accounts',
  owner_screen_name: 'arnaudmolo',
  include_rts: false,
  include_entities: false
}

const getNewTweets = function async () {
  return new Promise((resolve, reject) =>
    client.get('/lists/statuses', listParams, function (error, tweets) {
      if (error) {
        return reject(error)
      }
      return resolve(tweets)
    })
  )
}

module.exports = function (app) {
  app.get('/api/giphy', (req, res) => {
    return giphy.search(req.query, (err, response) => {
      if (err) {
        console.error(err)
        return err
      }
      return res.send(response)
    })
  })
  app.get('/api/instagram', (req, res) =>
    ig.userSelfMedia().then(res.send.bind(res))
  )
  app.get('/api/tweets', (req, res) => {
    getNewTweets().then(res.send.bind(res))
  })
}
