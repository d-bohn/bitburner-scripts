/** @param {NS} ns **/
export async function main(ns) {
    let servers;

    const args = ns.flags([
        ['help', false]
    ]);

    let level = args._[0];
    let script = args._[1];
    let attack = args._[2];
    let include_mine = args._[3]
    let server_ram = args._[4]

    if (args.help) {
        ns.tprint(`USAGE: run ${ns.getScriptName()} LEVEL_OF_HACK SCRIPT_TO_RUN ATTACK_SERVER INCLUDE_MINE MINE_RAM`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} 0 hack_template_v2.js n00dles false 16`);
        return;
    }

    const my_servers = [
        "myServo-" + server_ram.toString() + "-0",
        "myServo-" + server_ram.toString() + "-1",
        "myServo-" + server_ram.toString() + "-2",
        "myServo-" + server_ram.toString() + "-3",
        "myServo-" + server_ram.toString() + "-4",
        "myServo-" + server_ram.toString() + "-5",
        "myServo-" + server_ram.toString() + "-6",
        "myServo-" + server_ram.toString() + "-7",
        "myServo-" + server_ram.toString() + "-8",
        "myServo-" + server_ram.toString() + "-9",
        "myServo-" + server_ram.toString() + "-10",
        "myServo-" + server_ram.toString() + "-11",
        "myServo-" + server_ram.toString() + "-12",
        "myServo-" + server_ram.toString() + "-13",
        "myServo-" + server_ram.toString() + "-14",
        "myServo-" + server_ram.toString() + "-15",
        "myServo-" + server_ram.toString() + "-16",
        "myServo-" + server_ram.toString() + "-17",
        "myServo-" + server_ram.toString() + "-18",
        "myServo-" + server_ram.toString() + "-19",
        "myServo-" + server_ram.toString() + "-20",
        "myServo-" + server_ram.toString() + "-21",
        "myServo-" + server_ram.toString() + "-22",
        "myServo-" + server_ram.toString() + "-23",
        "myServo-" + server_ram.toString() + "-24",
    ]

    const servers_zero = [
        "n00dles",
        "foodnstuff",
        "sigma-cosmetics",
        "joesguns",
        "hong-fang-tea",
        "harakiri-sushi",
        "nectar-net",
    ];

    // 1 port required
    const servers_one = [
        "zer0",
        "CSEC",
        "max-hardware",
        "iron-gym",
        "neo-net",
    ];

    // 2 ports required
    const servers_two = [
        "silver-helix",
        "phantasy",
        "omega-net",
        "the-hub",
        // "crush-fitness", // 0 RAM
        "avmnite-02h",
        // "johnson-ortho", // 0 RAM
    ];

    // 3 ports required
    const servers_three = [
        // "comptek", // 0 RAM
        "summit-uni",
        "netlink",
        "rothman-uni",
        "catalyst",
        "I.I.I.I",
        "rho-construction" // Hidden
    ];

    const servers_four = [
        // "syscore", // 0 RAM
        "rho-construction",
        "aevum-police",
        "lexo-corp",
        "global-pharm",
        "snap-fitness",
        "unitalife",
        "univ-energy",
    ];

    // if (typeof level === "undefined") {
    //     level = 0
    // }

    switch (level) {
        case 0:
            servers = servers_zero;
            break;
        case 1:
            servers = [...servers_zero, ...servers_one];
            break;
        case 2:
            servers = [...servers_zero, ...servers_one, ...servers_two];
            break;
        case 3:
            servers = [...servers_zero, ...servers_one, ...servers_two, ...servers_three];
            break;
        case 4:
            servers = [...servers_zero, ...servers_one, ...servers_two, ...servers_three, ...servers_four];
    }

    if (include_mine === true) {
        servers.push(...my_servers);
    }

    for (let i = 0; i < servers.length; i++) {
        const server = servers[i];
        ns.tprint(`Connecting to: ${server}`);
        ns.killall(server);
        ns.run("deploy.js", 1, server, script, attack);
        await ns.sleep(100);
        // ns.tail()
        ns.tprint(`Completed: ${server}`);
    }
}