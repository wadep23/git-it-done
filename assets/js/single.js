var getRepoIssues = function(repo){
    console.log(repo);
    var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';

    fetch(apiUrl)
    .then(function(response){
        if (response.ok){
            response.json()
            .then(function(data){
                displayIssues(data);
            });
        }else{
            alert('There was a problem with your request!');
        }
    })
};

var displayIssues = function(issues){
    for (var i = 0; i < issues.length; i++){
        // create a link to element to take users to the issue on github
        var issueEl = document.createElement('a');
        issueEl.classList = 'list-item flex-row justify-space-between align-center';
        issueEl.setAttribute('href', issues[i].html_url);
        issueEl.setAttribute('target', '_blank');
    }
};

getRepoIssues('Facebook/react');