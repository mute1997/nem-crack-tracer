import nem from 'nem-sdk'

const trace = () => {
  let addresses = []
  const mainNetUrl = nem.default.model.nodes.defaultMainnet
  const mainNetPort = nem.default.model.nodes.defaultPort
  const endpoint = nem.default.model.objects.create('endpoint')(mainNetUrl, mainNetPort)
  const traceAddress = (address) => {
    return nem.default.com.requests.account.transactions.outgoing(endpoint, address).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res.data.map((transaction) => {
          const address_ = transaction.transaction.recipient
          const amount_ = transaction.transaction.amount

          if(addresses.indexOf(address_) >= 0) return
          addresses.push(address_)

          traceAddress(address_)
          return address_
        }))
      })
    })
  }

  return Promise.all([
    traceAddress('NC4C6PSUW5CLTDT5SXAGJDQJGZNESKFK5MCN77OG'),
    traceAddress('NA6JSWNF24Y7DVIUVPKRNAY7TPOFJJ7G2URL7KU5'),
    traceAddress('NDODXOWEIZGJSMAEURXACF4IEHC2CB7Q6T56V7SQ'),
    traceAddress('NB4QJJCLTZWVFWRFBKEMFOONOZFDH3V5IDK3G524'),
    traceAddress('NA7SZ75KF6ZKK267TRKCJDJBWP5JKIC2HA5PXCKW'),
    traceAddress('NCTWFIOOVITRZYSYIGQ3PEI3IMVB25KMED53EWFQ'),
    traceAddress('NBKLQYXEIVEEGARYPUM62UJIFHA3Y6R4LAPU6NP4'),
    traceAddress('NA7SZ75KF6ZKK267TRKCJDJBWP5JKIC2HA5PXCKW'),
  ]).then((address) => {
    return addresses
  })
}

trace().then((addresses) => {
  console.log(addresses)
})
