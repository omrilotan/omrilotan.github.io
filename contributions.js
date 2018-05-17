const GITHUB_PAGING_LIMIT = 3;
async function getContributions(user, {exclude = [user]} = {}) {
    const pattern = new RegExp(`^${exclude.map(org => `(${org})`).join('|')}`);
debugger;
    Promise.all(
        Array.from(new Array(GITHUB_PAGING_LIMIT)).map(i =>
            fetch(`https://api.github.com/users/${user}/events/public?page=${i}&per_page=100`)
                .then(response => response.json())
        )
    )
    .then(lists => [].concat(...lists))
    .then(contributions =>
        Promise.all(
            contributions.reduce(
                (list, {type, repo, payload}) => {
                    const contribution = merged({type, repo, payload, pattern});

                    return contribution ? [
                        ...list,
                        contribution.then(({merged}) => merged ? {html_url, title, name} : null)
                    ] : list;
                },
                []
            )
        )
    )
    .then(list => {
        list = list.filter(i => !!i);

        list = list.reduce((list, item) => {
            list.some(li => li.name) || list.push(item);

            return list;
        });

        list = Array.from(new Set(list));
        return list;
    })
}

function merged({type, repo, payload, pattern}) {
    const {name} = repo;

    if (
        type !== 'PullRequestEvent' ||
        name.match(pattern)
    ) {
        return;
    }

    const {pull_request} = payload;
    const {state, url, html_url, title} = pull_request;

    return fetch(url)
        .then(response => response.json())
        .catch(error => '');
}

(async () => {
    const contributions = await getContributions('omrilotan', {
        exclude: [
            'omrilotan',
            'thisisafuckingorganization',
            'fiverr',
            'virtualbob',
            'patuach',
        ],
    });

    if (!contributions.length) {
        return;
    }

    const names = [];

    contributions_wrapper.innerHTML = `I've recently contributed to: ${contributions.reduce(
        (links, {html_url, title, name}) => {
            return names.contains(name) ? links : [...links, `<a href="${html_url}" title="${title}">${name}</a>`]
        },
        []
    ).join(', ')}`;
})()
