/** @param {NS} ns **/
export async function main(ns) {

    const args = ns.flags([
        ['help', false]
    ]);

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
    var moneyThresh = ns.getServerMaxMoney(host) * 0.99;

    // Defines the maximum security level the target server can
    // have. If the target's security level is higher than this,
    // we'll weaken it before doing anything else
    var securityThresh = ns.getServerMinSecurityLevel(host) + 5;

    if (!ns.hasRootAccess(host)) {
        ns.tprint("Root access denied.");
        ns.tprint("Run 'run spider.js' first to get root access.");
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