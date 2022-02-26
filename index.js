const inquirer = require("inquirer")
const chalk = require("chalk")

const createAccount = require("./src/createAccount")
const deposit = require("./src/deposit")
const exit = require("./src/exit")

operation()

//main function
function operation() {
    inquirer.prompt([
        {
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
        }
    ]).then(anwser => {
        const action = anwser["action"]

        if (action == "Criar Conta") {
            createAccount()
        } else if (action == "Consultar Saldo") {

        } else if (action == "Depositar") {
            deposit()
        } else if (action == "Sacar") {

        } else if (action == "Sair") {
           exit()
        }
    })
        .catch((err) => console.log(err))
}

module.exports = operation