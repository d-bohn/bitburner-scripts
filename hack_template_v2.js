/** @param {NS} ns **/
export async function main(ns) {

    const args = ns.flags([['help', false]]);

    let host = args._[0];

    if (args.help || !host) {
        ns.tprint("This script will generate money by hacking a target server.");
        ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} n00dles`);
        return;
    }

    // Defines how much money a server should have before we hack it
    // In this case, it is set to 75% of the server's max money
    var moneyThresh = ns.getServerMaxMoney(host) * 0.70;

    // Defines the maximum security level the target server can
    // have. If the target's security level is higher than this,
    // we'll weaken it before doing anything else
    var securityThresh = ns.getServerMinSecurityLevel(host) + 5;

    // If we have the BruteSSH.exe program, use it to open the SSH Port
    // on the target server
    if (ns.fileExists('BruteSSH.exe', "home")) {
        ns.brutessh(host);
        ns.tprint("SSH Detected. Attempting to BruteSSH.")
    }
    // if (ns.fileExists('FTPCrack.exe', "home")) {
    //     ns.ftpcrack(host);
    // }
    // if (ns.fileExists('relaySMTP.exe', "home")) {
    //     ns.relaysmtp(host);
    // }
    // if (ns.fileExists('HTTPWorm.exe', "home")) {
    //     ns.httpworm(host);
    // }
    // if (ns.fileExists('SQLInject.exe', "home")) {
    //     ns.sqlinject(host);
    // }

    // Get root access to target server
    if (!ns.hasRootAccess(host)) {
        ns.tprint("Root access denied. Attempting to NUKE.");
        ns.nuke(host);
    }

    // Infinite loop that continously hacks/grows/weakens the target server
    while (true) {
        if (ns.getServerSecurityLevel(host) > securityThresh) {
            // If the server's security level is above our threshold, weaken it
            await ns.weaken(host);
        } else if (ns.getServerMoneyAvailable(host) < moneyThresh) {
            // If the server's money is less than our threshold, grow it
            await ns.grow(host);
        } else {
            // Otherwise, hack it
            await ns.hack(host);
        }
    }
}
