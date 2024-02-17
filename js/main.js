const milestonesData = JSON.parse(data).data;

// load course milestones data

function loadMilestones(){
 const milestones = document.querySelector('.milestones');

 milestones.innerHTML = `${milestonesData.map(milestone=> {
  return `<div class="milestone border-b" id="${milestone._id}">
  <div class="flex">
    <div class="checkbox"><input type="checkbox" onclick="markMileStone(this, ${milestone._id})" /></div>
    <div onclick="openMilestone(this,${milestone._id})">
      <p>
        ${milestone.name}
        <span><i class="fas fa-chevron-down"></i></span>
      </p>
    </div>
  </div>
  <div class="hidden_panel">
    ${milestone.modules.map(module=> {
      return `<div class="module border-b">
      <p>${module.name}</p>
    </div>`;
    }).join("")}
  </div>
</div>`;
 }).join("")}`

}



function openMilestone(milestoneElement,id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const active = document.querySelector(".active")
  const shownPanel = document.querySelector(".show")

  if(active && !milestoneElement.classList.contains("active")) {
    active.classList.remove("active");
  }
  if(shownPanel && !currentPanel.classList.contains("show")) {
    shownPanel.classList.remove("show");
  }

  milestoneElement.classList.toggle("active");
  currentPanel.classList.toggle("show");

  showMilestone(id);
}

function showMilestone(id) {
  const milestoneImage = document.querySelector(".milestoneImage")
  const name = document.querySelector(".title")
  const details = document.querySelector(".details")

  milestoneImage.style.opacity= 0;
  
  milestoneImage.src = milestonesData[id].image
  name.innerText = milestonesData[id].name
  details.innerText = milestonesData[id].description
}


const milestoneImage = document.querySelector(".milestoneImage")
milestoneImage.addEventListener("load", function () {
  this.style.opacity = 1;
})


function markMileStone(checkbox,id){
  const doneList = document.querySelector(".doneList");
  const milestonesList = document.querySelector(".milestones");
  const item = document.getElementById(id);
  
  if(checkbox.checked){
    milestonesList.removeChild(item)
    doneList.appendChild(item)
    item.children[1].classList.remove("show")
  } else {
    milestonesList.appendChild(item);
    item.children[1].classList.remove("show")
  }

  sortLists();
}

function sortLists() {
  const milestonesList = document.querySelector(".milestones");
  const doneList = document.querySelector(".doneList");
  
  const sortedMilestones = Array.from(milestonesList.childNodes)
    .sort((a, b) => parseInt(a.id) - parseInt(b.id));
  milestonesList.innerHTML = '';
  sortedMilestones.forEach(milestone => milestonesList.appendChild(milestone))
  
  const sortedDoneList = Array.from(doneList.childNodes)
  .sort((a, b) => parseInt(a.id) - parseInt(b.id));
  doneList.innerHTML = '';
  sortedDoneList.forEach(done => doneList.appendChild(done))


}




loadMilestones();