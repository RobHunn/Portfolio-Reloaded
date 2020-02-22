
var getEmails = 'SELECT * FROM emails';
var postMessage = 'INSERT INTO emails (name,email,message) VALUES (?,?,?)'




module.exports={
getEmails,
postMessage
}

