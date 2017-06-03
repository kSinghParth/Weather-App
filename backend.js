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
	document.getElementById("check").innerHTML='Try Again';

}
function getAddress (latitude, longitude) {
    
        var request = new XMLHttpRequest();
        request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCXxPnGXsaV9Qjpte5LYE4H0SDFVMQOjSQ', true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0].address_components[3].long_name;
                    document.getElementById('add').innerHTML=address;
                }
                
            }
        };
        request.send();
    
}