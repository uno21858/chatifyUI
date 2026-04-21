import { useState } from 'react'
import { socket } from '../../socket'

function MyForm({ activeChannel }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    socket.emit('chat message', { text: message, channel: activeChannel })
    setMessage('')
  }

  return (
    <form className="p-4 flex gap-2 shrink-0" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={`Message #${activeChannel}`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-3.5 py-2.5 bg-[#383a40] rounded-lg text-[#dcddde] outline-none text-sm placeholder:text-[#6d6f78]"
      />
      <button
        type="submit"
        className="px-4 py-2.5 bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-lg text-sm cursor-pointer transition-colors"
      >
        Send
      </button>
    </form>
  )
}

export default MyForm
