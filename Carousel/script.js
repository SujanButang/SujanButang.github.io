function numberToUnit(num, unit) {
  return `${num}${unit}`;
}

function setStyle(element, styles = {}) {
  Object.keys(styles).forEach((styleName) => {
    const styleValue = styles[styleName];
    element.style[styleName] = styleValue;
  });
}

class Carousel {
  constructor() {
    this.container = document.querySelector(".carousel-container");
    this.wrapper = document.querySelector(".carousel-wrapper");
    this.imageNumber = document.querySelectorAll(".image").length;
    this.currentIndex = 0;
    this.imageWidth = 50;
    this.speed = 1;
    this.wrapper.style.left = 0;
  }

  //add active tabs
  initiateTabs() {
    const tabWrapper = document.createElement("div");
    setStyle(tabWrapper, {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: "10px",
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
      gap: "20px",
    });

    for (let i = 0; i < this.imageNumber; i++) {
      const tab = document.createElement("div");
      tab.setAttribute("id", `tab-${i}`);
      setStyle(tab, {
        height: "10px",
        width: "10px",
        borderRadius: "50%",
        backgroundColor: i === this.currentIndex ? "white" : "gray",
        cursor: "pointer",
      });

      tab.addEventListener("click", () => {
        this.currentIndex = i;
        this.updateTabs();
        this.startMoveInterval();
      });
      tabWrapper.appendChild(tab);
    }

    this.container.appendChild(tabWrapper);
  }

  updateTabs() {
    const tabs = document.querySelectorAll(".carousel-container > div > div");
    tabs.forEach((tab, i) => {
      setStyle(tab, {
        backgroundColor: i === this.currentIndex ? "white" : "gray",
      });
    });
  }

  next() {
    this.currentIndex += 1;
    if (this.currentIndex >= this.imageNumber) {
      this.currentIndex = 0;
    }
    this.updateTabs();
    this.startMoveInterval();
  }

  prev() {
    this.currentIndex -= 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.imageNumber - 1;
    }
    this.updateTabs();
    this.startMoveInterval();
  }

  move() {
    const targetLeft = -this.currentIndex * this.imageWidth;
    const currentLeft = parseFloat(this.wrapper.style.left);

    if (targetLeft < currentLeft) {
      this.wrapper.style.left = numberToUnit(currentLeft - this.speed, "vw");
      if (parseFloat(this.wrapper.style.left) === targetLeft) {
        this.stopMoveInterval();
      }
    } else {
      this.wrapper.style.left = numberToUnit(currentLeft + this.speed, "vw");
      if (parseFloat(this.wrapper.style.left) === targetLeft) {
        this.stopMoveInterval();
      }
    }
  }

  startMoveInterval() {
    this.stopAutoNext();
    this.moveInterval = setInterval(() => {
      this.move();
    }, 1000 / 60);
    this.startAutoNext();
  }

  stopMoveInterval() {
    clearInterval(this.moveInterval);
  }

  startAutoNext(intervalTime) {
    this.autoNextInterval = setInterval(() => {
      this.next();
    }, 3000);
  }

  stopAutoNext() {
    clearInterval(this.autoNextInterval);
  }
}

let start = new Carousel();

start.initiateTabs();
start.startAutoNext();
const nextButton = document.querySelector("#next-button");
const prevButton = document.querySelector("#prev-button");

nextButton.addEventListener("click", () => start.next());
prevButton.addEventListener("click", () => start.prev());
