
var getEmails = 'SELECT * FROM emails';
var postMessage = 'INSERT INTO emails (name,email,message) VALUES (?,?,?);';
var lastInsertId ='SELECT LAST_INSERT_ID()';





module.exports={
getEmails,
postMessage,
lastInsertId
}

