import React from 'react';
import { Comment , Image} from 'semantic-ui-react';
import TimeAgo from 'javascript-time-ago';
import en from "javascript-time-ago/locale/en";

import './MessageContent.css'

TimeAgo.locale(en);

const timeAgo = new TimeAgo();

const MessageContent = (props) => {
    return <Comment>
        <Comment.Avatar src={props.message.user.avatar} />
        <Comment.Content className={props.ownMessage ? "ownMessage" : null}>
            <Comment.Author>{props.message.user.name}</Comment.Author>
            <Comment.Metadata>{timeAgo.format(props.message.timestamp)}</Comment.Metadata>
            {props.message.image ? <Image src={props.message.image} /> :
                <Comment.Text>{props.message.content}</Comment.Text>
            }
        </Comment.Content>
    </Comment>
}

export default MessageContent;