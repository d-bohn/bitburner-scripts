/** @param {NS} ns **/
import { spider } from "spider.js";

export async function main(ns) {
    const server_list = spider(ns, false, false);
    // ns.tprint(server_list);

    let servers = {};

    for (const server of server_list) {
        const s = {
            hostname: server,
            ram: ns.getServerMaxRam(server),
            money: ns.getServerMoneyAvailable(server),
            maxMoney: ns.getServerMaxMoney(server),
            minSecurity: ns.getServerMinSecurityLevel(server),
            currentSecurity: ns.getServerSecurityLevel(server),
            growth: ns.getServerGrowth(server),
            hack_time: ns.getHackTime(server),
            grow_time: ns.getGrowTime(server),
            weaken_time: ns.getWeakenTime(server),
            hack_chance: ns.hackAnalyzeChance(server),
        };
        servers[server] = s;
    }

    // ns.tprint(servers.n00dles);

    return servers;
}