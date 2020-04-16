/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Has been tested and is working in Chome, Firefox, Microsoft Edge


/*** 
  Global variables which are utilized in more than one function and/or event. 
***/
const studentList = document.getElementsByClassName('student-item cf');
const pageListView = 10;
const parentDiv = document.getElementsByClassName('page')[0];
let matchList = [];
let matchNumber = 0;
let matchesFound = true;
const searchbarParentDiv = document.getElementsByClassName('page-header cf')[0];
const div = document.createElement('div');
div.className = 'student-search';
searchbarParentDiv.appendChild(div);
const input = document.createElement('input');
input.placeholder = 'Search for students...';
div.appendChild(input);
const button = document.createElement('button');
button.textContent = 'Search';
div.appendChild(button);
const buttonReset = document.createElement('button');
buttonReset.textContent = 'Reset Search';
div.appendChild(buttonReset);
const studentName = document.getElementsByTagName('h3');


/*** 
   Funtion to correctly show the students on each page.
   Sets a start and end point for a list of 10, using the pageListView above. 
   Then loops though the length of the passed in list parameter to show the 
   correct amount of students on the page.
***/
function showPage(list, page){
   const startIndex = (page * pageListView) - pageListView;
   const endIndex = page * pageListView;
   for(let q = 0; q < list.length; q++){
      if (q >= startIndex && q < endIndex){
         list[q].style.display = '';
      } else {
         list[q].style.display = 'none';
      }
   }
}

/*** 
   Function to dymanically create the page numbers and links at the bottom. 
   Creates a new div named 'pagination', creates a new ul inside the div, 
   then creates a li for each student that will need to be shown on the page. 
   Creates of removes the 'active' class to the list element, depending on if 
   it's the current page. 
   Essentially reloads the page with the new list items/students by calling on 
   the showPage function inside of the event listener. 
***/ 
function appendPageLinks(list){
   const childDiv = document.createElement('div');
   childDiv.className = 'pagination';
   parentDiv.appendChild(childDiv);
   const ul = document.createElement('ul');
   childDiv.appendChild(ul);
   const pagesNeeded = Math.ceil(list.length / pageListView);
   for(let q = 0; q < pagesNeeded; q++){
      const li = document.createElement('li');
      const aElement = document.createElement('a');
      ul.appendChild(li);
      aElement.setAttribute('href', '#');
      aElement.textContent = q + 1;
      li.appendChild(aElement);
      for(let x = q; x < 1; x++){
         li.className = 'active';
      } 
   }
   ul.addEventListener('click', (e) => {
      for(let z = 0; z < ul.children.length; z++){
         ul.children[z].classList.remove('active');
      }
      e.target.parentNode.className = 'active';
      showPage(studentList, e.target.textContent);
   });   
}

/*** 
   Event listener that will allow search to happen in real time as the user types.
   Will also display a message if there are no results found. 
***/
input.addEventListener('keyup', (e) => {
   listenerEvent();
});
 
/*** 
   Event listener that will allow search based off of the input, when the user clicks the search button. 
   Will also display a message if there are no results found. 
***/

button.addEventListener('click', (e) => {
     listenerEvent();
});  

/*** 
   Event listener that will allow search based off of the input, when the user presses the enter key.  
   Will also display a message if there are no results found. 
***/
input.addEventListener('keypress', (e) => {
   if(e.key === 'Enter'){
      listenerEvent();
   } 
});

/*** 
   Event listener that will allow the user to reset the search back to the page default.   
***/
buttonReset.addEventListener('click', () => {
   const paginationDiv = parentDiv.getElementsByClassName('pagination')[0];
   paginationDiv.remove();
   showPage(studentList, 1);
   appendPageLinks(studentList);
})

/*** 
   Function to hold the listener event/search logic. 
***/
function listenerEvent(){
      matchList = [];
      const paginationDiv = parentDiv.getElementsByClassName('pagination')[0];
      paginationDiv.remove();
      for(let x = 0; x < studentList.length; x++){
         if(input.value.length != 0 && studentName[x].textContent.toLowerCase().includes(input.value.toLowerCase())){
            matchNumber += 1;
            matchList.push(studentList[x]);
            studentList[x].style.display = '';
         } else {
            studentList[x].style.display = 'none';
         } 
      } 
      if(matchList.length === 0){
         matchesFound = false;
      } else {
         matchesFound = true;
      }
      showPage(matchList, 1);
      appendPageLinks(matchList);
      if (!matchesFound){
         const noResultMessage = '<h2>No results found</h2>';
         document.querySelector('body div.page div ul').innerHTML = noResultMessage;
      } 
}

//Next 2 lines are calling on the 2 above functions.
showPage(studentList, 1);
appendPageLinks(studentList);


