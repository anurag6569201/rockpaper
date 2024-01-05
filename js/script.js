const game = document.querySelector('.game'),
    cpuimage = document.querySelector('.hand1 img'),
    userimage = document.querySelector('.hand2 img'),
    result = document.querySelector('.result h1'),
    optionhand = document.querySelectorAll('.user-image div'),
    chadscore=document.querySelector(".score-chad"),
    youscore=document.querySelector(".score-you");

optionhand.forEach((image, index) => {
    image.addEventListener('click', (e) => {
        
        image.classList.add("active");

        optionhand.forEach((imageN, indexN) => {
            if (image != imageN) {
                imageN.classList.remove("active");
            }
        })
        result.textContent = "Wait..."
        game.classList.add("start");

        let cpuhand = ["images/stone.png", "images/paper.png", "images/scissors.png"];
        let currentIndex = 0;

        let intervalId = setInterval(() => {
            cpuimage.src = cpuhand[currentIndex];
            currentIndex = (currentIndex + 1) % cpuhand.length;
        }, 100);

        setTimeout(() => {
            clearInterval(intervalId);
        }, 2500);
        image.style.opacity="1";
        let time = setTimeout(() => {
            image.style.opacity=".6";
            e.target.style.opacity="1";
            
            game.classList.remove("start");
            let opthand = e.target.src;
            userimage.src = opthand;

            let randomnum = Math.floor(Math.random() * 3);
            let cpuhand = ["images/stone.png", "images/paper.png", "images/scissors.png"];

            cpuimage.src = cpuhand[randomnum];
            let cpuvalue = ['r', 'p', 's'][randomnum];
            let uservalue = ['p', 'r', 's'][index];

            let outcome = {
                pp: "Draw",
                pr: "cpu",
                ps: "user",
                rp: "user",
                rr: "Draw",
                rs: "cpu",
                sp: "cpu",
                sr: "user",
                ss: "Draw",
            }
            let outcomevalue = outcome[cpuvalue + uservalue];
            result.textContent = uservalue === cpuvalue ? "Match Draw 😁" : `${outcomevalue} Won 😎!!`;
        }, 2500);
    });
});
