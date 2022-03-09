import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import { Chat, Send, Close, Search } from '@material-ui/icons';
import { Button, Popover, Tooltip } from '@material-ui/core';

import { io } from 'socket.io-client';

import './Chat.css';

const socket = io('http://localhost:5000');

const ChatComponent = () => {
	const [currentMessage, setCurrentMessage] = useState('');
	const [messageList, setMessageList] = useState([]);
	const [user] = useState(JSON.parse(localStorage.getItem('profile')));
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [search, setSearch] = useState('');

	const searchMessage = (value) => {
		[...document.querySelectorAll("p")]
			.filter(p => p.textContent === value)
			.forEach(p => p.scrollIntoView())
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		setSearch('');
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const sendMessage = async () => {
		if(currentMessage !== '') {
			const messageData = {
				author: user?.user,
				message: currentMessage,
				time: new Date(Date.now()).getHours() + ':' + (new Date(Date.now()).getMinutes() < 10 ? '0' : '') + new Date(Date.now()).getMinutes()
			}
			await socket.emit('send_message', messageData);
		}
	}

	useEffect(() => {
		socket.on('receive_message', (data) => {
			setMessageList((list) => [...list, data]);
			setCurrentMessage('');
		})

		if(user) {
			socket.emit('request_all_messages', messageList)
		}
		
		socket.on('send_all_messages', (data) => {
			setMessageList(data);
			setCurrentMessage('');
		})
	}, [socket])

	return (
		<div className='open-chat'>
			<Tooltip title={!user ? 'Log In to start messaging' : 'Open chat'} arrow>
				<span>
					<Button disabled={user ? false : true} onClick={handleClick}>
						<Chat />
					</Button>
				</span>
			</Tooltip>
			<Popover
				className='chat-window'
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
			<div className='chat-header'>
				<div className='chat-header-content'>
					<p>Live chat</p>
					<button className='chat-close-button' onClick={handleClose}><Close /></button>
				</div>
			</div>
				<div className='chat-search'>
					<input
						type='text'
						value={search}
						placeholder='Search Message...'
						onChange={(event) => setSearch(event.target.value)}
					/>
					<button className='chat-search-button' onClick={() => searchMessage(search)}><Search /></button>
				</div>
			<div className='chat-body'>
				<ScrollToBottom className='message-container'>
					{messageList?.map((messageContent) => {
						return (	
							<div key={messageContent?.id} className='message' id={user?.user?.id === messageContent?.author?.id ? 'you' : 'other'}>
								<div>
									<div className='message-content'>
										<p>{messageContent?.content}</p>
									</div>
									<div className='message-meta'>
										<p id='time'>{messageContent?.time}</p>
										<p id='author'>{messageContent?.author?.username}</p>
									</div>
								</div>
							</div>
						)
					})}
				</ScrollToBottom>
			</div>
			<div className='chat-footer'>
				<input
					type='text'
					maxLength="300"
					value={currentMessage}
					placeholder='Send Message...'
					onChange={(event) => setCurrentMessage(event.target.value)}
					onKeyPress={(event) => {
						event.key === 'Enter' && sendMessage();
					}}
				/>
				<button onClick={sendMessage}><Send /></button>
			</div>
			</Popover>
		</div>
	)
}

export default ChatComponent;