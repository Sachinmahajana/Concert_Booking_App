let rowToUpdate = null;

document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const roomType = document.getElementById('roomType').value;
    let remainingRooms;

    if (roomType === 'Conference Room') {
        remainingRooms = document.getElementById('conference-rooms');
    } else if (roomType === 'Meeting Room') {
        remainingRooms = document.getElementById('meeting-rooms');
    } else if (roomType === 'Board Room') {
        remainingRooms = document.getElementById('board-rooms');
    }

    const currentCount = parseInt(remainingRooms.textContent);
    if (rowToUpdate) {
        // Update existing booking
        const originalRoomType = rowToUpdate.children[4].textContent;
        updateRoomCount(originalRoomType, 1); // Increment original room type count

        rowToUpdate.children[0].textContent = document.getElementById('name').value;
        rowToUpdate.children[1].textContent = document.getElementById('date').value;
        rowToUpdate.children[2].textContent = document.getElementById('startTime').value;
        rowToUpdate.children[3].textContent = document.getElementById('endTime').value;
        rowToUpdate.children[4].textContent = roomType;

        updateRoomCount(roomType, -1); // Decrement new room type count
        rowToUpdate = null;
        alert('Booking details updated successfully.');
    } else {
        // Add new booking
        if (currentCount > 0) {
            remainingRooms.textContent = currentCount - 1;
            alert(`Room booked successfully: ${roomType}`);
        } else {
            alert(`No more ${roomType}s available`);
            return; // Exit the function if no rooms are available
        }

        const bookingRow = document.createElement('tr');
        bookingRow.innerHTML = `
            <td>${document.getElementById('name').value}</td>
            <td>${document.getElementById('date').value}</td>
            <td>${document.getElementById('startTime').value}</td>
            <td>${document.getElementById('endTime').value}</td>
            <td>${roomType}</td>
            <td>
                <button class="btn btn-sm btn-warning update-booking">Update</button>
                <button class="btn btn-sm btn-danger delete-booking">Delete</button>
            </td>
        `;
        document.querySelector('#bookingsTable tbody').appendChild(bookingRow);
        addEventListeners();
    }
    document.getElementById('booking-form').reset();
});

function addEventListeners() {
    const updateButtons = document.querySelectorAll('.update-booking');
    const deleteButtons = document.querySelectorAll('.delete-booking');

    updateButtons.forEach(button => {
        button.addEventListener('click', function() {
            rowToUpdate = this.closest('tr');
            document.getElementById('name').value = rowToUpdate.children[0].textContent;
            document.getElementById('date').value = rowToUpdate.children[1].textContent;
            document.getElementById('startTime').value = rowToUpdate.children[2].textContent;
            document.getElementById('endTime').value = rowToUpdate.children[3].textContent;
            document.getElementById('roomType').value = rowToUpdate.children[4].textContent;
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            updateRoomCount(row.children[4].textContent, 1);
            row.remove();
            alert('Booking deleted successfully.');
        });
    });
}

function updateRoomCount(roomType, increment) {
    let remainingRooms;
    if (roomType === 'Conference Room') {
        remainingRooms = document.getElementById('conference-rooms');
    } else if (roomType === 'Meeting Room') {
        remainingRooms = document.getElementById('meeting-rooms');
    } else if (roomType === 'Board Room') {
        remainingRooms = document.getElementById('board-rooms');
    }
    const currentCount = parseInt(remainingRooms.textContent);
    remainingRooms.textContent = currentCount + increment;
}

addEventListeners();
