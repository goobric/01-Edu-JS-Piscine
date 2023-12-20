// TO DO
/*  create a triggering of the console.log(alert) with an Alert to the user when a 'post' is updated;
using a form of constant 'eventListener' monitoring the activity of the 'posts'; if true, trigger the Alert  */

/* function throttle(fn, delay){
  let lastTimerid;
  let lastRan;

  return function(...args){
    const context = this;

    if(!lastRan){
      fn.apply(context, args);
    }else{
      clearTimeout(lastTimerid);
      lastTimerid = setTimout(() => {
        if(Date.now() - lastRan >= delay){
          fn.apply(context, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
   }
  };

const onClick = () => {
  console.log('clicked');
};

const throttledClicked = throttle(onClick, 5);

document.getElementById("top").addEventListener("clicked", throttledClick);
document.getElementById("new").addEventListener("clicked", throttledClick);
document.getElementById("best").addEventListener("clicked", throttledClick);
document.getElementById("show").addEventListener("clicked", throttledClick);
document.getElementById("ask").addEventListener("clicked", throttledClick);
document.getElementById("jobs").addEventListener("clicked", throttledClick);
document.getElementById("poll").addEventListener("clicked", throttledClick);
document.getElementById("saved").addEventListener("clicked", throttledClick); */

// get the root element of the document
const app = document.getElementById('root');

// create the container element
const container = document.createElement('div');
container.setAttribute('class', 'container');

// add container to the document
app.appendChild(container);

// endpoints for the different stories
const BASEURL = 'https://hacker-news.firebaseio.com/v0/';
const TOPSTORIES = 'topstories.json';
const NEWSTORIES = 'newstories.json';
const BESTSTORIES = 'beststories.json';
const ASKSTORIES = 'askstories.json';
const SHOWSTORIES = 'showstories.json';
// const POLLSTORIES = 'pollstories.json';
const JOBSTORIES = 'jobstories.json';

// top nav elements
const topNav = document.getElementById('top');
const newNav = document.getElementById('new');
const bestNav = document.getElementById('best');
const askNav = document.getElementById('ask');
const showNav = document.getElementById('show');
const jobNav = document.getElementById('jobs');
const pollNav = document.getElementById('poll');
const savedNav = document.getElementById('saved');

var navItems = document.getElementsByClassName('nav-item');

for (var item of navItems) {
  item.addEventListener('click', changeNav);
}

// array for stories
var stories = [];

// function for getting the accurate time elapsed since a date (1st Jan 1970). timestamp is the time in milliseconds
// adapted from https://stackoverflow.com/a/53138036
const getElapsedTime = (timestamp) => {
  if (typeof timestamp !== 'number') return 'NaN';

  // timestamp is in milliseconds
  const SECOND = 1000;
  const MINUTE = 1000 * 60;
  const HOUR = 1000 * 60 * 60;
  const DAY = 1000 * 60 * 60 * 24;
  const MONTH = 1000 * 60 * 60 * 24 * 30;
  const YEAR = 1000 * 60 * 60 * 24 * 30 * 12;

  const elapsed = new Date().valueOf() - timestamp;
  if (elapsed < 0) return 'Date is in the future';

  if (elapsed <= MINUTE)
    return `${Math.round(elapsed / SECOND)} second${
      Math.round(elapsed / SECOND) == 1 ? '' : 's'
    } ago`;
  if (elapsed <= HOUR)
    return `${Math.round(elapsed / MINUTE)} minute${
      Math.round(elapsed / MINUTE) == 1 ? '' : 's'
    } ago`;
  if (elapsed <= DAY)
    return `${Math.round(elapsed / HOUR)} hour${
      Math.round(elapsed / HOUR) == 1 ? '' : 's'
    } ago`;
  if (elapsed <= MONTH)
    return `${Math.round(elapsed / DAY)} day${
      Math.round(elapsed / DAY) == 1 ? '' : 's'
    } ago`;
  if (elapsed <= YEAR)
    return `${Math.round(elapsed / MONTH)} month${
      Math.round(elapsed / MONTH) == 1 ? '' : 's'
    } ago`;
  return `${Math.round(elapsed / YEAR)} year${
    Math.round(elapsed / YEAR) == 1 ? '' : 's'
  }`;
};

// get a nicely formatted time
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
//
function updateLastUpdate() {
  var updatedTimeDiv;

  if (container.querySelector('.update-time')) {
    updatedTimeDiv = container.querySelector('.update-time');
  } else {
    updatedTime = document.createElement('div');
    updatedTime.classList.add('update-time');
  }

  var now = new Date();
  updatedTime.innerText = `Last updated: ${getNiceTime(now.getTime() / 1000)}`;
  container.appendChild(updatedTime);
}

