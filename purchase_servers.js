/** @param {NS} ns **/
export async function main(ns) {
    // Constants
    const max_servers = ns.getPurchasedServerLimit();

    // Args
    const args = ns.flags([
        ['help', false]
    ]);

    let i = args._[0];
    const ram = args._[1];
    const server_to_hack = args._[2]

    if (args.help) {
        ns.tprint(`USAGE: run ${ns.getScriptName()} STARTNUM RAM SERVER_TO_HACK`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} 0 16 n00dles`);
        return;
    }

    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    while (true) {
        let current_servers = ns.getPurchasedServers();
        // Remove smallest server
        if (current_servers.length === max_servers) {
            let servers_ram = [];

            for (let s = 0; s < current_servers.length; s++) {
                let s_ram = ns.getServerMaxRam(current_servers[s]);
                // ns.tprint(s_ram);
                servers_ram.push(s_ram)
            }

            const min_ram = Math.min(...servers_ram);

            let my_servers = []

            for (let r = 0; r < current_servers.length; r++) {
                my_servers.push({
                    server_name: current_servers[r],
                    server_RAM: servers_ram[r]
                });
            }

            function findMinRAM(servers) {
                return servers.server_RAM === min_ram;
            }

            const first_find = my_servers.find(findMinRAM);

            if (first_find.server_RAM === ram) break;

            ns.tprint(`Deleting server: ${first_find.server_name}`);
            ns.killall(first_find.server_name);
            ns.deleteServer(first_find.server_name);
        }

        // Check if we have enough money to purchase a server
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {

            const hostname = ns.purchaseServer(`myServo-${ram}-${i}`, ram);
            ns.tprint(`Hostname: ${hostname}`)

            await ns.scp("hack_template_v2.js", hostname);

            let scriptRam = ns.getScriptRam("hack_template_v2.js");
            let serverRam = ns.getServerMaxRam(hostname);
            let threads = Math.floor(serverRam / scriptRam);

            ns.exec("hack_template_v2.js", hostname, threads, server_to_hack);

            ++i;
        }
        await ns.sleep(1000)
    }
}