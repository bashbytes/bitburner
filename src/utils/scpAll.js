import { getAllServers } from "./serverScanner";

// Runs SCP on all servers in the network for a specified script.
export function autocomplete(data) {
    return [...data.servers, ...data.scripts]
}

/** @param {import("..").NS} ns */
export async function main(ns) {
    ns.disableLog('sleep');
    let scripts = ['remote/hack.js', 'remote/grow.js', 'remote/weaken.js', 'remote/share.js'];

    let servers = getAllServers(ns);
    for (let i in servers) {
        scripts.forEach(script => {
            if (!ns.fileExists(script, servers[i])) {
                ns.scp(script, servers[i], 'home');
            }
        });
        await ns.sleep(100);
    }

}
