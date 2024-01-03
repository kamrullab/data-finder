async function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const resultsElement = document.getElementById('results');

    // Clear previous results
    resultsElement.innerHTML = '';

    if (searchInput.trim() === '') {
        // Display a message if search input is empty
        resultsElement.innerHTML = '<li style="color: red;"><center>Value Empty. Please search Anything...</center></li>';
        return;
    }

    const folderName = 'DATA%20FILE';

    try {
        const fileList = await getFilesInFolder(folderName);
        const filePromises = fileList.map(fileName => getFileContent(`${folderName}/${fileName}`));

        const fileContents = await Promise.all(filePromises);

        let foundResults = false;

        fileContents.forEach((content, index) => {
            const matchingLines = findMatchingLines(content, searchInput);

            matchingLines.forEach((line, i) => {
                foundResults = true;
                const listItem = document.createElement('li');
                listItem.textContent = line;
                resultsElement.appendChild(listItem);
            });
        });

        if (!foundResults) {
            // Display a message if no results are found
            resultsElement.innerHTML = '<li style="color: red;"><center>DATA NOT FOUND.</center></li>';
        }
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}


async function getFilesInFolder(folderName) {
    // Implement the logic to fetch the list of files in the folder
    // You can use Fetch API, FileReader, or any other suitable method
    // Example using Fetch API:
    const response = await fetch(`${folderName}/`);
    const htmlContent = await response.text();

    // Parse the HTML content to extract file names.
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const links = doc.querySelectorAll('a');

    const fileList = Array.from(links)
        .filter(link => link.href.endsWith('.txt'))
        .map(link => link.textContent.trim());

    return fileList;
}

async function getFileContent(fileName) {
    // Implement the logic to fetch file content here
    // You can use Fetch API, FileReader, or any other suitable method
    // Example using Fetch API:
    const response = await fetch(fileName);
    const content = await response.text();
    return content;
}

function findMatchingLines(content, searchInput) {
    // Implement the logic to find matching lines in the file content
    // You can use regular expressions or any other suitable method
    // Example using regular expressions:
    const regex = new RegExp(searchInput, 'gi');
    return content.split('\n').filter(line => line.match(regex));
}


        async function getFileContent(fileName) {
            const response = await fetch(fileName);
            const reader = response.body.getReader();
            let result = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                result += new TextDecoder().decode(value);
            }
            return result;
        }

        function findMatchingLines(str, searchTerm) {
            const lines = str.split('\n');
            return lines.filter(line => line.toLowerCase().includes(searchTerm));
        }

        document.getElementById('searchInput').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                search();
            }
        });

        async function saveData() {
    // Call the search function to fetch data automatically
    await search();

    const resultsElement = document.getElementById('results');
    const searchInputValue = document.getElementById('searchInput').value.toLowerCase();
    const lines = Array.from(resultsElement.getElementsByTagName('li')).map(li => li.textContent);
    const contentToSave = lines.join('\n');

    // Create a Blob with the data
    const blob = new Blob([contentToSave], { type: 'text/plain' });

    // Create an anchor element and set attributes for downloading
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = `${searchInputValue}.txt`;

    // Append the anchor to the body and simulate a click
    document.body.appendChild(a);
    a.click();

    // Remove the anchor from the body
    document.body.removeChild(a);
}
   




















































































































































































































































































































































































function login() {
    const enteredPassword = document.getElementById('password').value;
    const correctPassword = '000'; // Replace with your actual password

    if (enteredPassword === correctPassword) {
        // Password is correct, redirect to SPECIFIC DATA FINDER page
        window.location.href = 'data.html';
    } else {
        // Password is incorrect
        alert('Incorrect password. Please try again.');
        // Redirect to the specified URL
        window.location.href = 'https://m.me/elitekamrul';
    }
}










































































































































































































































































































































































































































































































































































































var isLoggedIn = localStorage.getItem('isLoggedIn');

if (isLoggedIn === 'true') {
    // User is logged in, show the data finder section
    document.getElementById("login-section").style.display = "none";
    document.getElementById("data-finder-section").style.display = "block";

    // Set a timer for automatic logout after 30 minutes (1800000 milliseconds)
    var logoutTimer = setTimeout(logout, 1800000);
}

function checkPassword() {
    var password = document.getElementById("password").value;

    if (password === "143") {
        // Save the login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Show the data finder section and hide the login section
        document.getElementById("login-section").style.display = "none";
        document.getElementById("data-finder-section").style.display = "block";

        // Reset the timer for automatic logout
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(logout, 1800000); // Reset the timer for another 30 minutes
    } else {
        alert('Incorrect password. Please try again.');
        window.location.href = 'https://m.me/elitekamrul';
    }
}

function logout() {
    // Clear the login state and redirect to login page
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}







