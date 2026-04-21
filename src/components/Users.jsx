function Users({ users = [] }) {
  return (
    <div>
      <h3 className="text-[11px] text-[#949ba4] uppercase tracking-wide mb-2">
        Online — {users.length}
      </h3>
      {users.map(user => (
        <div key={user} className="py-1 text-[13px] text-[#949ba4] truncate">{user}</div>
      ))}
    </div>
  )
}

export default Users
