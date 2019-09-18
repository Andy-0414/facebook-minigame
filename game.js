var cards = [...document.getElementById("game__cardField").children];
var check = [];
var round = 1;
var isStart = false;

function reset() {
	location.reload();
}
function allFlip() {
	cards.forEach(card => {
		card.classList.add("flip");
	});
}
function allHide() {
	cards.forEach(card => {
		card.classList.remove("flip");
	});
}
function shuffleCard() {
	let randomIndex = [...Array(16).keys()];

	for (let i = 0; i < 16; i++) {
		let rand = Math.floor(Math.random() * 16);
		let tmp = randomIndex[i];
		randomIndex[i] = randomIndex[rand];
		randomIndex[rand] = tmp;
	}
	cards.forEach((card, idx) => {
		let randomIndexCard = randomIndex[idx];
		card.style.top = Math.floor(randomIndexCard / 4) * 200 + "px";
		card.style.left = (randomIndexCard % 4) * 200 + "px";
	});
}

function start() {
	if (isStart) return;
	isStart = true;
	allHide();
	for (let i = 1; i <= 3; i++)
		setTimeout(() => {
			shuffleCard();
		}, 1000 * i);
	setTimeout(() => {
		cards.forEach((card, idx) => {
			card.addEventListener("click", e => {
				if (check.length < 2) {
					if (check[0]) if (check[0].idx == idx) return;
					check.push({
						idx,
						status: card.dataset.status
					});

					card.classList.add("flip");
					card.classList.add("highlight");
					if (check.length >= 2) {
						round++;
						if (check[0].status == check[1].status) {
							setTimeout(() => {
								alert("성공!");
								reset();
							}, 1000);
						} else {
							if (round > 2) {
								setTimeout(() => {
									alert("실패!");
									reset();
								}, 1000);
							} else {
								setTimeout(() => {
									check = [];
									allHide();
								}, 1000);
							}
						}
					}
				}
			});
		});
	}, 3000);
}

shuffleCard();
