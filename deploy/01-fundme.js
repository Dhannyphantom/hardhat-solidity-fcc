module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [],
        log: true,
    })

    log("Deployed sucessfully")

    log("--------------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
