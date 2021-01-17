import React , {useEffect, useState} from 'react';

import MessageHeader from "./MessageHeader/MessageHeader.component";
import MessageContent from "./MessageContent/MessageContent.component";
import MessageInput from "./MessageInput/MessageInput.component";
import firebase from "../../server/firebase";
import { connect } from 'react-redux';
import { Segment, Comment } from 'semantic-ui-react';
import "./Messages.css"

const Messages = (props) => {

    const messageRef = firebase.database().ref('messages');

    const [messagesState, setMessagesState] = useState([]);

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

    const displayMessages = () => {
        if (messagesState.length > 0) {
            return messagesState.map((message) => {
                return <MessageContent ownMessage={message.user.id === props.user.uid} key={message.timestamp} message={message} />
            })
        }
    }

    return <div className="messages"><MessageHeader/>
        <Segment className="messagecontent">
            <Comment.Group>
                {displayMessages()}
            </Comment.Group>
        </Segment>
    <MessageInput/></div>
}

const mapStateToProps = (state) => {
    return {
        channel : state.channel.currentChannel,
        user : state.user.currentUser
    }
}

export default connect(mapStateToProps)(Messages);