function Chats({ messages = [] }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
      {messages.map((msg, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <span className="text-[11px] text-[#949ba4]">{msg.user}</span>
          <span className="text-[#dcddde]">{msg.text}</span>
        </div>
      ))}
    </div>
  )
}

export default Chats
