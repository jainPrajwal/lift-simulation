const lift = document.querySelector(`.lift`);

const container = document.querySelector(`.container`);
const UpButton = document.querySelector(`#btn-up`);
const downButton = document.querySelector(`#btn-down`);

const FLOORS = [];
const NUMBER_OF_LIFTS = 4;
const NUMBER_OF_FLOORS = 4;

const getFirstAvailableLiftOnTheFloor = (floor) => {
  return Array.from(floor.children).find(
    (child) => child.className === `wrapper-lift`
  )?.children[0];
};

const addEventListeners = (UpButton, downButton, lift) => {
  try {
    UpButton?.addEventListener(`click`, () => {
      const departureFloorIndex =
        +lift.parentElement.parentElement.id.split(`-`)[1];
      const currentLift = Array.from(lift.parentElement.children).filter(
        (child, index) => index === departureFloorIndex
      )[0];
      setTimeout(() => {
        lift.parentElement.removeChild(currentLift);
        const result = Array.from(
          FLOORS[departureFloorIndex + 1].children
        ).find((child) => {
          
          return child.classList.contains(`wrapper-lift`);
          // return false;
        });
       
        result.appendChild(currentLift);
      }, 1000);

      // lift.parentElement.replaceChildren(newLifts);

      const floor = document.querySelector(`.wrapper`);
      
      const totalDistanceRequiredToBeUplifted =
        floor.clientHeight + parseInt(getComputedStyle(floor).marginTop);
      lift.style.transform = `translateY(-${totalDistanceRequiredToBeUplifted}px)`;
      lift.style.transition = `transform 1s linear`;
    });
  } catch (error) {
    console.error(
      `some error occured while adding event listener to upButton `,
      error
    );
  }

  try {
    downButton?.addEventListener(`click`, () => {
      // console.log(`flooer `, floor.clientHeight);
      const floor = document.querySelector(`.wrapper`);
      const totalDistanceRequiredToBeUplifted =
        floor.clientHeight + parseInt(getComputedStyle(floor).marginTop);
      lift.style.transform = `translateY(${totalDistanceRequiredToBeUplifted}px)`;
      lift.style.transition = `transform 1s linear`;
    });
  } catch (error) {
    console.error(
      `some error occured while adding event listener to downButton `,
      error
    );
  }
};

const addNewFloor = (floorNumber) => {
  const floor = document.createElement(`div`);
  const id = floorNumber > 0 ? `floor-${floorNumber}` : `floor-0`;

  floor.id = id;
  const wrapperButtonGroup = document.createElement(`div`);
  wrapperButtonGroup.classList.add(`wrapper-btn`);

  const upBtn = document.createElement(`button`);
  upBtn.classList.add(`btn`);
  upBtn.innerText = `Up`;

  const downBtn = document.createElement(`button`);
  downBtn.classList.add(`btn`);
  downBtn.innerText = `Down`;

  wrapperButtonGroup.appendChild(upBtn);
  wrapperButtonGroup.appendChild(downBtn);

  const wrapperContent = document.createElement(`div`);
  wrapperContent.classList.add(`wrapper-content`);
  const content = document.createElement(`p`);
  content.classList.add(`content`);
  content.innerText = `floor ${floorNumber}`;
  floor.appendChild(wrapperButtonGroup);
  const wrapperLift = document.createElement(`div`);
  wrapperLift.classList.add(`wrapper-lift`);
  if (floorNumber === 0) {
    constructLifts(wrapperLift);
  }
  floor.appendChild(wrapperLift);
  floor.appendChild(wrapperContent);
  wrapperContent.appendChild(content);

  const firstAvailable = getFirstAvailableLiftOnTheFloor(floor);

  addEventListeners(upBtn, downBtn, firstAvailable);

  floor.classList.add(`wrapper`);
  FLOORS.push(floor);
};

const constructLifts = (wrapperLift) => {
  for (let i = 0; i < NUMBER_OF_LIFTS; i++) {
    const lift = document.createElement(`div`);
    lift.classList.add(`lift`);
    wrapperLift.appendChild(lift);
  }
};

const renderFloors = () => {
  FLOORS.forEach((floor) => {
    container.appendChild(floor);
  });
};

for (let i = NUMBER_OF_FLOORS - 1; i >= 0; i--) {
  addNewFloor(i);
}
renderFloors();
