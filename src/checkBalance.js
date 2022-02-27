const chalk = require("chalk")
const inquirer = require("inquirer")
const checkAccount = require("./helpers/checkAccount")
const getAccount = require("./helpers/getAccount")

function checkBalance() {
    const operation = require("../index")

    inquirer.prompt([
        {
            name: "accountName",
            message: "Qual o nome da sua conta?"
        }
    ]).then((answer) => {
        const accountName = answer["accountName"]

        if(!checkAccount(accountName)) {
            return checkBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(
            `O saldo da conta de ${accountName} é de R$${accountData.balance}`
        ))

        operation()
    })
    .catch((err) => console.log(err))
}

module.exports = checkBalance