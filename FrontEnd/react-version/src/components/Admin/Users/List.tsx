import React, { useState, useEffect } from 'react';
import { Button, Heading, Table, Thead, Tbody, Tr, Th, Td, CircularProgress } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { RouteProps } from '../../../types'
import { accountService } from '../../../services/accountService';

export function List({ match }: RouteProps) {
    const { path }: any = match;
    const [users, setUsers] = useState<any>();

    useEffect(() => {
        accountService.getAll().then(x => setUsers(x));
    }, []);

    function deleteUser(id: number) {
        setUsers(users.map((x: any) => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        accountService.delete(id).then(() => {
            setUsers((users: any) => users.filter((x: any) => x.id !== id));
        });
    }

    return (
        <div>
            <Heading as="h1">Users</Heading>
            <p>All users from secure (admin only) api end point:</p>
            <Button><Link to={`${path}/add`}>Add User</Link></Button>
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th style={{ width: '30%' }}>Name</Th>
                        <Th style={{ width: '30%' }}>Email</Th>
                        <Th style={{ width: '30%' }}>Role</Th>
                        <Th style={{ width: '10%' }}></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users && users.map((user: any) =>
                        <Tr key={user.id}>
                            <Td>{user.title} {user.firstName} {user.lastName}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.role}</Td>
                            <Td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <Button onClick={() => deleteUser(user.id)} isDisabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <CircularProgress isIndeterminate color="green.300" />
                                        : <span>Delete</span>
                                    }
                                </Button>
                            </Td>
                        </Tr>
                    )}
                    {!users &&
                        <Tr>
                            <Td>
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </Td>
                        </Tr>
                    }
                </Tbody>
            </Table>
        </div>
    );
}