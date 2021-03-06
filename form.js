var firebaseConfig = {
    apiKey: "AIzaSyCB2oTfN5t6mRa3pcGUffeojN4Y1_oQBPg",
    authDomain: "corona-web-407a3.firebaseapp.com",
    databaseURL: "https://corona-web-407a3-default-rtdb.firebaseio.com",
    projectId: "corona-web-407a3",
    storageBucket: "corona-web-407a3.appspot.com",
    messagingSenderId: "1028169304159",
    appId: "1:1028169304159:web:56ba6a2c1c5eeb5039b3ea"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var UserInputsRef=firebase.database().ref('UserInputs')
  document.getElementById('testForm').addEventListener('submit',submitForm);
  function submitForm(e){
    e.preventDefault();
    var fname =getInputVal('firstname');
    var lname =getInputVal('lastname');
    var mobile =getInputVal('mobile');
    var state =getInputVal('state');
    state=state.toLowerCase();
    readState(state);
    var email =getInputVal('email');
    var emailstatus=validateEmail();
    var profession =getInputVal('profession');
    var dateofbirth =getInputVal('dateofbirth');
    var symptomsList =getSelectedCheckboxValues('symptoms');
    var selectedOption = document.querySelector('input[name = option]:checked').value;
    if(emailstatus)
    saveMessages(lname+ " " +fname,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList);
}

function readState(state){
    var centers;
    var ref = firebase.database().ref(state);
    ref.on('value', (data) => {
     centers = data.val();
document.getElementById("result").innerHTML ="<br>"+centers.toUpperCase();
})

}
function getInputVal(id){
    return document.getElementById(id).value;
}

function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList){
    var newuserInputsRef = UserInputsRef.push();
    newuserInputsRef.set({
        name:name,
        mobile:mobile,
        email:email,
        profession:profession,
        dateofbirth:dateofbirth,
        selectedOption:selectedOption,
        state:state, 
        symptomsList:symptomsList
    })
    alert("Thank you, find the list of centers nearby!  ");
    function getSelectedCheckboxValues(name) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        let values = [];
        checkboxes.forEach((checkbox) => {
            values.push(checkbox.value);
        });
        return values;
    }
    
    function validateEmail() 
    {
     if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
      {
        return (true)
      }
        alert("You have entered an invalid email address!")
        return (false)
    }
    
    
}