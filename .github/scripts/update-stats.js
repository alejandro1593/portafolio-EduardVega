const fs = require('fs');
const API = 'https://api.github.com';
const USER = 'alejandro1593';
const HEADERS = {
    Authorization: `Bearer ${process.env.GH_TOKEN}`,
    Accept: 'application/vnd.github+json'
};

async function get(path) {
    const res = await fetch(API + path, { headers: HEADERS });
    if (!res.ok) throw new Error(`${path} -> HTTP ${res.status}`);
    return res;
}

function lastPageFrom(res) {
    const link = res.headers.get('link') || '';
    const match = link.match(/[?&]page=(\d+)>\s*;\s*rel="last"/);
    return match ? Number(match[1]) : null;
}

(async () => {
    const user = await (await get(`/users/${USER}`)).json();
    const repos = await (await get(`/users/${USER}/repos?per_page=100&type=owner`)).json();
    const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

    let commits = 0;
    for (const repo of repos) {
        const res = await get(`/repos/${USER}/${repo.name}/commits?per_page=1`);
        const last = lastPageFrom(res);
        commits += last !== null ? last : 1;
    }

    const stats = {
        projects: repos.length,
        commits,
        stars,
        repos: user.public_repos,
        followers: user.followers,
        gists: user.public_gists,
        updatedAt: new Date().toISOString()
    };

    fs.writeFileSync('stats.json', JSON.stringify(stats, null, 2) + '\n');
    console.log('stats.json generado:', JSON.stringify(stats));
})().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});