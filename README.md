Docker image here: 
https://hub.docker.com/r/shanenielsen123/csehub/


```javascript
{firebase.auth().onAuthStateChanged( user => {
    if (user) {
        var userId = firebase.auth().currentUser.uid;
        var getData = firebase.database().ref('/users/' + userId);

        getData.once('value', function (snapshot) {

            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                console.log(childData.course);
            })
     });}
     
     ```
