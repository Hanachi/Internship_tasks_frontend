import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import { Chat, Send, Close } from '@material-ui/icons';
import { Button, Popover } from '@material-ui/core';

import { io } from 'socket.io-client';

import './Chat.css';

const socket = io('http://localhost:5000');

const ChatComponent = () => {
	const [currentMessage, setCurrentMessage] = useState('');
	const [messageList, setMessageList] = useState([]);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
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
		<div>
			<Button className='open-chat' disabled={user ? false : true} onClick={handleClick}>
				<Chat />
			</Button>
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