

function createHtml(){
    let menu = document.createElement("div");
    menu.classList.add("menu-container");
    menu.innerHTML = `
        <div class="menu-x" onclick="closeMenu()">
            <div class="x-line x1"></div>
            <div class="x-line x2"></div>
        </div>
        <div class="menu-ul">
            <a href="index.html" class="menu-li"><div class="menu-li-txt">Home</div></a>
            <a href="team.html" class="menu-li">
                <div class="menu-li-txt">About us</div>
            </a>
            <a href="index.html#services" class="menu-li"><div class="menu-li-txt">Our Services</div></a>
            <a href="projects.html" class="menu-li"><div class="menu-li-txt">Our Works</div></a>
            <a href="index.html#contact" class="menu-li"><div class="menu-li-txt">Book a Call</div></a>
        </div>
    `;

    let header = document.createElement("div");
    header.classList.add("header");
    header.classList.add("width");
    header.innerHTML = `
        <div class="header-name">NextDesign</div>

        <div class="header-nav">
            <a href="index.html" class="header-link">Home</a>
            <a href="team.html" class="header-link">Our team</a>
            <a href="index.html#services" class="header-link">Services</a>
            <a href="projects.html" class="header-link">Projects</a>
            <a href="index.html#contact" class="header-link">Contact</a>
        </div>

        <a href="index.html#bookings" class="btn-header">Start Project</a>
        <div class="header-burger" onclick="openMenu()">
            <div class="burger-line line1"></div>
            <div class="burger-line line2"></div>
            <div class="burger-line line3"></div>
        </div>
    `;

    let footer = document.createElement("div");
    footer.classList.add("foot-container");
    footer.innerHTML = `
        <div class="foot-flex width">
            <div class="foot-col foot-col-left">
                <img src="images/logo-transparent.png" class="foot-img" />
                <div class="foot-para">NextDesign creates modern, high-performing websites with creative design and reliable development, helping businesses grow online.</div>
                <a href="#bookings" class="btn-foot">Schedule a Call</a>
            </div>
            <div class="foot-col">
                <div class="foot-label">Useful Links</div>
                <a href="index.html" class="foot-link">Home</a>
                <a href="#about" class="foot-link">About us</a>
                <a href="#services" class="foot-link">Our Services</a>
                <a href="#works" class="foot-link">Our Works</a>
                <a href="#contact" class="foot-link">Contact</a>
            </div>
            <div class="foot-col">
                <div class="foot-label">Our Services</div>
                <a href="#services" class="foot-link">Design & Development</a>
                <a href="#services" class="foot-link">Backend Systems</a>
                <a href="#services" class="foot-link">SEO Optimization</a>
                <a href="#services" class="foot-link">Site Maintenance</a>
                <a href="#services" class="foot-link">Social Media Managment</a>
            </div>
        </div>
        <div class="foot-hr"></div>

        <div class="foot-copy width">© NextDesign 2025. All Rights Reserved</div>
    `;

    document.body.prepend(menu);
    document.body.prepend(header);
    document.body.appendChild(footer);
}
if(!document.querySelector(".lac-container")){
    createHtml();
}

function openMenu(){
    document.querySelector(".menu-container").style.opacity = "1";
    document.querySelector(".menu-container").style.pointerEvents = "auto";
}
function closeMenu(){
    document.querySelector(".menu-container").style.opacity = "0";
    document.querySelector(".menu-container").style.pointerEvents = "none";
}

function startAnimation(){
    document.querySelector(".hero-para").innerHTML = document.querySelector(".hero-para").textContent
    .split('')
    .map(char => {
        if (char === ' ') return `<span>&nbsp;</span>`;
        return `<span>${char}</span>`;
    })
    .join('');
    document.querySelector(".hero-para").style.opacity = "1";

    document.querySelector(".outline-block").style.transform = "translateX(1700px)";

    setTimeout(() => {
        document.querySelector(".hero-eyebrow").style.top = "0px";
        document.querySelector(".hero-eyebrow").style.left = "0px";
        document.querySelector(".hero-eyebrow").style.opacity = "1";
        document.querySelector(".hero-eyebrow").style.transform = "scale(1) rotate(0deg)";
        document.querySelectorAll(".hero-title span").forEach((letter, idx) => {
            setTimeout(() => {
                letter.style.filter = "blur(0px)";
                letter.style.top = "0px";
                letter.style.left = "0px";
                letter.style.opacity = "1";
                letter.style.transform = "scale(1) rotate(0deg)";
                if(idx == document.querySelectorAll(".hero-title span").length - 1){
                    setTimeout(() => {
                        document.querySelectorAll(".hero-para span").forEach((let, letIdx) => {
                            setTimeout(() => {
                                let.style.filter = "blur(0px)";
                                let.style.top = "0px";
                                let.style.left = "0px";
                                let.style.opacity = "1";
                                let.style.transform = "scale(1) rotate(0deg)";
                                if(letIdx == document.querySelectorAll(".hero-para span").length - 1){
                                    document.querySelector(".btn-hero-book").style.top = "0px";
                                    document.querySelector(".btn-hero-book").style.left = "0px";
                                    document.querySelector(".btn-hero-book").style.opacity = "1";
                                    document.querySelector(".btn-hero-book").style.transform = "scale(1) rotate(0deg)";
                                    document.querySelector(".btn-hero-work").style.top = "0px";
                                    document.querySelector(".btn-hero-work").style.left = "0px";
                                    document.querySelector(".btn-hero-work").style.opacity = "1";
                                    document.querySelector(".btn-hero-work").style.transform = "scale(1) rotate(0deg)";                                
                                }
                            }, letIdx * 6);
                        });
                    }, 200);
                }
            }, idx * 15);
        });
    }, 50);
}
if(document.querySelector(".grid-bg")){
    startAnimation();
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.position = "relative";
          entry.target.style.top = "0px";
          entry.target.style.opacity = "1";

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
});
document.querySelectorAll(".scroll-target").forEach(target => {
    observer.observe(target);
});

