/** @param {NS} ns **/
export async function main(ns) {
	const base = "https://raw.githubusercontent.com/d-bohn/bitburner-scripts/master/";

	const scripts = [
		"hack_template_v2.js",
		"spider.js",
		"analyze_server.js",
		"run_on_select_servers.js",
		"purchase_servers.js",
		"deploy.js",
		"stock_watcher_v1.js",
		"find_coding_contract.js",
	];

	for (let i = 0; i < scripts.length; i++) {
		await ns.wget(base+scripts[i], scripts[i])
		ns.tprint(`Successfully downloaded: ${scripts[i]}`)
	}
}
