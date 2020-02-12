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

	nBRevealed(){
		let nb = 0;x
		for (var i = 0; i < this.carte.length; i++) {
			if(this.carte[i].revealed){
				nb++;
			}
		}
		return nb;
	}

	action(img){
		
	}
}