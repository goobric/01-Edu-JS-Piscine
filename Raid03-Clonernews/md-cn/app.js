let state = {};

// Indices of the first and last stories to retrieve:
let start = 0;
let n = 15;
let latestID;
let timer;

let printMoreStories = false;
let pageSelection = "topstories"; // Category from which to retrieve the stories.
const hackernewsURL = "https://hacker-news.firebaseio.com/v0";
let result = document.getElementById("result"); // DOM element in which the stories will be displayed.

// Retrieves the IDs of all 'Top Stories':
function fetchTopStoriesID() {

    // The "Don't miss out" pop-up must be hidden after each initialization:
    clearInterval(timer);
    document.querySelector(".container").style.display = "none";

    if (pageSelection == "newstories") { fetchLatestID(); }

    // Returns an array containing the IDs of all the Top Stories, and passes it into the fetchStories function:
    return fetch(`${hackernewsURL}/${pageSelection}.json`)
        .then(response => response.json())
        .then(topStoriesID_array => fetchStories(topStoriesID_array)); 
}

// Retrieves all the 'Top Stories' (items) that are added into the state object:
function fetchStories(array) {

    let topStoriesID = array.slice(start, n + start); // Array of IDs of the 15 most recent Top Stories.

    let topStories = topStoriesID.map(id => { // For each ID in the topStoriesID array...
        return fetch(`${hackernewsURL}/item/${id}.json`) //...fetches the corresponding item (story), and adds it to the topStories array: topStories thus becomes an array of 50 items (50 objects).
            .then(response => response.json())
    });

    return Promise.all(topStories) // When the promise contained in topStories is fulfilled...
        .then(topStories => {
            state.stories = topStories // To the state object, adds the topStories array, whose property is 'stories': state = {stories: [item1, item2, ... ] }  
            printStories(topStories)
        });
}

// Prints the Top Stories in the DOM:
function printStories(topStories) {

    // For each story in the topStories array...
    return topStories.map(story => {

                let userURL = `https://news.ycombinator.com/user?id=${story.by}`

                let comment; // If there's only one comment to display, "comment" must be singular:
                story.descendants == 1 ? comment = "comment" : comment = "comments"

                let HTMLtoInsert = `
        <div class="story" id="${story.id}">

            <h3 class="title"> ${story.url ?
                `<a href='${story.url}' target='_blank'> ${story.title} </a>`
                : `<a href="javascript:void(0)" onclick="toggleStoryText('${story.id}')"> ${story.title} </a>` }
            </h3>

            <span class='score'> ${story.score} </span> points by <a href='${userURL}' target='_blank' class='story-by'> ${story.by}</a>

                <div class="toggle-view">
                ${story.kids ?
                `<span onclick="fetchOrToggleComments('${story.kids}', '${story.id}')" class="comments"> ❯ show ${story.descendants} ${comment} </span>`
                : '' }
                </div>

                ${story.text ?
                `<div class="storyText" id="storyText-${story.id}" style="display:block"> <span style="font-size: 300%">“</span> ${story.text} <span style="font-size: 300%">”</span> </div>`
                : '' }

                <div id="comments-${story.id}" style="display:block">
                </div>

        </div>           
        `
        result.insertAdjacentHTML('beforeend', HTMLtoInsert);    
        printMoreStories = false;
    })
};

// Hides/Shows the text of the stories:
function toggleStoryText(storyID)
{
    let storyText = document.getElementsById(`storyText-${storyID}`);

    if(storyText.style.display == "block") { storyText.style.display = "none" }
    else { storyText.style.display = "block" }
}

// Fetches the comments of the stories:
function fetchComments(kids, storyID)
{
    let commentIDs = kids.split(",");

    // For each ID in the commentIDs array, fetches the corresponding item (comment). Stores the result (all items/comments) in an allComments array.
    let allComments = commentIDs.map(commentID => {
            return fetch(`${hackernewsURL}/item/${commentID}.json`)
                .then(response => response.json());
        });

    return Promise.all(allComments)     // When the promise contained in allComments has been fulfilled...
        .then(comments => {
                state[storyID] = comments;
                printComments(comments, storyID);
            });
}


function fetchOrToggleComments(kids, storyID)
{
    function toggleAllComments(storyID)
    {
        let allComments = document.getElementById(`comments-${storyID}`);

        if(allComments.style.display == "block") { allComments.style.display = "none" }
        else { allComments.style.display = "block" }
    }
    state[storyID] ? toggleAllComments(storyID) : fetchComments(kids, storyID)
}


function toggleComment(commentID)
{
    let comment = document.getElementById(commentID);
    let toggle = document.getElementById(`toggle-${commentID}`);

    if(comment.style.display == "block") { comment.style.display = "none" }
    else { comment.style.display = "block" }
    
    if(toggle.innerHTML == '[ – ]') { toggle.innerHTML = '[ + ]' }
    else { toggle.innerHTML = '[ – ]' }
}

// Prints the comments in the DOM:
function printComments(comments, storyID)
{
    // For each comment in the comments array:
    return comments.map(comment => {

        let userURL = `https://news.ycombinator.com/user?id=${comment.by}`;
        let HTMLtoInsert = '';

        if(comment.deleted != true && comment.dead != true)
        {
            HTMLtoInsert =
            `
            <div class="comment">
                <span onclick="toggleComment(${comment.id})" href="javascript:void(0)" id="toggle-${comment.id}" class="toggle-comment" >[ – ]</span>

                <a href=${userURL} class="comment-by"> ${comment.by} </a>

                <div id=${comment.id} class="comment-text" style="display:block"> ${comment.text} </div>
            </div>
            `
        }
        if(comment.parent == storyID){
            document.getElementById(`comments-${storyID}`).insertAdjacentHTML("beforeend", HTMLtoInsert);
        }
        else {
            document.getElementById(comment.parent).insertAdjacentHTML("beforeend", HTMLtoInsert)
        }

        if(comment.kids) { return fetchComments(comment.kids.toString(), storyID) };
    });
}


// Page selection:
function toggleButton(str) {    
    // str: ID of the clicked button ("topstories", "newstories", "jobstories", etc.)

    pageSelection = str;
    start = 0;
    n = 15;
    result.innerHTML = "";
    fetchTopStoriesID();

    let clickedButton = document.getElementById(str);
    let allButtons = document.getElementsByClassName("page-title");

    [...allButtons].forEach(button => button.className = "page-title unselected");  
    clickedButton.className = "page-title"; 
}


// Displays new stories when the bottom of the page has been reached:
window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && printMoreStories === false) {
      printMoreStories = true;
      start += n;
      fetchTopStoriesID();
    }
  };



// Initialization:
fetchTopStoriesID();


// Live data management:
async function fetchLatestID() {

    latestID = await fetch(`${hackernewsURL}/${pageSelection}.json`)
    .then(response => response.json())
    .then(newStoriesID_array => newStoriesID_array[0]);

    timer = setInterval(checkForUpdate, 5000);
}

async function checkForUpdate() {

    let latestID_updated = await fetch(`${hackernewsURL}/${pageSelection}.json`)
        .then(response => response.json())
        .then(newStoriesID_array => newStoriesID_array[0]);

    if(latestID_updated != latestID)
    {
        document.querySelector(".container").style.display = '';
    }
}

const getNiceTime = (timestamp) => {
    var a = new Date(timestamp * 1000);
  
    var lang;
    if (window.navigator.languages) {
      lang = window.navigator.languages[0];
    } else {
      lang = window.navigator.userLanguage || window.navigator.language;
    }
    var time = a.toLocaleString(lang, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return time;
  };