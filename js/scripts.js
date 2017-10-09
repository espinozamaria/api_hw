/*
The below script searches reddit’s current top five posts on cats. Take these results and display them in HTML in a list. You are getting back the post title and URL, so make a list of clickable links. Make it pretty!

Extra credit: Add a search bar where you can update the search term from cats to anything you want.
*/
//
var url = "cats";
var newurl = 'https://www.reddit.com/r/php/search.json?q=' + url + '&limit=5';
// // function urlname(){
// //   if(newurl ==  )
// // }
//
// // window.onload = function()
// // {
// //   catresults();
// // }
// function catresults(){
//     getReq(newurl, processAjax);
// }
getReq(newurl, processAjax);

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
    li1.innerHTML = post.title;
    var li2 = document.createElement('a');
    li2.setAttribute('target', '_blank');
    li2.href = post.url;
    li2.innerHTML = post.url;
    parent.appendChild(li1);
    parent.appendChild(li2);
    //console.log(post.title);
	})
}

// function newsearch(){
//   console.log("inside the newsearch() function");
//   var item = document.getElementById("intext").value;
//   console.log(document.getElementById("intext").value);
//   newurl = 'https://www.reddit.com/r/php/search.json?q=' + item + '&limit=5';
//   getReq(newurl, processAjax);
//   console.log(newurl);
// }
