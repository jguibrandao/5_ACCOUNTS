const inquirer = require("inquirer")
const chalk = require("chalk")

const fs = require("fs")

operation()

function operation() {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "O que você deseja fazer",
        choices: [
            "Criar Conta",
            "Consultar Saldo",
            "Depositar",
            "Sacar",
            "Sair"
        ]
    }]).then(anwser => {
        const action = anwser["action"]

        if(action == "Criar Conta") {
            createAccount()
        }
    })
    .catch((err) => console.log(err))
}

function createAccount() {
    console.log(chalk.bgGreen.black("Obrigado por escolher o nosso banco!"))
    console.log(chalk.green("Defina as opções da sua conta a seguir:"))

    buildAccount()
}

function buildAccount() {
    inquirer.prompt([
        {
            name: "accountName",
            message: "Digite um nome para sua conta:"
        }
    ]).then(anwser => {
        const accountName = anwser["accountName"]

        console.info(accountName)

        if(!fs.existsSync("accounts")) {
            fs.mkdirSync("accounts")
        }

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black("Nome de usuário já existente. Tente novamente"))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function (err) {
            console.log(err)
        })

        console.log(chalk.green("Conta criada"))
        operation()
    }).catch(err => console.log(err))
}