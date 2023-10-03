/* eslint-disable semi */
import dgram from 'react-native-udp'

// send udp message
// echo "Hello, World!" | nc -u 192.168.1.2 8089

export function startListening() {
  const REMOTE_HOST = '73.170.148.25'
  const REMOTE_PORT = 8089

  const socket = dgram.createSocket({
    reusePort: true,
    type: 'udp4',
    debug: true,
  })

  const handle = (...args) => {
    console.log('[handle] called', ...args)
    // if (err) throw err
    // console.log('Error', err)
    // socket.close()
  }

  const sendData = data => {
    socket.send(data, undefined, undefined, REMOTE_PORT, REMOTE_HOST, handle)
  }

  socket.bind(REMOTE_PORT)
  socket.once('listening', () => {
    console.log('[lienting] socket is now listening!')
    sendData('Hello World')
  })

  socket.on('error', (...args) => {
    console.warn('[error] error:', ...args)
  })

  socket.on('message', (msg, rinfo) => {
    console.log('[message] received', msg, rinfo)
  })

  return socket
}
