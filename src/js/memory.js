class Memory{
	constructor(){
		this.coups = 0;
		this.carte = new Array();
		for (var i = 0; i < 8; i++) {
			this.carte.push(new Carte(i+1,i));
			this.carte.push(new Carte(16-i,i));
		}
		this.shuffle();
	}

	revealAll(){
		for (let i = 0; i < this.carte.length; i++) {
			this.carte[i].reveal();
		}
	}

	hideAll(){
		for (let i = 0; i < this.carte.length; i++) {
			this.carte[i].hide();
		}
	}

	shuffle(){
		this.carte.sort(() => Math.random() - 0.5);
		for (let i = 0; i < 4; i++) {
			let div = document.getElementById("ligne"+(i+1));
			div.innerHTML = null;

			for (let j = 1; j < 5; j++) {
				div.appendChild(this.carte[(i*4)+j-1].sprite);
			}
		}
	}

	hasWon(){
		for (var i = 0; i < this.carte.length; i++) {
			if(this.carte[i].found === false){
				return false
			}
		}
		return true;
	}

	nBRevealedNotFound(){
		let nb = 0;
		for (var i = 0; i < this.carte.length; i++) {
			if(this.carte[i].revealed && !this.carte[i].found){
				nb++;
			}
		}
		return nb;
	}

	hideOrReveal(img){
		let carte = null;

		for (var i = 0; i < this.carte.length; i++) {
			if(this.carte[i].sprite.id.slice(6) === img.id.slice(6)){
				carte = this.carte[i];
			}
		}

		if (!carte.revealed) {
			if (this.nBRevealedNotFound() < 2) {
				carte.reverse();
			}else{
				this.hideRevealedCards();
			}

			if (this.nBRevealedNotFound() == 2) {
				let cartesRevelee = this.getRevealedCardNotFound();
				if (cartesRevelee[0].id === cartesRevelee[1].id){
					cartesRevelee[0].found = true;
					cartesRevelee[1].found = true;

					cartesRevelee[0].sprite.onclick = null;
					cartesRevelee[1].sprite.onclick = null;
				}else{
					const sleep = milliseconds => { 
            				return new Promise(resolve => setTimeout(resolve, milliseconds)); 
        			};
        			sleep(1000).then(() => {this.hideRevealedCards();});
				}
			}
		}


		if(this.hasWon()){
			this.endGame();
			document.getElementById("affichage").innerHTML = "Gagné !!!";
		}
	}


	getRevealedCardNotFound(){
		let cartesRevelee = new Array();
		for (var i = 0; i < this.carte.length; i++) {
			if(this.carte[i].revealed && !this.carte[i].found){
				cartesRevelee.push(this.carte[i]);
			}
		}
		return cartesRevelee;
	}

	hideRevealedCards(){
		for (var i = 0; i < this.carte.length; i++) {
			if(!this.carte[i].found){
				this.carte[i].hide();
			}
		}
	}

	endGame(){
		for (var i = 0; i < this.carte.length; i++) {
			this.carte[i].sprite.onclick = null;
		}
	}

}