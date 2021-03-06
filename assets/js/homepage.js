var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');

var getUserRepos = function(user){
    // format the github api url
    var apiUrl= "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
    if (response.ok){
        response.json()
    .then(function(data) {
          displayRepos(data, user);
        });
    }else{
        alert('Error: ' + response.statusText);
    }
      })
      .catch(function(error){
          alert("Unable to connect to Github");
      });
};

var formSubmitHandler = function(event){
    event.preventDefault();
    var username = nameInputEl.value.trim();
    
    if (username){
        getUserRepos(username);
        nameInputEl.value = "";
    }else{
        alert('Please enter a Github username');
    }
};
userFormEl.addEventListener('submit', formSubmitHandler);

var displayRepos = function(repos, searchTerm){
    // check if API returned any repos
    if (repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++){
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // container for each repo
        var repoEl = document.createElement('a');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';
        repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

        // span element for repo name
        var titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        // Check if repo has issues or not
        if (repos[i].open_issues_count > 0){
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";            
        }else{
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        repoEl.appendChild(statusEl);
        repoEl.appendChild(titleEl);
        repoContainerEl.appendChild(repoEl);
    }
};