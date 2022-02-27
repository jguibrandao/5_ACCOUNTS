const chalk = require("chalk")
const inquirer = require("inquirer")
const checkAccount = require("./helpers/checkAccount")
const getAccount = require("./helpers/getAccount")
const fs = require("fs")

function withdraw() {
    inquirer.prompt([
        {
            name: "accountName",
            message: "Qual o nome da sua conta?"
        }
    ]).then((answer) => {
        const accountName = answer["accountName"]

        if(!checkAccount(accountName)) {
            return withdraw()
        }

        inquirer.prompt([
            {
                name: "amount",
                message: "Quanto você deseja sacar?"
            }
        ]).then((answer) => {
            const amount = answer["amount"]
            
            removeAmount(accountName, amount)
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

function removeAmount(accountName, amount) {
    const operation = require("..")

    const accountData = getAccount(accountName)

    if(!amount || amount <= 0) {
        console.log(chalk.bgRed.black("Valor inválido."))

        return withdraw()
    }

    if(accountData.balance < amount) {
        console.log(chalk.bgRed.black("Saldo da conta insuficiente."))
        return withdraw()
    }

    //withdraw
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    //saves file
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err)
        }
    )

    console.log(chalk.green(`Saque de R$${amount} feito com sucesso.`))

    operation()
}

module.exports = withdraw