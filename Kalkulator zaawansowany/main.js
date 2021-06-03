function init() {
    let calculatorStop = false;
    const lowerScreen = document.querySelector(".lowerScreen");
    const upperScreen = document.querySelector(".upperScreen");
    const memoryScreen = document.querySelector(".memory");
    const memory = [];

    const memoryAdd = document.querySelector("[data-type=memoryAdd]");
    memoryAdd.addEventListener("click", () => {
        if (memory.length > 5) return;
        memory.push(lowerScreen.textContent);
        const element = document.createElement("li");
        element.textContent = lowerScreen.textContent;
        document.querySelector(".memory ul").appendChild(element);
    });

    const memoryShow = document.querySelector("[data-type=memoryShow]");
    memoryShow.addEventListener("click", () => {
        memoryScreen.classList.add("active");
    });

    const memorySum = document.querySelector("[data-type=memorySum]");
    memorySum.addEventListener("click", () => {
        if (!memory.length) {
            memory.push(lowerScreen.textContent);
            const element = document.createElement("li");
            element.textContent = lowerScreen.textContent;
            document.querySelector(".memory ul").appendChild(element);
        } else {
            console.log("działą");
            memory[memory.length - 1] = +memory[memory.length - 1] + +lowerScreen.textContent;
            document.querySelector(`.memory ul li:nth-of-type(${memory.length})`).textContent = memory[memory.length - 1];
        }
    });

    const memoryDiff = document.querySelector("[data-type=memoryDiff]");
    memoryDiff.addEventListener("click", () => {
        if (!memory.length) {
            memory.push(-lowerScreen.textContent);
            const element = document.createElement("li");
            element.textContent = -lowerScreen.textContent;
            document.querySelector(".memory ul").appendChild(element);
        } else {
            console.log("działą");
            memory[memory.length - 1] = +memory[memory.length - 1] - +lowerScreen.textContent;
            document.querySelector(`.memory ul li:nth-of-type(${memory.length})`).textContent = memory[memory.length - 1];
        }
    });

    const memoryRead = document.querySelector("[data-type=memoryRead]");
    memoryRead.addEventListener("click", () => {
        if (!memory.length) return;
        setLowerScreen(memory[memory.length - 1]);
    });

    const memoryClear = document.querySelector("[data-type=memoryClear]");
    memoryClear.addEventListener("click", () => {
        memory.length = 0;
        document.querySelector(".memory ul").innerHTML = "";
    });

    const memoryHide = document.querySelector(".memory .fas");
    memoryHide.addEventListener("click", () => {
        memoryScreen.classList.remove("active");
    });

    function setLowerScreen(value) {
        if (lowerScreen.textContent.length > 8) return;
        lowerScreen.textContent = isFinite(value) ? value : "Błąd";
    }

    const numbersNodes = document.querySelectorAll("[data-type=number]");
    const numbersArray = [...numbersNodes];
    numbersArray.forEach(element => {
        element.addEventListener("click", () => {
            if (calculatorStop) return;
            setLowerScreen((!+lowerScreen.textContent[0] && lowerScreen.textContent.length == 1) ? element.textContent : lowerScreen.textContent + element.textContent);
        });
    });

    const signButton = document.querySelector("[data-type=sign]");
    signButton.addEventListener("click", () => {
        if (calculatorStop || !+lowerScreen.textContent) return;

        let content = lowerScreen.textContent;
        setLowerScreen(content[0] == "-" ? content.slice(1) : "-" + content)
    });

    const dotButton = document.querySelector("[data-type=dot]");
    dotButton.addEventListener("click", () => {
        if (calculatorStop || lowerScreen.textContent.includes(".")) return;
        setLowerScreen(lowerScreen.textContent + ".");
    });

    const entryNodes = document.querySelectorAll("[data-type=clearEntry]");
    const entryArray = [...entryNodes];
    entryArray.forEach(element => {
        element.addEventListener("click", () => {
            lowerScreen.textContent = "0";
            upperScreen.textContent = "";
            calculatorStop = false;
        });
    });

    const backspace = document.querySelector("[data-type=backspace]");
    backspace.addEventListener("click", () => {
        if (calculatorStop) return;
        setLowerScreen(lowerScreen.textContent.length > 1 ? lowerScreen.textContent.slice(0, -1) : "0");
    });

    const operatorsNodes = document.querySelectorAll("[data-type=operator]");
    const operatorsArray = [...operatorsNodes];
    operatorsArray.forEach(element => {
        element.addEventListener("click", () => {
            if (calculatorStop) return;
            let input = lowerScreen.textContent;
            input += element.textContent;
            upperScreen.textContent += input;
            setLowerScreen("0")
        });
    });

    const equal = document.querySelector("[data-type=equal]");
    equal.addEventListener("click", () => {
        if (!upperScreen.textContent || upperScreen.textContent.includes("=")) return;
        upperScreen.textContent += lowerScreen.textContent;
        setLowerScreen(eval(upperScreen.textContent));
        upperScreen.textContent += equal.textContent;
        calculatorStop = true;
    });

    const reverse = document.querySelector("[data-type=reverse]");
    reverse.addEventListener("click", () => {
        if (calculatorStop) return;
        let result = (1 / lowerScreen.textContent) + "";
        setLowerScreen(result.length >= 10 ? result.slice(0, 5) : result);
    });

    const power = document.querySelector("[data-type=power]");
    power.addEventListener("click", () => {
        if (calculatorStop) return;
        setLowerScreen(lowerScreen.textContent ** 2);
    });

    const root = document.querySelector("[data-type=root]");
    root.addEventListener("click", () => {
        if (calculatorStop || +lowerScreen.textContent < 0) return;
        let result = lowerScreen.textContent ** 0.5 + "";
        setLowerScreen(result.length >= 10 ? result.slice(0, 5) : result);
    });
    // Convert percentage to number, eg. 55% -> 0.55 1% -> 0.01
    const percentage = document.querySelector("[data-type=percentage]");
    percentage.addEventListener("click", () => {
        if (calculatorStop || lowerScreen.textContent.length >= 6) return;
        setLowerScreen(lowerScreen.textContent / 100);
    });
    // TODO: Refaktoryzacja kodu
}

init()