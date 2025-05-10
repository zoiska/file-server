const fs = require('fs').promises
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const usersPath = path.join(__dirname, '../passport/users.json')

exports.addUser = async ({username, password}) => {
    const data = await fs.readFile(usersPath, 'utf8')
    const users = JSON.parse(data)

    if(users.find((u) => u.username === username)) {
        throw new Error('Username taken')
    } else {
        const uuid = uuidv4();
        users.push({uuid, username, password})
        await fs.writeFile(usersPath, JSON.stringify(users, null, 2))

        return 'Registration successful'
    }
}