// get saved stories
function getSavedStories() {
  // get records out of storage
  var records = localStorage.getItem('records')
    ? JSON.parse(localStorage.getItem('records'))
    : [];

  // create a containing div
  var recordsDiv = document.createElement('div');
  recordsDiv.classList.add('records');

  // create a heading div
  var recordsDivHeader = document.createElement('h2');

  container.appendChild(recordsDivHeader);
  container.appendChild(recordsDiv);

  // check if there are any saved stories
  if (records.length > 0) {
    recordsDivHeader.innerText = `${records.length} saved stor${
      records.length === 1 ? 'y' : 'ies'
    }`;

    for (record of records) {
      var recordCard = createdSavedStoryCard(record);
      recordsDiv.appendChild(recordCard);
    }
  } else {
    recordsDivHeader.innerText = 'No saved stories';
  }
}

// create a saved story card and return it
function createdSavedStoryCard(record) {
  var recordCard = document.createElement('div');
  recordCard.classList.add('record');

  var recordHeadline = document.createElement('div');
  //recordHeadline.classList.add('headline');

  // check if there is an associated url
  var recordTitle = document.createElement('a');
  //recordTitle.classList = ('title');
  recordTitle.innerText = record.story.title;
  var url = record.story.url
    ? record.story.url
    : `https://news.ycombinator.com/item?id=${record.story.id}`;
  recordTitle.setAttribute('href', url);
  recordTitle.setAttribute('target', '_blank');

  var domain = document.createElement('span');
  //domain.classList.add('domain');
  domain.innerText = `(${getDomain(url)})`;

  // date saved
  var savedDiv = document.createElement('div');
  var savedDate = new Date(record.date);
  savedDiv.innerText = `Saved: ${getElapsedTime(savedDate.getTime())}`;

  //append nodes to headline
  recordHeadline.appendChild(recordTitle);

  var recordSubtext = document.createElement('div');
  //recordSubtext.classList = ('subtext');

  //append nodes to subtext
  recordSubtext.appendChild(domain);
  recordSubtext.appendChild(savedDiv);

  // append nodes to record card
  recordCard.appendChild(recordHeadline);
  recordCard.appendChild(recordSubtext);

  return recordCard;
}

// get the top HN stories
// feed is the endpoint to get the stories from
// limit is the number of stories to get
function getStories(feed) {
  fetch(BASEURL + feed)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(`Num stories: ${data.length}`);
      updateLastUpdate();
      //limit for now
      for (let i = 0; i < data.length && i < 50; i++) {
        getStoryDetails(data[i]);
      }
    })
    .catch((err) => {
      console.log('error fetching ' + err);
    });
}
// fetch feed of all polls
function getPolls() {
  console.log('list of polls requested');
  fetch(BASEURL + NEWSTORIES)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(`Num stories: ${data.length}`);
      updateLastUpdate();
      //limit for now
      let counter = 0;
      console.log('Looping to check for polls');
      for (let i = 0; i < data.length && i < 500; i++) {
        let isPoll = getPollDetails(data[i]);
        if (isPoll) {
          counter++;
        }
      }
      console.log('finished - Polls found: ' + counter);
      if (counter === 0) {
        createMessageCard('No Polls found');
      }
    })
    .catch((err) => {
      console.log('error fetching ' + err);
    });
}

// func to fetch poll details from the HN API.
function getPollDetails(itemId) {
  let storyURL = `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`;

  let added = false;
  fetch(storyURL)
    .then((respose) => {
      return respose.json();
    })
    .then((data) => {
      if (data.type === 'poll') {
        createStoryCard(data);
        stories.push(data);
        added = true;
      }
    })
    .catch((err) => {
      console.log(`error fetching story ${itemId} with ${err}`);
    });
  return added;
}

// get top-level details about a story
// itemId is the id of the story
// returns a story object
function getStoryDetails(itemId) {
  let storyURL = `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`;

  fetch(storyURL)
    .then((respose) => {
      return respose.json();
    })
    .then((data) => {
      createStoryCard(data);
      stories.push(data);
    })
    .catch((err) => {
      console.log(`error fetching story ${itemId} with ${err}`);
    });
}

