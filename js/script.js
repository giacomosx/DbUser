let filter = 'name';
let allUsers = [];
window.onload = async () => {
    const endpoint = `https://jsonplaceholder.typicode.com/users/`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        popolateTable(data);
        allUsers = data;
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

const popolateTable = (users) => { 
    const table = document.querySelector('table');
    table.innerHTML = '';
    const tbody = document.createElement('tbody');
    const thead = document.createElement('thead');
    thead.innerHTML = /* HTML */ `
        <tr>
            <th scope="col">#id</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
        </tr>`;
    
    users.map(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <th scope="row">${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
        `;
        tbody.append(tr);
    })
    table.append(thead, tbody);
}

document.querySelector('select').addEventListener('change', (e) => {
    filter = e.target.value;
})

document.querySelector('input').addEventListener('input', () => {
    const inputValue = document.querySelector('input').value.trim();
    const alertContainer = document.querySelector('.results-not-found');
    let data;
    
    if (inputValue.length >= 3) {
        data = allUsers.filter(user => user[filter].toLowerCase().includes(inputValue.toLowerCase()));
        if (data.length === 0) {
            document.querySelector('table').innerHTML = '';

            alertContainer.classList.remove('d-none');
            alertContainer.innerHTML = /* HTML */ `
                <div class="alert alert-danger" role="alert">
                    <p class="m-0">No results found</p>
                </div>`;
            return;

        } else popolateTable(data);
    } else{
        alertContainer.classList.add('d-none');
        popolateTable(allUsers);
    }
})
