const chalk = require("chalk")
const fs = require("fs")

function checkAccount(accountName) {
    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black("Esta conta não existe, tente novamente."))
        return false
    } else return true
}

module.exports = checkAccount