// get a comment
// commentId is the id of the comment
// commentCard is the card to append the comment to
// returns a comment object
function getComment(commentId, commentCard) {
  let url = `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createComment(data, commentCard);
    })
    .catch((err) => {
      console.log(`error fetching comment ${commentId} with ${err}`);
    });
}

// create a comment
// commentData is the comment object
// parentCard is the card to append the comment to
// returns a comment object
function createComment(commentData, parentCard) {
  if (!commentData.deleted) {
    let commentDiv = document.createElement('div');
    commentDiv.setAttribute('class', 'comment');
    commentDiv.classList.add('is-visible');
    commentDiv.innerHTML = commentData.text;

    let authorDiv = document.createElement('div');
    authorDiv.classList.add('subtext');

    let timeElapse = document.createElement('span');
    timeElapse.innerText = `${getElapsedTime(commentData.time * 1000)}`;
    timeElapse.title = `${getNiceTime(commentData.time)}`;

    let commentToggle = document.createElement('span');
    commentToggle.setAttribute('class', 'comment-toggle');

    let commentsDiv = document.createElement('div');
    commentsDiv.classList.add('comments');
    commentsDiv.classList.add('is-visible');

    if (commentData.kids) {
      commentToggle.innerText = `Hide ${
        commentData.kids.length > 1
          ? `${commentData.kids.length} comments`
          : `${commentData.kids.length} comment`
      }`;
      commentToggle.classList.add('has-comments');

      commentToggle.addEventListener('click', function () {
        var self = this;
        var storyDiv = this.parentNode.parentNode;
        var children = storyDiv.querySelectorAll('.comment');
        children.forEach((element) => {
          if (element.classList.contains('is-visible')) {
            self.innerText = `View ${
              commentData.kids.length > 1
                ? `${commentData.kids.length} comments`
                : `${commentData.kids.length} comment`
            }`;
            hide(element);
          } else {
            self.innerText = `Hide ${
              commentData.kids.length > 1
                ? `${commentData.kids.length} comments`
                : `${commentData.kids.length} comment`
            }`;
            show(element);
          }
        });
      });

      for (var item of commentData.kids) {
        getComment(item, commentsDiv);
      }
    } else {
      commentToggle.innerText = 'No comments';
    }

    let authorSpan = document.createElement('span');
    let author = document.createElement('a');
    author.setAttribute(
      'href',
      `https://news.ycombinator.com/user?id=${commentData.by}`
    );
    author.setAttribute('target', '_blank');
    author.textContent = `${commentData.by}`;
    authorSpan.append(author);

    authorDiv.append('By ', authorSpan, ' ', timeElapse, ' | ', commentToggle);

    commentDiv.appendChild(authorDiv);
    commentDiv.appendChild(commentsDiv);
    parentCard.appendChild(commentDiv);
  }
}
function clearStoryContainer() {
  // empty global stories
  stories.length = 0;
  // remove all nodes in container
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
}

// select a story
// storyid is the id of the story
// storyDiv is the div containing the story
// returns a comment object
function selectStory(storyid, storyDiv) {
  var selectedStory = stories.find((x) => x.id === storyid);
  var commentsCard;

  //check if commentscard is already created
  if (!storyDiv.querySelector('.comments')) {
    commentsCard = createCommentsCard(selectedStory);

    storyDiv.appendChild(commentsCard);
  } else {
    commentsCard = storyDiv.querySelector('.comments');
    toggle(commentsCard);
  }
}

// creates a saved story record to add to storage
// storyid is the id of the story
// returns a comment object
function saveStory(storyid) {
  // get the story from the array of stories
  var selectedStory = stories.find((x) => x.id === storyid);
  console.log(selectedStory);

  if (selectedStory) {
    let savedStoryRecord = {
      date: new Date(),
      story: selectedStory,
    };
    pushRecord(savedStoryRecord);
  }
}

