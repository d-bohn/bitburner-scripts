/** @param {NS} ns **/
export async function main(ns) {
    const args = ns.flags([
        ['help', false],
        ['pr', false],
        ['verbose', false]
    ]);

    if (args.help) {
        ns.tprint(`USAGE: run ${ns.getScriptName()} --pr --verbose`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} --pr --verbose`);
        return;
    }

    spider(ns, args.pr, args.verbose);
}

export function spider(ns, pr, verbose) {
    //count breachable ports
    const portsAvailable = ns.fileExists("BruteSSH.exe", "home") + ns.fileExists("FTPCrack.exe", "home") + ns.fileExists("RelaySMTP.exe", "home") + ns.fileExists("HTTPWorm.exe", "home") + ns.fileExists("SQLInject.exe", "home");

    //populate initial hostnames array
    let hostnames = ns.scan(ns.getHostname(), true);

    //define uniqueness filter for recursive scan
    function unique(item) {
        return hostnames.indexOf(item) < 0;
    }

    //loop through each hostname in hostnames
    for (let i = 0; i < hostnames.length; i++) {
        let hostname = hostnames[i];

        //payload
        if (ns.getServerNumPortsRequired(hostname) <= portsAvailable) {
            if (ns.hasRootAccess(hostname) === false) {
                if (ns.fileExists("BruteSSH.exe", "home")) { ns.brutessh(hostname); }
                if (ns.fileExists("FTPCrack.exe", "home")) { ns.ftpcrack(hostname); }
                if (ns.fileExists("RelaySMTP.exe", "home")) { ns.relaysmtp(hostname); }
                if (ns.fileExists("HTTPWorm.exe", "home")) { ns.httpworm(hostname); }
                if (ns.fileExists("SQLInject.exe", "home")) { ns.sqlinject(hostname); }
                ns.nuke(hostname);
                ns.tprint("nuked " + hostname + ".");
            }
            if (ns.hasRootAccess(hostname)) {
                //recursive scan
                let newhostnames = ns.scan(hostname, true).filter(unique);
                hostnames = hostnames.concat(newhostnames);
            }
        }
        //Do something at the end of the list
        if (i == hostnames.length - 1) {
            if (verbose) {
                ns.tprint("All rootable machines rooted.");
            }

            if (pr) {
                ns.tprint(hostnames);
            }

            return hostnames;
        }
    }
}

export function hatchling(ns, hostname) {
    //count breachable ports
    const portsAvailable = ns.fileExists("BruteSSH.exe", "home") + ns.fileExists("FTPCrack.exe", "home") + ns.fileExists("RelaySMTP.exe", "home") + ns.fileExists("HTTPWorm.exe", "home") + ns.fileExists("SQLInject.exe", "home");

    //payload
    if (ns.getServerNumPortsRequired(hostname) <= portsAvailable) {
        if (ns.hasRootAccess(hostname) === false) {
            if (ns.fileExists("BruteSSH.exe", "home")) { ns.brutessh(hostname); }
            if (ns.fileExists("FTPCrack.exe", "home")) { ns.ftpcrack(hostname); }
            if (ns.fileExists("RelaySMTP.exe", "home")) { ns.relaysmtp(hostname); }
            if (ns.fileExists("HTTPWorm.exe", "home")) { ns.httpworm(hostname); }
            if (ns.fileExists("SQLInject.exe", "home")) { ns.sqlinject(hostname); }
            ns.nuke(hostname);
            ns.tprint("nuked " + hostname + ".");
            return true;
        }
    }
}