function yolo(){

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPosition,showError);
	}
	else{
		alert('Geolocation Not Supported by the Browser');
		document.getElementById('weather').innerHTML+="<br/> Geolocation Not Supported by the Browser";
	}
	function showPosition(position){
		var lat=position.coords.latitude;
		var lon=position.coords.longitude;
		if(window.XMLHttpRequest){

			var xhr=new XMLHttpRequest();
			xhr.addEventListener('load',function(){
				
					var response=JSON.parse(xhr.responseText);
					var temp=response.currently.temperature;
					var weather=response.currently.summary;
					var wind=response.currently.windSpeed;
					getAddress(lat, lon);
					document.getElementById('weather').innerHTML=weather;
					document.getElementById('temp').innerHTML=Math.round(temp*10)/10;
					document.getElementById('wind').innerHTML=wind;
					ldbkg(lat,lon,weather);
			} ,false);
			xhr.addEventListener('error',function(err){
					document.getElementById('weather').innerHTML+="Could Not Complete Request"+xhr.readyState+" "+xhr.status;
			} ,false);

			xhr.open('GET','https://api.darksky.net/forecast/9a9ae7dc3fae15ff0f44ef95f0c70d00/'+lat+','+lon,true);
			xhr.send();
		}
		else{
			alert('Unable to fetch the weather');
			document.getElementById('weather').innerHTML+="<br/> Unable to fetch the weather";
		}
	}
	function showError(error){
		document.getElementById('weather').innerHTML='ERROR CODE :'+error.code+error.message;
	}
	document.getElementById("check").innerHTML='Try Again';
	document.getElementById('contain').style.display='block';

}
function getAddress (latitude, longitude) {
    
        var request = new XMLHttpRequest();
        request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCXxPnGXsaV9Qjpte5LYE4H0SDFVMQOjSQ', true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0].address_components[4].long_name+', '+data.results[0].address_components[5].short_name+', '+data.results[0].address_components[6].short_name;
                    document.getElementById('add').innerHTML=address;
                }
                
            }
        };
        request.send();
    
}

function convert(){
	var ele=document.getElementById('change'); 
	var temp=document.getElementById('temp').innerHTML;

	if (ele.value=='f') {
			document.getElementById('temp').innerHTML=Math.round((temp - 32) * 5 / 9*10)/10;
			document.getElementById('units').innerHTML='&#8451';
			document.getElementById('change').value='c';
			document.getElementById('change').innerHTML='&#8457';
	}
	else
	{
		document.getElementById('temp').innerHTML=Math.round(((temp  * 9 / 5)+32)*10)/10;
			document.getElementById('units').innerHTML='&#8457';
			document.getElementById('change').value='f';
			document.getElementById('change').innerHTML='&#8451';
	}
}
function ldbkg(lat,lon,weather){
	if (window.XMLHttpRequest) {
			var xhr=new XMLHttpRequest();
			xhr.open('GET','https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2ed4f670f5b13fd9ae8590157b50e74b&lat='+lat+'&lon='+lon+'&accuracy=6&tags='+weather+'&sort=relevance&extras=url_l&format=json&nojsoncallback=1',true);
			
			xhr.addEventListener('load',function(){
						var response=JSON.parse(xhr.responseText);	
						if (response.photos.pages>0) {
						document.querySelector("body").style.backgroundImage="url('" + response.photos.photo[0].url_l + "')";
						}
				},false);
			
			xhr.send();
		}
}