// saves a record to localstorage
// record is the record to save
// returns a comment object
function pushRecord(record) {
  // get the records out of storage
  var records = localStorage.getItem('records')
    ? JSON.parse(localStorage.getItem('records'))
    : [];

  records.push(record);
  localStorage.setItem('records', JSON.stringify(records));

  console.log(localStorage);
}
// creates HTML markup for a story
// story is the story object
// returns a comment object
function createStoryCard(story) {
  // story div
  let storyCard = document.createElement('div');
  storyCard.setAttribute('class', 'story');
  storyCard.setAttribute('storyid', story.id);

  // headline div
  let headline = document.createElement('div');
  headline.setAttribute('class', 'headline');

  // story title and domain
  let storyTitle = document.createElement('a');
  storyTitle.setAttribute('class', 'title');
  storyTitle.setAttribute('target', '_blank');
  storyTitle.innerHTML = story.title;

  let domain = document.createElement('span');
  domain.setAttribute('class', 'domain');

  // check if there is a associated url
  if (story.hasOwnProperty('url')) {
    domain.textContent = `(${getDomain(story.url)})`;
    storyTitle.setAttribute('href', story.url);
  } else {
    // set the url to the story itself
    var url = `https://news.ycombinator.com/item?id=${story.id}`;
    domain.textContent = `(${getDomain(url)})`;
    storyTitle.setAttribute('href', url);
    storyCard.classList.add('self-story');
  }

  // subtext links
  let subtext = document.createElement('div');
  subtext.setAttribute('class', 'subtext');

  // get the score of the story
  let score = document.createElement('span');
  score.setAttribute('class', 'score');
  score.textContent = `${story.score} points `;
  if (story.score >= 300) {
    score.className += ' hot';
  }

  // get the user who posted the story
  let authorSpan = document.createElement('span');
  let author = document.createElement('a');
  author.setAttribute(
    'href',
    `https://news.ycombinator.com/user?id=${story.by}`
  );
  author.setAttribute('target', '_blank');
  author.textContent = `${story.by}`;
  authorSpan.append(author);

  // set time elapsed
  let timeElapse = document.createElement('span');
  timeElapse.innerText = `${getElapsedTime(story.time * 1000)}`;
  timeElapse.title = `${getNiceTime(story.time)}`;

  // link to the story
  let commentToggle = document.createElement('span');
  commentToggle.setAttribute('storyid', story.id);
  commentToggle.setAttribute('class', 'comment-toggle');

  // check if the story has any comments
  if (story.descendants) {
    commentToggle.innerText = `View ${
      story.descendants > 1
        ? `${story.descendants} comments`
        : `${story.descendants} comment`
    }`;

    if (story.descendants >= 100) commentToggle.classList.add('hot');

    commentToggle.classList.add('has-comments');

    commentToggle.addEventListener('click', function () {
      var self = this;
      var storyDiv = this.parentNode.parentNode;
      selectStory(story.id, storyDiv);

      var commentDiv = storyDiv.querySelector('.comments');
      if (commentDiv.classList.contains('is-visible')) {
        self.innerText = `Hide ${
          story.descendants > 1
            ? `${story.descendants} comments`
            : `${story.descendants} comment`
        }`;
        show(commentDiv);
      } else {
        self.innerText = `View ${
          story.descendants > 1
            ? `${story.descendants} comments`
            : `${story.descendants} comment`
        }`;
        hide(commentDiv);
      }
    });
  } else {
    commentToggle.innerText = 'No comments';
  }
  // create the save "button"
  let saveButton = document.createElement('span');
  saveButton.classList.add('save');
  saveButton.innerText = 'Save';
  saveButton.addEventListener('click', function () {
    var storyId = story.id;
    saveStory(storyId);
  });

  //add the story element
  container.appendChild(storyCard);

  //add story elements
  storyCard.appendChild(headline);
  storyCard.appendChild(subtext);

  //add headline elements
  headline.appendChild(storyTitle);
  headline.appendChild(domain);

  //add links element
  subtext.append(
    score,
    ' by ',
    authorSpan,
    ' ',
    timeElapse,
    ' | ',
    saveButton,
    ' | ',
    commentToggle
  );
}

// create a card for the comments
// story is the story object
// returns a comment object
function createCommentsCard(story) {
  let commentsCard = document.createElement('div');
  commentsCard.setAttribute('class', 'comments');
  commentsCard.classList.add('is-visible');

  if (story.text) {
    let selfText = document.createElement('div');
    selfText.classList.add('self-text');
    selfText.innerHTML = story.text;
    commentsCard.append(selfText);
  }
  for (var item of story.kids) {
    getComment(item, commentsCard);
  }
  return commentsCard;
}

// get the domain from a full url
function getDomain(url) {
  let domain = '',
    page = '';
  //remove http://
  if (url.indexOf('http://') == 0) {
    url = url.substr(7);
  }
  //remove https://
  if (url.indexOf('https://') == 0) {
    url = url.substr(8);
  }
  //remove www.
  if (url.indexOf('www.') == 0) {
    url = url.substr(4);
  }
  //get everything up to the first '/'
  domain = url.split('/')[0];

  return domain;
}

// change navigation between the different feeds
function changeNav() {
  for (var item of navItems) {
    item.classList.remove('selected');
  }
  // clear the container
  clearStoryContainer();

  this.className += ' selected';
  console.log(this.id);
  // get the stories for the selected nav item
  switch (this.id) {
    case 'top':
      getStories(TOPSTORIES);
      break;
    case 'new':
      getStories(NEWSTORIES);
      break;
    case 'best':
      getStories(BESTSTORIES);
      break;
    case 'ask':
      getStories(ASKSTORIES);
      break;
    case 'show':
      getStories(SHOWSTORIES);
      break;
    case 'jobs':
      getStories(JOBSTORIES);
      break;
    case 'polls':
      getPolls();
      break;
    case 'saved':
      getSavedStories();
      break;
    default:
      getStories(TOPSTORIES);
  }
}

// show/hide elements
var show = function (elem) {
  elem.classList.add('is-visible');
  elem.classList.remove('is-hidden');
};

var hide = function (elem) {
  elem.classList.add('is-hidden');
  elem.classList.remove('is-visible');
};

var toggle = function (elem) {
  elem.classList.toggle('is-visible');
};

// load something on first load
window.onload = getStories(TOPSTORIES);
