import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import { io } from 'socket.io-client';

import './Chat.css';

const socket = io('http://localhost:5000');

const Chat = () => {
	const [currentMessage, setCurrentMessage] = useState('');
	const [messageList, setMessageList] = useState([]);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

	const sendMessage = async () => {
		if(currentMessage !== '') {
			const messageData = {
				author: user?.user,
				message: currentMessage,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
			}
			await socket.emit('send_message', messageData);
		}
	}

	useEffect(() => {
		socket.on('receive_message', (data) => {
			console.log(data)
			setMessageList((list) => [...list, data]);
			setCurrentMessage('');
		})
		// if(user) {
		// 	socket.emit('request_all_messages', messageList)
		// }
		// socket.on('send_all_messages', (data) => {
		// 	setMessageList((list) => [...list, data]);
		// 	setCurrentMessage('');
		// })
	}, [socket])

	return (
		<div className='chat-window'>
			<div className='chat-header'>
				<p>Live chat</p>
			</div>
			<div className='chat-body'>
					<ScrollToBottom className='message-container'>
						{messageList?.map((messageContent) => {
							return (	
								<div className='message' id={user?.user?.username === messageContent.author ? 'you' : 'other'}>
									<div>
										<div className='message-content'>
											<p>{messageContent.content}</p>
										</div>
											<div className='message-meta'>
												<p id='time'>{messageContent.time}</p>
												<p id='author'>{messageContent.author}</p>
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
					value={currentMessage}
					placeholder='Send Message...'
					onChange={(event) => setCurrentMessage(event.target.value)}
					onKeyPress={(event) => {
						event.key === 'Enter' && sendMessage();
					}}
				/>
				<button onClick={sendMessage}>&#9658;</button>
			</div>
		</div>
	)
}

export default Chat;