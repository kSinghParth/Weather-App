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
					document.getElementById('weather').innerHTML=weather;
					document.getElementById('temp').innerHTML=temp;
					document.getElementById('wind').innerHTML=wind;
			} ,false);
			xhr.addEventListener('error',function(){
					document.getElementById('weather').innerHTML+="Could Not Complete REquest";
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
		document.getElementById('weather').innerHTML='ERROR CODE :'+error.code+'<br />'+error.message;
	}
}