function Channels({ channels, activeChannel, onChannelSelect }) {
  return (
    <div className="flex flex-col gap-0.5">
      {channels.map(channel => (
        <div
          key={channel}
          onClick={() => onChannelSelect(channel)}
          className={`px-2 py-1.5 rounded cursor-pointer select-none text-sm transition-colors ${
            channel === activeChannel
              ? 'bg-[#404249] text-white'
              : 'text-[#949ba4] hover:bg-[#35373c] hover:text-[#dcddde]'
          }`}
        >
          # {channel}
        </div>
      ))}
    </div>
  )
}

export default Channels
