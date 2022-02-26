const inquirer = require("inquirer")
const chalk = require("chalk")

const fs = require("fs")

function createAccount() {
    console.log(chalk.bgGreen.black("Obrigado por escolher o nosso banco!"))
    console.log(chalk.green("Defina as opções da sua conta a seguir:"))

    buildAccount()
}

function buildAccount() {
    const operation = require("../index.js")

    inquirer.prompt([
        {
            name: "accountName",
            message: "Digite um nome para sua conta:"
        }
    ]).then(anwser => {
        const accountName = anwser["accountName"]

        console.info(accountName)

        if (!fs.existsSync("accounts")) {
            fs.mkdirSync("accounts")
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(
                chalk.bgRed.black("Nome de usuário já existente. Tente novamente")
            )
            buildAccount()
            return
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            '{"balance": 0}',
            function (err) {
                console.log(err)
            })

        console.log(chalk.green("Conta criada"))
        operation()
    })
        .catch(err => console.log(err))
}

module.exports = createAccount