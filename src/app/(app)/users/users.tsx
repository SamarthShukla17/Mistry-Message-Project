// app/users.tsx (assuming you meant 'app' as the folder name)

import React, { useState, useEffect } from 'react';

interface MistryUser {
  _id: string;
  username: string;
  isAcceptingMessages: boolean;
}

export default function users ()  {
  const [users, setUsers] = useState<MistryUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Users</h1>
      <input
        type="text"
        placeholder="Search Users"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user._id}>
            <p>Username: {user.username}</p>
            <p>Accepting Messages: {user.isAcceptingMessages ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
