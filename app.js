
const fastify = require('fastify')()

fastify.register(require('fastify-mysql'), {
  connectionString: 'mysql://tallermfrn:tallermfrn@db4free.net/tallermfnr'
})

fastify.get('/user/:id', (req, reply) => {
  fastify.mysql.getConnection(onConnect)

  function onConnect (err, client) {
    if (err) return reply.send(err)

    client.query(
      'SELECT id, nombre, pass, datoxddd FROM usuarios WHERE id=?', [req.params.id],
      function onResult (err, result) {
        client.release()
        reply.send(err || result)
      }
    )
  }
})

fastify.listen(150000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})

console.log("XD");