
function GithubStargazers(containerID, username, repoName) {
    fetch(`https://api.github.com/repos/${username}/${repoName}`)
        .then(response => {
            return response.json();
        })
        .then(repoInfo => {
            let stargazersCount = repoInfo['stargazers_count'];

            document.getElementById(containerID).textContent = `${stargazersCount} ${stargazersCount === 1 ? 'star' : 'stars'}`;
        })
}

window.onload = () => {
    GithubStargazers('github-stargazers-count', 'byliuyang', 'WasteDrop');
    let wasteDropGame = new WasteDropGame();
    wasteDropGame.run();
};