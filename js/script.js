/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page){
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   studentList.innerHTML = '';
   for(let i = 0; i < list.length ; i++){
      if(i >= startIndex && i < endIndex){
         let studentItem = `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src=${list[i].picture.thumbnail} alt="Profile Picture">
           <h3>${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${list[i].registered.date}</span>
         </div>
       </li>`;
       studentList.insertAdjacentHTML("beforeend", studentItem);
      }
   };
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list){
   let numOfPages =  Math.ceil(list.length / 9);
   linkList.innerHTML = '';
   for(let i = 1; i <= numOfPages; i++){
      const button = `<li>
      <button type="button">${i}</button>
    </li>`;
    linkList.insertAdjacentHTML("beforeend", button);
    document.querySelectorAll('BUTTON')[0].classList.add('active');
    linkList.addEventListener('click', (e) => {
       if(e.target.tagName === "BUTTON"){
          document.querySelectorAll('.active')[0].className = '';
          e.target.classList.add('active');
          showPage(data, e.target.textContent)
          }
       }
    )
   }
}

// Call functions
showPage(data, 1);
addPagination(data); 

/*
Search Bar & search fuction
*/

const searchBar = `<label for="search" class="student-search">
<input id="search" placeholder="Search by name..." onkeyup="search()">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;

const header = document.getElementsByClassName('header')[0];
header.insertAdjacentHTML("beforeend", searchBar);

function search() {   
   let input, filter, searchData, name;
   input = document.getElementById('search');
   filter = input.value.toUpperCase();
   searchData = [];
   if (input.value !== ''){
   for (i = 0; i < data.length; i++) {
      name = data[i].name.first + data[i].name.last;
     if (name.toUpperCase().indexOf(filter) > -1) {
       searchData.push(data[i]);
     }
   }
   if (searchData.length > 1){
      showPage(searchData, 1);
      addPagination(searchData);
   } else if (input.value == '') {
      showPage(data, 1);
      addPagination(data);
   } else {
      studentList.innerHTML = `<strong> No matching is found</strong>`;
      linkList.innerHTML = '';
   }
}}