const pop = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.filter = "blur(0px)";

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.45,
});
document.querySelectorAll(".pop-target").forEach(target => {
    pop.observe(target);
});

const aboutVert = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.querySelector(".about-hr").style.height = "600px";

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5,
});
document.querySelectorAll(".about-hr-holder").forEach(target => {
    aboutVert.observe(target);
});

const aboutHori = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.width = "100%";

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.6,
});
document.querySelectorAll(".about-border").forEach(target => {
    aboutHori.observe(target);
});

const boxFlex = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".services-wrapper").forEach((box, idx) => {
            setTimeout(() => {
                box.style.opacity = "1";
                box.style.transform = "rotate(0deg)";
                box.style.top = "0px";
                box.style.left = "0px";
            }, idx * 250);
        });

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
});
document.querySelectorAll(".services-flex").forEach(target => {
    boxFlex.observe(target);
});

const workHori = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.width = "100%";

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.6,
});
document.querySelectorAll(".work-border").forEach(target => {
    workHori.observe(target);
});

function expandFinTxt(){
    document.getElementById("finReadMore").classList.add("display-none");
    document.getElementById("finMobile").classList.add("display-none");
    document.querySelector(".meet-box-overflow").style.maxHeight = "1550px";
}
function hideFinTxt(){
    document.querySelector(".meet-box-overflow").style.maxHeight = "525px";
    setTimeout(() => {
        document.getElementById("finReadMore").classList.remove("display-none");
        document.getElementById("finMobile").classList.remove("display-none");
    }, 200);
}

function showServiceModal(modalIdx){
    let modal = document.querySelectorAll(".smodal-modal")[modalIdx];
    let wrapper = modal.querySelector(".smodal-wrapper");
    modal.addEventListener("click", (e) => {
        if(!wrapper.contains(e.target)){
            closeServiceModal();
        }
    });
    modal.style.opacity = "1";
    modal.style.pointerEvents = "auto";
    wrapper.style.opacity = "1";
    wrapper.style.transform = "scale(1)";
    wrapper.querySelectorAll(".smodal-target1, .smodal-target2, .smodal-target3").forEach(target => {
        setTimeout(() => {
            if(target.classList.contains("smodal-target1")){
                    target.style.top = "0px";
                    target.style.opacity = "1";
                target.style.filter = "blur(0px)";
            }
            setTimeout(() => {
                if(target.classList.contains("smodal-target2")){
                    target.style.top = "0px";
                    target.style.opacity = "1";
                    target.style.filter = "blur(0px)";
                }
            }, 100);
            setTimeout(() => {
                if(target.classList.contains("smodal-target3")){
                    target.style.top = "0px";
                    target.style.opacity = "1";
                    target.style.filter = "blur(0px)";
                }
            }, 200);
        }, 150);
    });
}
function closeServiceModal(){
    document.querySelectorAll(".smodal-modal").forEach(modal => {
        modal.style.opacity = "0";
        modal.style.pointerEvents = "none";
        let wrapper = modal.querySelector(".smodal-wrapper");
        wrapper.style.opacity = "0";
        wrapper.style.transform = "scale(0)";
        wrapper.querySelectorAll(".smodal-target1, .smodal-target2, .smodal-target3").forEach(target => {
            setTimeout(() => {
                    target.style.top = "50px";
                    target.style.opacity = "0";
                    target.style.filter = "blur(10px)";
            }, 150);
        });
    });
}

if(document.querySelector(".contact-form")){
    document.querySelector(".contact-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
            console.log("OKAY")
          form.reset();
          document.querySelector(".book-msg-modal").style.opacity = "1";
          document.querySelector(".book-msg-modal").style.pointerEvents = "auto";
        } else {
          console.error("NOT OKAY");
        }
      });
    });
}





const params = new URLSearchParams(window.location.search);
let todayBox;
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const days = [
  "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
];
const schedule = [
  ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],

  ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],

  ["15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],

  ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],

  ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
   "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
   "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
   "21:00", "21:30", "22:00"],

  ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],

  ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
   "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
   "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
   "21:00", "21:30", "22:00"]
];
const now = new Date();
let currentSchedule;
const todayDate = now.getDate();
let currentDate = todayDate;
const startPosition = now.getMonth();
let currentMonth = now.getMonth();
const startYear = now.getFullYear().toString();
let currentYear = now.getFullYear().toString();
let adminActive = false;
let adminTime;
let adminYear;
let adminMonth;
let adminDate;
let url = ""; 
let frontendUrl = "";
if(window.location.href.includes("localhost")) {
    url = ""; 
    frontendUrl = "http://localhost:3000"; 
} else {
    url = "https://nextdesignsecond-p61c.onrender.com"; 
    frontendUrl = "https://nextdesignwebsite.com"; 
}
let startIdx;

