import {useCallback, useEffect, useRef, useState} from 'react'
import dgram from 'react-native-udp'

export function useSocket(host, port) {
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  const socket = useRef(
    dgram.createSocket({
      reusePort: true,
      type: 'udp4',
      debug: true,
    }),
  ).current

  const sendData = useCallback(
    (data, remoteHost = host, remotePort = port) => {
      console.log('[sendData] sending', data, remoteHost, remotePort)
      socket.send(data, undefined, undefined, remotePort, remoteHost, onError)
    },
    [socket, host, port, onError],
  )

  const onListen = useCallback(() => {
    console.log('[listening] socket is now listening!')
    setIsListening(true)
    // once listening we need to hole punch
    sendData('hole punch', host, port)
  }, [sendData, host, port])

  const onData = useCallback((...args) => {
    console.log('[data] received', ...args)
    setData(history => [...history, [args]])
  }, [])

  const onError = useCallback((...args) => {
    console.warn('[error] error:', ...args)
    setError(args)
  }, [])

  useEffect(() => {
    if (!socket) {
      console.warn('[useSocket] socket is not initialized!')
      return
    }
    if (!host || !port) {
      console.warn('[useSocket] host or port is not defined!')
      return
    }
    // bind socket to the port
    socket.bind(port)

    // bind callback methods
    socket.once('listening', onListen)
    socket.on('message', onData)
    socket.on('error', onError)

    // add dependencies
  }, [socket, onListen, onData, onError, host, port])

  // return as object
  return {isListening, error, data, sendData}
}
