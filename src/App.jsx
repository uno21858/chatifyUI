import { useEffect, useState } from 'react'
import './App.css'
import { socket } from '../socket'
import { Channels, Chats, MyForm, Users } from './components'

const CHANNELS = ['general', 'random', 'help']

function App() {
  const [activeChannel, setActiveChannel] = useState('general')
  const [messages, setMessages] = useState({ general: [], random: [], help: [] })
  const [users, setUsers] = useState([])

  useEffect(() => {
    const onChatMessage = (msg) => {
      setMessages(prev => ({
        ...prev,
        [msg.channel]: [...(prev[msg.channel] || []), msg]
      }))
    }

    const onUsers = (userList) => {
      setUsers(userList)
    }

    const onHistorial = (mensajes) => {
      const normalized = mensajes.map(m => ({
        user: m.usuario,
        text: m.texto,
        channel: activeChannel,
      }))
      setMessages(prev => ({
        ...prev,
        [activeChannel]: normalized,
      }))
    }

    socket.on('chat message', onChatMessage)
    socket.on('users', onUsers)
    socket.on('historial', onHistorial)

    return () => {
      socket.off('chat message', onChatMessage)
      socket.off('users', onUsers)
      socket.off('historial', onHistorial)
    }
  }, [activeChannel])

  useEffect(() => {
    socket.emit('join channel', activeChannel)
  }, [])

  const handleChannelSelect = (channel) => {
    setActiveChannel(channel)
    socket.emit('join channel', channel)
  }

  return (
    <div className="flex h-screen bg-[#313338] text-[#dcddde] font-sans">
      <div className="w-56 bg-[#2b2d31] p-4 flex flex-col gap-1 shrink-0">
        <h2 className="text-white font-semibold text-base pb-3 mb-1 border-b border-[#3f4147]">
          Chatify
        </h2>
        <Channels
          channels={CHANNELS}
          activeChannel={activeChannel}
          onChannelSelect={handleChannelSelect}
        />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-4 py-3 border-b border-[#3f4147] font-bold text-white shrink-0">
          # {activeChannel}
        </div>
        <Chats messages={messages[activeChannel]} />
        <MyForm activeChannel={activeChannel} />
      </div>
      <div className="w-48 bg-[#2b2d31] p-4 shrink-0">
        <Users users={users} />
      </div>
    </div>
  )
}

export default App
