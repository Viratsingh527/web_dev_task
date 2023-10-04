const getSender = (loggedUser, users) => {
    if (Array.isArray(users) && users.length >= 2 && loggedUser && loggedUser._id) {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    } else {
        // Handle the case where the data is not properly initialized or missing
        return "Sender Name Unavailable";
    }
};
const getSenderObject = (loggedUser, users) => {
    if (Array.isArray(users) && users.length >= 2 && loggedUser && loggedUser._id) {
        return users[0]._id === loggedUser._id ? users[1] : users[0];
    } else {
        // Handle the case where the data is not properly initialized or missing
        return "Sender Name Unavailable";
    }
};

const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 && (messages[i + 1].sender._id !== m.sender._id || messages[i + 1].sender._id === undefined) && messages[i].sender._id !== userId
    )
}
const lastMessage = (messages, i, userId) => {
    return (i === messages.length - 1 && messages[messages.length - 1].sender._id !== userId && messages[messages.length - 1])
}

const isSameSenderMargin = (messages, m, i, userId) => {
    if (i < messages.length - 1 && messages[i + 1].sender._id === m.sender._id && messages[i].sender._id !== userId) {
        return 37;
    }
    else if ((i < messages.length - 1 && messages[i + 1].sender._id !== m.sender._id && messages[i].sender._id !== userId) || (i === messages.length - 1 && messages[i].sender._id !== userId)) {
        return 0;
    }
    else {
        return "auto";
    }
}
const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id == m.sender._id;
}

module.exports = { getSender, getSenderObject, isSameSender, lastMessage, isSameSenderMargin, isSameUser }