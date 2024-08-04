'use client'; 

import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
}

interface ResponseData {
  users: User[];
  totalPages: number;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async (pageNumber: number, searchTerm: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<ResponseData>('/api/users', {
        params: {
          page: pageNumber,
          limit: 10,
          search: searchTerm,
        },
      });
      console.log('Fetched data:', data); // Log fetched data
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, search);
  }, [page, search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1>Users</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search users..."
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {users.map(user => (
              <li key={user._id}>
                {user.name} 
                <button onClick={() => alert(`Message ${user.name}`)}>Message</button>
              </li>
            ))}
          </ul>
          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={page === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
