module.exports.function = function findLocation (myPos) {
  const console = require('console')
  var http = require('http')
  var config = require('config')

  var responseResults = [];
  var query = 'https://dapi.kakao.com/v2/local/search'
            + "/keyword?query=약국" + "&x=" + myPos.longitude + "&y=" + myPos.latitude 
            + "&category_group_code=PM9"
            + "&sort=distance";
  var options = {
    headers: {
      'Authorization': secret.get('serviceKey'),
      'accept': 'application/json'
    },
  };
  var response = http.getUrl(encodeURI(query) , options);
  var obj = JSON.parse(response);

  if (obj.meta != undefined ) {
    obj.documents.forEach(function(item) {
      responseResults.push({
        name: item.place_name,
        distance: item.distance,
        phonenumber: item.phone
      })
    });
  }
  return responseResults;
}
