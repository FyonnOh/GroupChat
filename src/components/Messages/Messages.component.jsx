import React , {useEffect, useState} from 'react';

import MessageHeader from "./MessageHeader/MessageHeader.component";
import MessageContent from "./MessageContent/MessageContent.component";
import MessageInput from "./MessageInput/MessageInput.component";
import firebase from "../../server/firebase";
import { setfavouriteChannel, removefavouriteChannel } from "../../store/actioncreator";
import { connect } from 'react-redux';
import { Segment, Comment } from 'semantic-ui-react';
import "./Messages.css"

const Messages = (props) => {

    const messageRef = firebase.database().ref('messages');
    const usersRef = firebase.database().ref('users');

    const [messagesState, setMessagesState] = useState([]);

    const [searchTermState, setSearchTermState] = useState("");

    useEffect(() => {
        if(props.channel) {
            setMessagesState([]);
            messageRef.child(props.channel.id).on('child_added', (snap) => {
                setMessagesState((currentState) => {
                    let updatedState = [...currentState];
                    updatedState.push(snap.val());
                    return updatedState;
                })
            })
            return () => messageRef.child(props.channel.id).off();
        }
    }, [props.channel])
    //add props.channel, if props.channel changes, useEffect will be executed

    useEffect(() => {
        if (props.user) {
            usersRef.child(props.user.uid).child("favourite")
            .on('child_added', (snap) => {
                props.setfavouriteChannel(snap.val());
            })

            usersRef.child(props.user.uid).child("favourite")
            .on('child_removed', (snap) => {
                props.removefavouriteChannel(snap.val());
            })


            return () => usersRef.child(props.user.uid).child("favourite").off();
        }
    }, [props.user])


    const displayMessages = () => {
        let messagesToDisplay = searchTermState? filterMessageBySearchTerm() : messagesState;
        if (messagesToDisplay.length > 0) {
            return messagesToDisplay.map((message) => {
                return <MessageContent ownMessage={message.user.id === props.user.uid} key={message.timestamp} message={message} />
            })
        }
    }

    const uniqueUsersCount = () => {
        const uniqueUsers = messagesState.reduce((acc,message) => {
            if(!acc.includes(message.user.name)) {
                acc.push(message.user.name);
            }
            return acc;
        }, []);

        return uniqueUsers.length;
    }

    const searchTermChange = (e) => {
        const target = e.target;
        setSearchTermState(target.value);
    }

    const filterMessageBySearchTerm = () => {
        const regex = new RegExp(searchTermState,  "gi");
        const messages = messagesState.reduce((acc, message) => {
            if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
                acc.push(message);
            }
            return acc;
        }, []);
        return messages;
    }

    const starChange = () => {
        let favouriteRef = usersRef.child(props.user.uid).child("favourite").child(props.channel.id);
        if (isStarred()) {
            favouriteRef.remove();
        } else {
            favouriteRef.set({ channelId: props.channel.id, channelName: props.channel.name })
        }

    }

    const isStarred = () => {
        return Object.keys(props.favouriteChannels).includes(props.channel?.id);
    }

    if (props.user) {
    
        return <div className="messages"><MessageHeader starred={isStarred()} starChange={starChange} isPrivateChat={props.channel?.isPrivateChat} searchTermChange={searchTermChange} channelName={props.channel?.name} uniqueUsers={uniqueUsersCount()}/>
            <Segment className="messagecontent">
                <Comment.Group>
                    {displayMessages()}
                </Comment.Group>
            </Segment>
        <MessageInput/></div>
    } else {
        return null;
    }
}

const mapStateToProps = (state) => { 
    return {
        channel : state.channel.currentChannel,
        user : state.user.currentUser,
        favouriteChannels : state.favouriteChannel.favouriteChannel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setfavouriteChannel : (channel) => dispatch(setfavouriteChannel(channel)),
        removefavouriteChannel : (channel) => dispatch(removefavouriteChannel(channel))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);