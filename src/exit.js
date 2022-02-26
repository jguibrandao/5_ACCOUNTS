const chalk = require("chalk")

function exit() {
    console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"))
    process.exit
    }

module.exports = exit