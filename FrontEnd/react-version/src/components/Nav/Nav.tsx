import React, { ReactNode, useState, useEffect } from 'react'
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    Stack,
  } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink, Route } from 'react-router-dom'
import { Role } from '../../helpers'
import { accountService } from '../../services/accountService'
  
const Links = ['Home', 'Profile'];
const urls = ['/', '/profile']

const NavLink = ({ children, link }: { children: ReactNode, link?: string }) => (
    <Link
        as={ReactRouterLink}
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        to={link}>
        
        {children}
    </Link>
);

export function Navbar({children}: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);


    return (
        <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: !isOpen ? 'none' : 'inherit' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <Box>Logo</Box>
                    <HStack
                    as={'nav'}
                    spacing={4}
                    display={{ base: 'none', md: 'flex' }}>
                    {Links.map((link) => (
                        <NavLink key={link}>{link}</NavLink>
                    ))}
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    <Menu>
                    <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}>
                        <Avatar
                        size={'sm'}
                        src={
                            'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                        }
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={accountService.logout}>Logout</MenuItem>
                    </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            {isOpen ? (
            <Box pb={4}>
                <Stack as={'nav'} spacing={4}>
                {Links.map((link, index) => (
                    <NavLink key={link} link={urls[index]}>{link}</NavLink>
                ))}
                {user.role === Role.Admin && 
                    <NavLink link="/admin">Admin</NavLink>
                }
                </Stack>
            </Box>
            ) : null}
        </Box>
        <Route path="/admin" component={AdminNav} />
        {children}
        </>
    );
}

function AdminNav({match, children}: { children: ReactNode, match: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { path } = match;

    return (
        <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: !isOpen ? 'none' : 'inherit' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <Box>Logo</Box>
                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}>
                        <NavLink link={`${path}/users`}>Users</NavLink>
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    <Menu>
                    <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}>
                        <Avatar
                        size={'sm'}
                        src={
                            'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                        }
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={accountService.logout}>Logout</MenuItem>
                    </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            {isOpen ? (
            <Box pb={4}>
                <Stack as={'nav'} spacing={4}>
                    <NavLink link={`${path}/users`}>Users</NavLink>
                </Stack>
            </Box>
            ) : null}
        </Box>

        {children}
        </>
    );
}