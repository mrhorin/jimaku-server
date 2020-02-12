import JimakuClient from 'client/jimaku_client'

const client = new JimakuClient()
client.jimakuElement = document.getElementById('jimaku')
client.connect()