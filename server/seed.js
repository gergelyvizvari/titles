const bcrypt = require('bcrypt')
const chalk = require('chalk');
const sqlite3 = require('sqlite3').verbose()

const dbName = 'titles_db'
const saltRounds = 10
const initialName = 'admin'
const initialPassword = 'admin'

const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log(chalk.green(`\nConnected to the '${dbName}' SQlite database.\n`))

    try {
        db.serialize(function () {
            console.log(chalk.yellow('crete user table ...'))
            db.run(`CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255),
                password VARCHAR(72)
            )`)

            console.log(chalk.yellow('crete title table ...'))
            db.run(`CREATE TABLE IF NOT EXISTS title (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255)
            )`)

            console.log(chalk.yellow('crete category table ...'))
            db.run(`CREATE TABLE IF NOT EXISTS category (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                parent_id INTEGER,
                name VARCHAR(255)
            )`)

            console.log(chalk.yellow('crete tag table ...'))
            db.run(`CREATE TABLE IF NOT EXISTS tag (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255)
            )`);

            console.log(chalk.yellow('crete tag_title table ...'))
            db.run(`CREATE TABLE IF NOT EXISTS tag_title (
                tag_id INTEGER,
                title_id INTEGER
            )`)

            // truncate user table if in case its already exists
            console.log(`---\n${chalk.magenta('truncate user table')}`)
            db.run('DELETE FROM user');

            console.log(`---\n${chalk.blue('seed user table')}`)
            const stmt = db.prepare('INSERT INTO user (name, password) VALUES (?, ?)')
            const hash = bcrypt.hashSync(initialPassword, saltRounds);
            stmt.run(initialName, hash)
            stmt.finalize();

            db.close();
            console.log(chalk.green('\nseeding has been finished!\n'))

        })
    } catch (error) {
        console.error('\n Something bad happened')
    }
})