if(document.querySelector(".book-container") || document.querySelector(".lac-container")){
    document.querySelectorAll(".cal-box").forEach(box => {
        box.addEventListener("click", () => {
            document.querySelectorAll(".cal-box").forEach(other => {
                other.classList.remove("cal-active");
            });
            box.classList.add("cal-active");
            checkSlots();
        });
    });
    function setCalendar(monthIdx, yearStr, firstCall){
        document.querySelector(".cal-nav-head").textContent = months[monthIdx] + " " + yearStr;

        startIdx = firstDay(monthIdx, yearStr);
        let endIdx = totalDays(monthIdx, yearStr);

        let bookings = [];
        async function getBookings(){
            let monStr = String(currentMonth + 1);
            if(monStr.length == 1){
                monStr = "0" + monStr;
            }
            let dateStr = document.querySelector(".cal-active").textContent;
            if(dateStr.length == 1){
                dateStr = "0" + dateStr;
            }
            let fullDate = currentYear + "-" + monStr + "-";
            const dataToSend = { month: monthIdx + 1, year: yearStr };
            try {
                const response = await fetch(url + '/api/get-bookings', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(dataToSend), 
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error:', errorData.message);
                    return;
                }

                const responseData = await response.json();
                bookings = responseData.bookings;

                document.querySelectorAll(".cal-box").forEach((box, idx) => {
                    box.classList.remove("cal-active");
                    box.classList.remove("cal-disabled");
                    box.classList.add("cal-inactive");
                    box.textContent = "";

                    if(idx >= startIdx && idx < (endIdx + startIdx)){
                        box.classList.remove("cal-inactive");
                        box.textContent = String(idx - (startIdx - 1));

                        if(yearStr == startYear && monthIdx == startPosition && Number(box.textContent) < todayDate){
                            box.classList.add("cal-disabled");
                        } else if(yearStr == startYear && monthIdx == startPosition && Number(box.textContent) == todayDate){
                            box.classList.add("cal-active");
                            box.classList.remove("cal-inactive");
                            if(firstCall){
                                todayBox = box;
                            }
                        } else if(yearStr == startYear && monthIdx == startPosition && Number(box.textContent) > todayDate){
                            box.classList.remove("cal-inactive");
                        } else if((monthIdx != startPosition || yearStr != startYear) && Number(box.textContent) == 1){
                            box.classList.add("cal-active");
                            box.classList.remove("cal-inactive");
                        }


                        let todayBookings = 0;
                        bookings.forEach(booking => {
                            if(Number(booking.booking_date.slice(8, 10)) == Number(box.textContent)){
                                todayBookings++;
                            }
                        });
                        if(todayBookings >= schedule[(Number(box.textContent) + (startIdx - 1)) % 7].length){
                            box.classList.add("cal-disabled");

                            if(Number(box.textContent) >= todayDate || monthIdx != startPosition){
                                box.style.pointerEvents = "auto";
                            }
                        }
                    }
                });

                if(document.querySelector(".last-cal-flex").querySelectorAll(".cal-inactive").length < 7){
                    document.querySelector(".last-cal-flex").style.display = "flex";
                } else {
                    document.querySelector(".last-cal-flex").style.display = "none";
                }
                
                checkSlots();
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
        getBookings();
    }
    function changeMonth(direction){
        if(direction == "right"){
            currentMonth++;
        } else if(currentMonth > startPosition || Number(currentYear) > Number(startYear)){
            currentMonth--;
        }

        if(currentMonth == 12){
            currentMonth = 0;
            currentYear = Number(currentYear) + 1;
        } else if(currentMonth < 0) {
            currentMonth = 11;
            currentYear = Number(currentYear) - 1;
        }
        setCalendar(currentMonth, currentYear, false);
    }
    function firstDay(monthIdx, yearStr) {
        const date = new Date(parseInt(yearStr), monthIdx, 1);
        let day = date.getDay() - 1;
        if(day == -1){
            return 6;
        } else {
            return day;
        }
    }
    function totalDays(monthIdx, yearStr) {
        const year = parseInt(yearStr);
        return new Date(year, monthIdx + 1, 0).getDate();
    }
    function makeSlots(times){
        document.querySelector(".time-ul").innerHTML = "";
        times.forEach(time => {
            document.querySelector(".time-ul").innerHTML += `<div class="time-wrapper">${time} <i class="fa-solid fa-xmark time-x" onclick="closeShowModal()"></i></div>`;
        });
        async function getCode() {
            try {
                const response = await fetch(url + `/api/admin-code?admin=${params.get("admin")}&code=${params.get("code")}`);
                const data = await response.json(); 
                if(data.message == "failure"){
                    document.querySelectorAll("i.time-x").forEach(element => element.style.display = "none");
                } else {
                    document.querySelectorAll("i.time-x").forEach(element => element.style.display = "block");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getCode();

        document.querySelectorAll(".time-wrapper").forEach(box => {
            box.addEventListener("click", () => {
                document.querySelectorAll(".time-wrapper").forEach(other => {
                    other.classList.remove("time-active");
                });
                box.classList.add("time-active");
                document.querySelector(".btn-form").classList.remove("btn-inactive");
            });
            box.querySelector("i.time-x").addEventListener("click", (e) => {
                e.stopPropagation();
                async function removeSlot() {
                    let monStr = String(currentMonth + 1);
                    if(monStr.length == 1){
                        monStr = "0" + monStr;
                    }
                    let dateStr = document.querySelector(".cal-active").textContent;
                    if(dateStr.length == 1){
                        dateStr = "0" + dateStr;
                    }
                    let fullDate = currentYear + "-" + monStr + "-" + dateStr;
                    const dataToSend = { date: fullDate, time: box.textContent };
                    try {
                        const response = await fetch(url + `/api/remove-slot?admin=${params.get("admin")}&code=${params.get("code")}`, {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json', 
                            },
                            body: JSON.stringify(dataToSend), 
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            console.error('Error:', errorData.message);
                            return;
                        }

                        const responseData = await response.json();
                        if(responseData.message == "success"){
                            location.reload();
                        }
                    } catch (error) {
                        console.error('Error posting data:', error);
                    }
                }
                removeSlot();
            });
        });
    }
    function cancelCal(){
        document.querySelectorAll(".time-wrapper").forEach(wrapper => {
            wrapper.classList.remove("time-active");
        });
        document.querySelector(".btn-form").classList.add("btn-inactive");
    }
    function resetCal(){
        setCalendar(startPosition, startYear, true);
        cancelCal();
    }
    document.querySelectorAll(".book-all-modal").forEach(modal => {
        modal.querySelector("i.modal-exit").addEventListener("click", () => {
            modal.style.pointerEvents = "none";
            modal.style.opacity = "0";
        });
    });
    // call async //
    function callPostBooking(){
        let blank = false;
        document.querySelectorAll(".form-input, .form-area").forEach(inp => {
            if(inp.value == ""){
                blank = true;
            }
        });
        if(blank){
            document.querySelector(".other-error").style.display = "block";
            setTimeout(() => {
                document.querySelector(".other-error").style.display = "none";
            }, 2000);
        } else {
            postBooking();
        }
    }
    ////////////////

    async function postBooking(){
        let fullDate;
        let fullTime;
        if(adminActive){
            fullDate = adminYear + "-" + adminMonth + "-" + adminDate;
            fullTime = adminTime;
        } else {   
            let monStr = String(currentMonth + 1);
            if(monStr.length == 1){
                monStr = "0" + monStr;
            }
            let dateStr = document.querySelector(".cal-active").textContent;
            if(dateStr.length == 1){
                dateStr = "0" + dateStr;
            }
            fullDate = currentYear + "-" + monStr + "-" + dateStr;
            fullTime = document.querySelector(".time-active").textContent;
        }
        const emailTxt = document.querySelector(".form-email").value;
        const phoneTxt = document.querySelector(".form-phone").value;
        if(document.querySelector(".form-area").value.length > 0){
            bookingMessage = document.querySelector(".form-area").value;
        }
        const dataToSend = { date: fullDate, time: fullTime, email: emailTxt, phone: phoneTxt, message: bookingMessage, type: 'user' };
        try {
            const response = await fetch(url + '/api/book-appointment', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(dataToSend), 
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                return;
            }

            const responseData = await response.json();
            if(responseData.message == "success"){
                if(adminActive){
                    closeAdminModal();
                }
                document.querySelector(".book-modal").style.opacity = "1";
                document.querySelector(".book-modal").style.pointerEvents = "auto";
            } else {
                document.querySelector(".email-error").style.display = "block";
                setTimeout(() => {
                    document.querySelector(".email-error").style.display = "none";
                }, 2000);
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
    async function checkSlots() {
        let monStr = String(currentMonth + 1);
        if(monStr.length == 1){
            monStr = "0" + monStr;
        }
        let dateStr = document.querySelector(".cal-active").textContent;
        if(dateStr.length == 1){
            dateStr = "0" + dateStr;
        }
        let fullDate = currentYear + "-" + monStr + "-" + dateStr;
        await extraSlots(fullDate.slice(0, 8), document.querySelector(".cal-active"));
        const dataToSend = { date: fullDate };
        try {
            const response = await fetch(url + '/api/check-slots', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(dataToSend), 
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                return;
            }

            const responseData = await response.json();
            if(responseData.message == "success") {
                const ukTime = new Date().toLocaleTimeString('en-GB', {
                    timeZone: 'Europe/London',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
                /*
                document.querySelector(".book-time-empty").style.display = "none";
                document.querySelector(".book-time-closed").style.display = "none";
                document.querySelector(".btn-book-delete").classList.remove("admin-none");
                document.querySelector(".btn-book-open").classList.add("admin-none");
                */
                document.querySelectorAll(".time-wrapper").forEach(wrapper => {
                    wrapper.style.display = "block";
                    if(todayBox.classList.contains("cal-active") && (Number(ukTime.slice(0, 2)) > wrapper.textContent.slice(0, 2) || (Number(ukTime.slice(0, 2)) == wrapper.textContent.slice(0, 2) && Number(ukTime.slice(3, 5)) > wrapper.textContent.slice(3, 5)))){
                        wrapper.style.display = "none";
                    }
                });
                if(responseData.times != ""){
                    const timesTaken = responseData.times.split(",,");
                    timesTaken.forEach(time => {
                        document.querySelectorAll(".time-wrapper").forEach(wrapper => {
                            if(wrapper.textContent.replace(/ /g, "") == time){
                                wrapper.style.display = "none";
                            } 
                        });
                    });
                }
                let bookingFound = false;
                document.querySelectorAll(".time-wrapper").forEach(wrapper => {
                    wrapper.classList.remove("time-active");
                    document.querySelector(".btn-form").classList.add("btn-inactive");
                    if(wrapper.style.display == "block"){
                        bookingFound = true;
                    }
                });
                if(!bookingFound){
                    document.getElementById("closedMsg").style.display = "block";
                    document.getElementById("adminDelete").textContent = "open day";
                    document.getElementById("adminDelete").onclick = openDay;
                } else {
                    document.getElementById("closedMsg").style.display = "none";
                    document.getElementById("adminDelete").textContent = "close day";
                    document.getElementById("adminDelete").onclick = closeAllBookings;
                }
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
    async function extraSlots(date, box) {
        let dateStr = box.textContent;
        if(dateStr.length == 1){
            dateStr = "0" + dateStr;
        }
        date += dateStr;
        const dataToSend = { date: date };
        try {
            const response = await fetch(url + '/api/extra-slots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(dataToSend), 
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                return;
            }

            const data = await response.json();
            let allSlots = [...schedule[(Number(box.textContent) + (startIdx - 1)) % 7]];
            data.slots.forEach(obj => {
                allSlots.push(obj.booking_time);
            });
            allSlots.sort((a, b) => a.localeCompare(b));
            console.log(schedule);
            makeSlots(allSlots);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
    if(!document.querySelector(".lac-container")){
        setTimeout(() => {
            setCalendar(currentMonth, currentYear, true);
        }, 500);
    }

    if(params.get("admin") == "true" && params.get("code")){
        function closeAllBookings(){
            async function requestClose(){
                let monStr = String(currentMonth + 1);
                if(monStr.length == 1){
                    monStr = "0" + monStr;
                }
                let dateStr = document.querySelector(".cal-active").textContent;
                if(dateStr.length == 1){
                    dateStr = "0" + dateStr;
                }
                let fullDate = currentYear + "-" + monStr + "-" + dateStr;
                const dataToSend = { date: fullDate, times: schedule[(Number(document.querySelector(".cal-active").textContent) + (startIdx - 1)) % 7] };
                try {
                    const response = await fetch(url + `/api/close-all?admin=${params.get("admin")}&code=${params.get("code")}`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json', 
                        },
                        body: JSON.stringify(dataToSend), 
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error:', errorData.message);
                        return;
                    }

                    const responseData = await response.json();
                    if(responseData.message == "success"){
                        location.reload();
                    }
                } catch (error) {
                    console.error('Error posting data:', error);
                }
            }
            requestClose();
        }

        function openDay(){
            async function requestOpen() {
                let monStr = String(currentMonth + 1);
                if(monStr.length == 1){
                    monStr = "0" + monStr;
                }
                let dateStr = document.querySelector(".cal-active").textContent;
                if(dateStr.length == 1){
                    dateStr = "0" + dateStr;
                }
                let fullDate = currentYear + "-" + monStr + "-" + dateStr;
                const dataToSend = { date: fullDate };
                try {
                    const response = await fetch(url + `/api/open-day?admin=${params.get("admin")}&code=${params.get("code")}`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json', 
                        },
                        body: JSON.stringify(dataToSend), 
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error:', errorData.message);
                        return;
                    }

                    const responseData = await response.json();
                    if(responseData.message == "success"){
                        location.reload();
                    }
                } catch (error) {
                    console.error('Error posting data:', error);
                }
            }
            requestOpen();
        }

        function showBookings(){
            async function requestShow() {
                try {
                    let monStr = String(currentMonth + 1);
                    if(monStr.length == 1){
                        monStr = "0" + monStr;
                    }
                    let dateStr = document.querySelector(".cal-active").textContent;
                    if(dateStr.length == 1){
                        dateStr = "0" + dateStr;
                    }
                    let fullDate = currentYear + "-" + monStr + "-" + dateStr;
                    const dataToSend = { date: fullDate };
                    const response = await fetch(url + `/api/show-bookings?admin=${params.get("admin")}&code=${params.get("code")}`, {
                        method: 'POST',
                        credentials: 'include',

                        headers: {
                            'Content-Type': 'application/json', 
                        },
                        body: JSON.stringify(dataToSend), 
                    });

                    if(!response.ok){
                        const errorData = await response.json();
                        console.error('Error:', errorData.message);
                        return;
                    }

                    const responseData = await response.json();

                    let bookings = responseData.arrayObjs;
                    bookings.forEach(obj => {
                        let newCard = document.createElement("div");
                        newCard.classList.add("book-show-section");
                        newCard.innerHTML = `
                            <div class="book-show-txt">Time: <span class="book-show-txt" id="bookShowTime">${obj.booking_time}</span></div>
                            <div class="book-show-txt">Email: <span class="book-show-txt" id="bookShowEmail">${obj.email}</span></div>
                            <div class="book-show-txt">Message: <span class="book-show-txt" id="bookShowMessage">${obj.message}</span></div>
                            <div class="book-show-txt btn-show-delete" style="text-decoration: underline; cursor: pointer;">DELETE BOOKING</div>
                        `
                        newCard.querySelector(".btn-show-delete").addEventListener("click", () => {
                            async function deleteCard() {
                                const dataToSend = { code: obj.cancel_code };
                                try {
                                    const response = await fetch(url + '/api/delete-booking', {
                                        method: 'POST',
                                        credentials: 'include',
                                        headers: {
                                            'Content-Type': 'application/json', 
                                        },
                                        body: JSON.stringify(dataToSend), 
                                    });

                                    if (!response.ok){
                                        const errorData = await response.json();
                                        console.error('Error:', errorData.message);
                                        return;
                                    }

                                    const responseData = await response.json();
                                    location.reload();
                                } catch (error) {
                                    console.error('Error posting data:', error);
                                }
                            }
                            deleteCard();
                        });
                        document.querySelector(".book-show-wrapper").appendChild(newCard);
                    });
                    if(bookings.length > 0){
                        document.querySelector(".book-show-empty").style.display = "none";
                    }
                    document.querySelector(".book-show-modal").style.opacity = "1";
                    document.querySelector(".book-show-modal").style.pointerEvents = "auto";
                } catch (error) {
                    console.error('Error posting data:', error);
                }
            }
            requestShow();
        }
        function closeShowModal(){
            document.querySelector(".book-show-modal").style.opacity = "0";
            document.querySelector(".book-show-modal").style.pointerEvents = "none";
            setTimeout(() => {
                document.querySelector(".book-show-wrapper").innerHTML = `
                <i class="fa-solid fa-xmark book-show-x" onclick="closeShowModal()"></i>
                
                <div class="book-show-empty">
                    no bookings here.
                </div>
                `
            }, 1000);
        }

        function createExtraSlot(){
            let input = document.getElementById("adminTime");

            async function requestSlot() {
                let monStr = String(currentMonth + 1);
                if(monStr.length == 1){
                    monStr = "0" + monStr;
                }
                let dateStr = document.querySelector(".cal-active").textContent;
                if(dateStr.length == 1){
                    dateStr = "0" + dateStr;
                }
                let fullDate = currentYear + "-" + monStr + "-" + dateStr;
                const dataToSend = { date: fullDate, time: input.value };
                try {
                    const response = await fetch(url + `/api/create-slot?admin=${params.get("admin")}&code=${params.get("code")}`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json', 
                        },
                        body: JSON.stringify(dataToSend), 
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error:', errorData.message);
                        return;
                    }

                    const data = await response.json();
                    if(data.message == "success"){
                        location.reload();
                    } else {
                        input.setAttribute("placeholder", "ERROR IN DB");
                        setTimeout(() => {
                            input.setAttribute("placeholder", "booking time XX:XX");
                        }, 2000);
                    }

                } catch (error) {
                    console.error('Error posting data:', error);
                }
            }

            if(input.value.length != 5){
                input.setAttribute("placeholder", "invalid time");
                setTimeout(() => {
                    input.setAttribute("placeholder", "booking time XX:XX");
                }, 2000);
            } else {
                requestSlot();
            }
        }
    }

    if(params.get("cancel")){
        async function verifyCode() {
            const dataToSend = { code: params.get("cancel") };
            try {
                const response = await fetch(url + '/api/verify-cancel', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(dataToSend), 
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error:', errorData.message);
                    return;
                }

                const responseData = await response.json()
                if(responseData.message == "Failure"){
                    window.location.href = "/";
                } else {
                    document.querySelector(".book-delete-modal").style.opacity = "1";
                    document.querySelector(".book-delete-modal").style.pointerEvents = "auto";
                }
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
        verifyCode();

        function deleteBooking(){
            async function requestDelete() {
                const dataToSend = { code: params.get("cancel"), user: true };
                try {
                    const response = await fetch(url + '/api/delete-booking', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json', 
                        },
                        body: JSON.stringify(dataToSend), 
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error:', errorData.message);
                        return;
                    }

                    const responseData = await response.json();
                    if(responseData.message == "success"){
                        if(params.get("admin") && params.get("code")){
                            window.location.href = "/admin.html?admin=true&code=" + params.get("code");
                        } else {
                            window.location.href = "/";
                        }
                    }
                } catch (error) {
                    console.error('Error posting data:', error);
                }
            }
            requestDelete();
        }
    }

    function setLac(dateNumber, monthIdx, yearStr){ // params of today
        document.querySelector(".lac-nav-title").textContent = months[monthIdx] + " " + yearStr;

        const maxDays = totalDays(monthIdx, yearStr);
        let dateDay =  dateNumber;
        if(dateDay.length == 1){
            dateDay = "0" + dateNumber;
        }

        const todayIdx = getDateDay(dateNumber, monthIdx, yearStr); // 1
        const todayStr = days[todayIdx]; // 'Tue'
        for(let i = 0; i < 7; i++){
            let topDateNumber = dateNumber + i;
            if(topDateNumber > maxDays){
                topDateNumber = topDateNumber - maxDays;
            }
            let topDayIdx = todayIdx + i;
            if(topDayIdx > 6){
                topDayIdx = topDayIdx - 7;
            }
            document.querySelectorAll("div.lac-top-mon")[i].innerHTML = `${days[topDayIdx]}<span class="lac-top-mon">${topDateNumber}</span>`;
            if(topDateNumber == todayDate && monthIdx == startPosition && yearStr == startYear){
                document.querySelectorAll("span.lac-top-mon")[i].classList.add("lac-mon-active");
            } 
        }

        async function getBookings() {
            const dataToSend = { month: monthIdx + 1, year: yearStr };
            try {
                const response = await fetch(url + '/api/get-bookings', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(dataToSend), 
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error:', errorData.message);
                    return;
                }

                const data = await response.json();
                let bookings = data.bookings;
                console.log(bookings);
                let adminAmounts = [0, 0, 0, 0, 0, 0, 0];
                let boxDate;
                document.querySelectorAll(".lac-flex").forEach((flex, flexIdx) => {
                    let rowTime = flex.id.slice(5);
                    flex.querySelectorAll(".lac-box").forEach((box, idx) => {
                        let monStr = String(currentMonth + 1);
                        if(monStr.length == 1){
                            monStr = "0" + monStr;
                        }
                        let dateStr = document.querySelectorAll("span.lac-top-mon")[idx].textContent;
                        if(dateStr.length == 1){
                            dateStr = "0" + dateStr;
                        }
                        boxDate = currentYear + "-" + monStr + "-" + dateStr;
                        let emptyBox = true;
                        bookings.forEach(booking => {
                            if(booking.booking_date == boxDate && booking.booking_time == rowTime){
                                emptyBox = false;
                                if(booking.booking_type == "user"){
                                    let finishTime = booking.booking_time.slice(0, 3) + String(Number(booking.booking_time.slice(3)) + 30);
                                    if((Number(booking.booking_time.slice(3)) + 30) > 59){
                                        let finishStart = String(Number(booking.booking_time.slice(0, 2)) + 1);
                                        if(finishStart.length == 1){
                                            finishStart = "0" + finishStart;
                                        }
                                        let finishEnd = String((Number(booking.booking_time.slice(3)) + 30) - 60);
                                        if(finishEnd.length == 1){
                                            finishEnd = "0" + finishEnd;
                                        }
                                        finishTime = finishStart + ":" + finishEnd;
                                    }
                                    box.innerHTML = `
                                        <div class="lac-slot">
                                        <div class="lac-slot-scroll">
                                            <div class="lac-slot-time">${booking.booking_time} - ${finishTime}</div>
                                            <div class="lac-slot-email">${booking.email}</div>
                                            <div class="lac-slot-txt">Phone: ${booking.phone_number}</div>
                                            
                                            <div class="btn-lac-remove" onclick="window.location.href = '${frontendUrl}/admin.html?cancel=${booking.cancel_code}&admin=true&code=${params.get("code")}'">Remove Booking</div>
                                        </div>
                                        </div>
                                    `;
                                    box.querySelector(".lac-slot").style.height = "calc(100% - 10px)";
                                } else if(booking.booking_type == "admin"){
                                    adminAmounts[idx]++;
                                    box.innerHTML = `
                                        <div class="lac-slot-time" style="text-decoration: line-through;">${booking.booking_time}</div>
                                        <div class="lac-slot-txt">Slot Closed</div>
                                        <div class="btn-lac-open">Open Slot</div>
                                    `;
                                    box.querySelector(".btn-lac-open").onclick = function(){
                                        async function openCard() {
                                            const dataToSend = { id: booking.id };
                                            try {
                                                const response = await fetch(url + `/api/open-slot?admin=${params.get("admin")}&code=${params.get("code")}`, {
                                                    method: 'POST',
                                                    credentials: 'include',
                                                    headers: {
                                                        'Content-Type': 'application/json', 
                                                    },
                                                    body: JSON.stringify(dataToSend), 
                                                });

                                                if (!response.ok) {
                                                    const errorData = await response.json();
                                                    console.error('Error:', errorData.message);
                                                    return;
                                                }

                                                const responseData = await response.json();
                                                setLac(currentDate, currentMonth, currentYear);
                                            } catch (error) {
                                                console.error('Error posting data:', error);
                                            }
                                        }
                                        openCard();
                                    }
                                }
                            } 
                        });
                        if(emptyBox){
                            let dayTxt = document.querySelectorAll("div.lac-top-mon")[idx].innerHTML.slice(0, 3); // Wed
                            let dayIdx;
                            days.forEach((day, idxOfWeek) => {
                                if(dayTxt == day){
                                    dayIdx = idxOfWeek;
                                }
                            });
                            let midBtn = `<div class="btn-lac-add lac-hover-el">Add This Time</div>`;
                            schedule[dayIdx].forEach(time => {
                                if(time == rowTime){
                                    midBtn = "";
                                }
                            });
                            box.innerHTML = `
                                <div class="btn-lac-open lac-hover-el">Make a Booking</div>
                                ${midBtn}
                                <div class="btn-lac-remove lac-hover-el">Close Slot</div>
                            `
                            let monStr = String(currentMonth + 1);
                            if(monStr.length == 1){
                                monStr = "0" + monStr;
                            }
                            let dateStr = document.querySelectorAll("span.lac-top-mon")[idx].textContent;
                            if(dateStr.length == 1){
                                dateStr = "0" + dateStr;
                            }
                            let rnDate = currentYear + "-" + monStr + "-" + dateStr;
                            box.querySelector(".btn-lac-remove").onclick = function(){
                                async function removeSlot() {
                                    const dataToSend = { date: rnDate, time: rowTime };
                                    try {
                                        const response = await fetch(url + `/api/remove-slot?admin=${params.get("admin")}&code=${params.get("code")}`, {
                                            method: 'POST',
                                            credentials: 'include',
                                            headers: {
                                                'Content-Type': 'application/json', 
                                            },
                                            body: JSON.stringify(dataToSend), 
                                        });

                                        if (!response.ok) {
                                            const errorData = await response.json();
                                            console.error('Error:', errorData.message);
                                            return;
                                        }

                                        const responseData = await response.json();
                                        if(responseData.message == "success"){
                                            setLac(currentDate, currentMonth, currentYear);
                                        } else {
                                            console.log(responseData.message);
                                        }
                                    } catch (error) {
                                        console.error('Error posting data:', error);
                                    }
                                }
                                removeSlot();
                            }
                            box.querySelector(".btn-lac-open").onclick = function(){
                                document.querySelector(".admin-modal").style.opacity = "1";
                                document.querySelector(".admin-modal").style.pointerEvents = "auto";
                                adminActive = true;
                                adminTime = rowTime;
                                adminYear = currentYear;
                                adminMonth = monStr;
                                adminDate = dateStr;
                            }
                            if(box.querySelector(".btn-lac-add")){
                                box.querySelector(".btn-lac-add").onclick = function(){
                                    async function requestSlot() {
                                        const dataToSend = { date: rnDate, time: rowTime };
                                        try {
                                            const response = await fetch(url + `/api/create-slot?admin=${params.get("admin")}&code=${params.get("code")}`, {
                                                method: 'POST',
                                                credentials: 'include',
                                                headers: {
                                                    'Content-Type': 'application/json', 
                                                },
                                                body: JSON.stringify(dataToSend), 
                                            });

                                            if (!response.ok) {
                                                const errorData = await response.json();
                                                console.error('Error:', errorData.message);
                                                return;
                                            }

                                            const data = await response.json();
                                            if(data.message == "success"){
                                                document.querySelector(".book-add-modal").style.opacity = "1";
                                                document.querySelector(".book-add-modal").style.pointerEvents = "auto";
                                            } 

                                        } catch (error) {
                                            console.error('Error posting data:', error);
                                        }
                                    }
                                    requestSlot();
                                }
                            }
                        }
                    });
                });
                adminAmounts.forEach((day, idx) => {
                    let monStr = String(currentMonth + 1);
                    if(monStr.length == 1){
                        monStr = "0" + monStr;
                    }
                    let dateStr = document.querySelectorAll("span.lac-top-mon")[idx].textContent;
                    if(dateStr.length == 1){
                        dateStr = "0" + dateStr;
                    }
                    let fullDate = currentYear + "-" + monStr + "-" + dateStr;
                    if(day == 34){
                        document.querySelectorAll(".lac-box-space")[idx].textContent = "Open this day";
                        document.querySelectorAll(".lac-box-space")[idx].onclick = function(){
                            async function requestOpen() {
                                const dataToSend = { date: fullDate };
                                try {
                                    const response = await fetch(url + `/api/open-day?admin=${params.get("admin")}&code=${params.get("code")}`, {
                                        method: 'POST',
                                        credentials: 'include',
                                        headers: {
                                            'Content-Type': 'application/json', 
                                        },
                                        body: JSON.stringify(dataToSend), 
                                    });

                                    if (!response.ok) {
                                        const errorData = await response.json();
                                        console.error('Error:', errorData.message);
                                        return;
                                    }

                                    const responseData = await response.json();
                                    setLac(currentDate, currentMonth, currentYear);
                                } catch (error) {
                                    console.error('Error posting data:', error);
                                }
                            }
                            requestOpen();
                        }
                    } else {
                        document.querySelectorAll(".lac-box-space")[idx].textContent = "Close this day";
                        document.querySelectorAll(".lac-box-space")[idx].onclick = function(){
                            async function requestClose(){
                                const dataToSend = { date: fullDate };
                                try {
                                    const response = await fetch(url + `/api/close-all?admin=${params.get("admin")}&code=${params.get("code")}`, {
                                        method: 'POST',
                                        credentials: 'include',
                                        headers: {
                                            'Content-Type': 'application/json', 
                                        },
                                        body: JSON.stringify(dataToSend), 
                                    });

                                    if (!response.ok) {
                                        const errorData = await response.json();
                                        console.error('Error:', errorData.message);
                                        return;
                                    }

                                    const responseData = await response.json();
                                    setLac(currentDate, currentMonth, currentYear);
                                } catch (error) {
                                    console.error('Error posting data:', error);
                                }
                            }
                            requestClose();
                        }
                    }
                });
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
        getBookings();
    }
    function getDateDay(dateNumber, monthIdx, yearStr){ // give 1 = Tue from yyyy-mm-dd
        const date = new Date(parseInt(yearStr), monthIdx, dateNumber);
        let day = date.getDay() - 1;
        if(day == -1){
            return 6;
        } else {
            return day;
        }
    }
    function changeWeek(direction){
        if(direction == "right"){
            currentDate = currentDate + 7;
            if(currentDate > totalDays(currentMonth, currentYear)){
                currentDate = currentDate - totalDays(currentMonth, currentYear);
                currentMonth++;
                if(currentMonth == 12){
                    currentMonth = 0;
                    currentYear = String(Number(currentYear) + 1);
                }
            }
        }
        else if(currentDate != todayDate || currentMonth != startPosition || currentYear != startYear){
            currentDate = currentDate - 7;
            if(currentDate < 1){
                currentMonth--;
                currentDate = currentDate + totalDays(currentMonth, currentYear);
                if(currentMonth == -1){
                    currentMonth = 11;
                    currentYear = String(Number(currentYear) - 1);
                }
            }
        }

        setLac(currentDate, currentMonth, currentYear);
    }
    function closeAdminModal(){
        adminActive = false;
        document.querySelector(".admin-modal").style.opacity = "0";
        document.querySelector(".admin-modal").style.pointerEvents = "none";
    }

    if(document.querySelector(".lac-container")){
        setLac(todayDate, currentMonth, currentYear);

        async function getCode() {
            try {
                const response = await fetch(url + `/api/admin-code?admin=${params.get("admin")}&code=${params.get("code")}`);
                const data = await response.json(); 
                if(data.message == "failure"){
                    window.location.href = "/index.html";
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getCode();
    }
}

