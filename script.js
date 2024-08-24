document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventLocation = document.getElementById('eventLocation').value;

    // Validation and SweetAlert popup
    if (eventName && eventDate && eventTime && eventLocation) {
        Swal.fire({
            icon: 'success',
            title: 'Event Created!',
            text: `Your event "${eventName}" has been successfully created.`,
            showConfirmButton: false,
            timer: 2000
        });

        const eventList = document.getElementById('eventList');

        // Create a unique ID for each event
        const eventId = `event-${new Date().getTime()}`;

        // Create the event card
        const eventCard = document.createElement('div');
        eventCard.classList.add('col-md-4');
        eventCard.setAttribute('id', eventId);
        eventCard.innerHTML = `
            <div class="card event-card" style="border-radius: 10px;">
                <div class="card-body" style="background-color: bisque;">
                    <h4 class="card-title mb-3">${eventName}</h4>
                    <p class="mb-3"><strong>Date:</strong> ${eventDate}</p>
                    <p class="mb-3"><strong>Time:</strong> ${eventTime}</p>
                    <p class="mb-3"><strong>Location:</strong> ${eventLocation}</p>
                    <button style="float: right;" class="btn  button-89 delete-btn" data-event-id="${eventId}"><i class="fa-solid fa-trash-can-arrow-up"></i></button>
                </div>
            </div>
        `;

        eventList.appendChild(eventCard);

        // Add event listener to the delete button
        const deleteBtn = eventCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            
            // SweetAlert for deletion confirmation
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Remove the event card from the DOM
                    document.getElementById(eventId).remove();
                    
                    // Show success message
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your event has been deleted.",
                        icon: "success"
                    });
                }
            });
        });

        // Clear the form
        document.getElementById('eventForm').reset();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill out all fields!',
        });
    }
});