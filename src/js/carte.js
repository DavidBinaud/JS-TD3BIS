class Carte{
	constructor(srt,src){
		this.sprite = document.getElementById("image_" + srt);
		this.src = "img/" + src + ".png";
		this.revealed = false;
		this.found = true;
		this.sprite.onclick = function(){
			mem.action(this);
		}
	}

	reveal(){
		this.revealed = true;
		this.sprite.src = this.src;
	}

	hide(){
		this.revealed = false;
		this.sprite.src = "img/dos.jpg";
	}
}