$(document).ready(function () {

    let firebaseRef = firebase.database().ref();
    let aTrain;

    function renderTrainSchedule() {

        firebaseRef.child('aTrain').on('value', function (data) {
            aTrain = data.val();
            $('tbody').empty();
            aTrain.forEach(function (value, index) {
                let row = $(`
                <tr>
                    <td><span id="editBtn" data-train="${index}" class="glyphicon glyphicon-edit" aria-hidden="true">edit</span></td>
                    <td>${value.trainName}</td>
                    <td>${value.destination}</td>
                    <td>${value.frequency}</td>
                    <td>00:00pm</td>
                    <td>00:00</td>
                    <td><span id="removeBtn" data-train="${index}" class="glyphicon glyphicon-remove" aria-hidden>remove</span></td>
                </tr>
                `);
                $('tbody').append(row);
            });
        });


    }
    renderTrainSchedule();

    function saveToDatabase() {
        firebaseRef.child('aTrain').set(aTrain);
    }

    $(document).on('click', '#editBtn', function () {
        let index = $(this).attr('data-train');
        aTrain.splice(index, 1);
        saveToDatabase();
    })

    $(document).on('click', '#removeBtn', function () {
        let index = $(this).attr('data-train');
        aTrain.splice(index, 1);
        saveToDatabase();
    })

    $('#submit').click(function (event) {
        event.preventDefault();
        let trainName = $('#trainName').val();
        let destination = $('#destination').val();
        let firstTrainTime = $('#firstTrainTime').val();
        let frequency = $('#frequency').val();

        aTrain.push({
            'trainName': trainName,
            'destination': destination,
            'firstTrainTime': firstTrainTime,
            'frequency': frequency
        });
        saveToDatabase();
    });
});