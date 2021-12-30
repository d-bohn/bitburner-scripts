/** @param {NS} ns **/
export async function main(ns) {
	let servers;

	const servers_zero = [
		"n00dles",
		"foodnstuff",
		"sigma-cosmetics",
		"joesguns",
		"hong-fang-tea",
		"harakiri-sushi",
		"myServo-0",
		"myServo-1",
		"myServo-2",
		"myServo-3",
		"myServo-4",
		"myServo-5",
		"myServo-6",
		"myServo-7",
		"myServo-8",
		"myServo-9",
		"myServo-10",
		"myServo-11",
		"myServo-12",
		"myServo-13",
		"myServo-14",
		"myServo-15",
		"myServo-16",
		"myServo-17",
		"myServo-18",
		"myServo-19",
		"myServo-20",
		"myServo-21",
		"myServo-22",
		"myServo-23",
		"myServo-24",
		// 2 ports required
	];

	const servers_one = [
		// 1 port required
		"zer0",
		"CSEC",
		"max-hardware",
		"iron-gym",
		"neo-net",
	];

	const servers_two = [
		"silver-helix",
		"phantasy",
		"omega-net",
	];

	let level = ns.args[0];
    
    if (typeof level === "undefined") {
        level = 0
    } 

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
	}

	// const script = ns.args[0];

	for (let i = 0; i < servers.length; i++) {
		const server = servers[i];
		ns.tprint(`Connecting to: ${server}`)
		ns.killall(server);
		ns.run("deploy.js", 1, server, "hack_template_v2.js", "joesguns");
		await ns.sleep(300);
		// ns.tail()
		ns.tprint(`Completed: ${server}`);
	}
}
