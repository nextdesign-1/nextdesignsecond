
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
    }, 200);
}
startAnimation();

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


function nothing(){
const params = new URLSearchParams(window.location.search);
let todayBox;
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const schedule = [
  // Monday: 6:30pm - 10:00pm
  ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],

  // Tuesday: 5:00pm - 10:00pm
  ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],

  // Wednesday: 3:00pm - 10:00pm
  ["15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],

  // Thursday: 5:00pm - 10:00pm
  ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],

  // Friday: 6:30pm - 10:00pm
  ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],

  // Saturday: 6:30pm - 10:00pm
  ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],

  // Sunday: 9:00am - 10:00pm
  ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
   "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
   "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
   "21:00", "21:30", "22:00"]
];
const now = new Date();
let currentSchedule;
const todayDate = now.getDate();
const startPosition = now.getMonth();
let currentMonth = now.getMonth();
const startYear = now.getFullYear().toString();
let currentYear = now.getFullYear().toString();
let url = "";


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

    let startIdx = firstDay(monthIdx, yearStr);
    let endIdx = totalDays(monthIdx, yearStr);

    let bookings = [];
    async function getBookings(){
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
            console.log(responseData.bookings);
            bookings = responseData.bookings;

            document.querySelectorAll(".cal-box").forEach((box, idx) => {
                box.classList.remove("cal-active");
                box.classList.remove("cal-disabled");
                box.classList.add("cal-inactive");
                box.textContent = "";

                if(idx >= startIdx && idx < (endIdx + startIdx)){
                    box.classList.remove("cal-inactive");
                    box.textContent = String(idx - (startIdx - 1));

                    if(monthIdx == startPosition && Number(box.textContent) < todayDate){
                        box.classList.add("cal-disabled");
                    } else if(monthIdx == startPosition && Number(box.textContent) == todayDate){
                        box.classList.add("cal-active");
                        box.classList.remove("cal-inactive");
                        if(firstCall){
                            todayBox = box;
                            makeSlots(schedule[(Number(box.textContent) + (startIdx - 1)) % 7]);
                        }
                    } else if(monthIdx == startPosition && Number(box.textContent) > todayDate){
                        box.classList.remove("cal-inactive");
                    } else if(monthIdx != startPosition && Number(box.textContent) == 1){
                        box.classList.add("cal-active");
                        box.classList.remove("cal-inactive");
                    }

                    let todayBookings = 0;
                    bookings.forEach(booking => {
                        if(Number(booking.booking_date.slice(8, 10)) == Number(box.textContent)){
                            todayBookings++;
                        }
                    });
                    if(todayBookings == 18){
                        box.classList.add("cal-disabled");

                        if(Number(box.textContent) >= todayDate){
                            box.style.pointerEvents = "auto";
                        }
                    }
                }

                box.addEventListener("click", () => {
                    makeSlots(schedule[(Number(box.textContent) + (startIdx - 1)) % 7]);
                });
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
setCalendar(currentMonth, currentYear, true);
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
        document.querySelector(".time-ul").innerHTML += `<div class="time-wrapper">${time}</div>`;
    });

    document.querySelectorAll(".time-wrapper").forEach(box => {
        box.addEventListener("click", () => {
            document.querySelectorAll(".time-wrapper").forEach(other => {
                other.classList.remove("time-active");
            });
            box.classList.add("time-active");
            document.querySelector(".btn-form").classList.remove("btn-inactive");
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
    let monStr = String(currentMonth + 1);
    if(monStr.length == 1){
        monStr = "0" + monStr;
    }
    let dateStr = document.querySelector(".cal-active").textContent;
    if(dateStr.length == 1){
        dateStr = "0" + dateStr;
    }
    let fullDate = currentYear + "-" + monStr + "-" + dateStr;
    const fullTime = document.querySelector(".time-active").textContent;
    const emailTxt = document.querySelector(".form-email").value;
    if(document.querySelector(".form-area").value.length > 0){
        bookingMessage = document.querySelector(".form-area").value;
    }
    const dataToSend = { date: fullDate, time: fullTime, email: emailTxt, message: bookingMessage, type: 'user' };
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
        if(response.message == "failure"){
            console.log("Fail");
        } else {
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
                console.log(timesTaken);
                timesTaken.forEach(time => {
                    document.querySelectorAll(".time-wrapper").forEach(wrapper => {
                        if(wrapper.textContent == time){
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
            if(!bookingFound && responseData.closed < 18){
                document.querySelector(".time-empty").style.display = "block";
            } else if(responseData.closed == 18){
                /*
                document.querySelector(".btn-book-delete").classList.add("admin-none");
                document.querySelector(".btn-book-open").classList.remove("admin-none");
                document.querySelector(".book-time-closed").style.display = "block";
                */
            }
        }
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

if(params.get("cancel")){
    console.log(params.get("cancel"));
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
                    window.location.href = "/";
                }
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
        requestDelete();
    }
}

/*
create table bookings (
	id int auto_increment primary key,
    booking_time time,
    booking_date varchar(255),
    email varchar(255),
    message varchar(255),
    booking_type varchar(255),
    cancel_code varchar(255)
);
*/
}