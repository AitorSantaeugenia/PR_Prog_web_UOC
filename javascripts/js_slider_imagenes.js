/* Slider imágenes
*/
var slideImagenes=new Array()
var slideLinks=new Array()

function slideshowImagenes(){
	for (i=0;i<slideshowImagenes.arguments.length;i++){
		slideImagenes[i]=new Image()
		slideImagenes[i].src=slideshowImagenes.arguments[i]
	}
}

function slideshowLinks(){
	for (i=0;i<slideshowLinks.arguments.length;i++)
		slideLinks[i]=slideshowLinks.arguments[i]
}

function gotoshow(){
if (!window.winslide||winslide.closed)
	winslide=window.open(slideLinks[queLink])
else
	winslide.location=slideLinks[queLink]
	winslide.focus()
}