const tracker = document.querySelector(".chart__data");

function pullData(param) {
    const path = "../../db/data.json";
    fetch(path)
    .then(resp =>  resp.json())
    .then(data =>  {
        pushData(data);
    });
}

function pushData(param) {
    const data = param.map(item => {
        const { day, amount } = item;

        let currBar = "";
        let currDay = findDate().toLowerCase();
        if (currDay === day.toLowerCase()) {
            currBar = "chart__line";
        }

        return (
            `<div class="chart__item">
                <div 
                    class="chart__bar ${currBar}" 
                    style="height:${amount * 2.5}px">
                </div>
                <div class="chart__tip">
                    $${amount}
                </div>
                <div class="chart__day">
                    ${day}
                </div>
            </div>`
        )
    });
    tracker.innerHTML = data.join("");
}

function findDate(param) {
    const date = new Date();
    return date.toLocaleString("en-GB", {
        weekday: "short"
    });
}

pullData();