/*
The below script searches reddit’s current top five posts on cats. Take these results and display them in HTML in a list. You are getting back the post title and URL, so make a list of clickable links. Make it pretty!

Extra credit: Add a search bar where you can update the search term from cats to anything you want.
*/
getReq('https://www.reddit.com/r/php/search.json?q=cats&limit=5', processAjax);

// Get a reference to the element, before we want to insert the element
var pTag = document.getElementById("child");
// Get a reference to the parent element
var parent = pTag.parentNode;

const newPosts = [];
function getReq(url, callback){
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function(){
        if(req.readyState === 4 && req.status === 200){
            callback(JSON.parse(req.responseText));
        }else{
            console.log('error', req.statusText);
        }
    }
    req.send(null);
}
function processAjax(object){
	const postList = getPostInfo(object);
	loadData();
}
function getPostInfo(postObject) {
	// We will explain the 'postData => {' syntax on Tuesday
	postObject.data.children.forEach(postData => {
		const post = { title: '', url: '' };

		postData = postData.data;
		post.title = postData.title;
		post.url = postData.url;
		newPosts.push(post);
	});

	return newPosts;
}
function loadData() {
	newPosts.forEach(post => {
    var li1 = document.createElement('li');
    li1.id = 'listItemID';
    li1.innerHTML = post.title;
    var li2 = document.createElement('a');
    li2.setAttribute('target', '_blank');
    li2.id = 'listItem';
    li2.href = post.url;
    li2.innerHTML = post.url;
    parent.appendChild(li1);
    parent.appendChild(li2);
    console.log(post.title);
	})
}
