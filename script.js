function setLoadProgress(completed, total, message = 'Loading data...') {
    const container = document.getElementById('load-progress');
    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('progress-text');
    const percentText = document.getElementById('progress-percent');
    if (!container || !bar || !text || !percentText) return;

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    container.hidden = false;
    bar.value = percent;
    text.textContent = message;
    percentText.textContent = `${percent}%`;
}

function hideLoadProgress() {
    const container = document.getElementById('load-progress');
    if (container) container.hidden = true;
}

async function search() {
    const searchInput = document.getElementById('searchInput');
    const resultsElement = document.getElementById('results');
    if (!searchInput || !resultsElement) return;

    const searchTerm = searchInput.value.trim().toLowerCase();
    resultsElement.innerHTML = '';

    if (!searchTerm) {
        resultsElement.innerHTML = '<li style="color:red;text-align:center;">Value empty. Please enter something to search.</li>';
        return;
    }

    try {
        setLoadProgress(0, 100, 'Starting search...');
        const response = await fetch(`search-data.php?q=${encodeURIComponent(searchTerm)}`, {
            cache: 'no-store'
        });
        if (!response.ok || !response.body) throw new Error(`Search failed (${response.status})`);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let matchCount = 0;

        while (true) {
            const { value, done } = await reader.read();
            buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
            const records = buffer.split('\n');
            buffer = records.pop() || '';
            const fragment = document.createDocumentFragment();

            records.forEach(record => {
                if (!record.trim()) return;
                const data = JSON.parse(record);

                if (data.type === 'progress') {
                    setLoadProgress(data.percent, 100, `Searching ${data.file}...`);
                } else if (data.type === 'match') {
                    const item = document.createElement('li');
                    item.textContent = data.line;
                    fragment.appendChild(item);
                    matchCount += 1;
                } else if (data.type === 'limit') {
                    const item = document.createElement('li');
                    item.style.color = '#b45309';
                    item.textContent = data.message;
                    fragment.appendChild(item);
                }
            });

            resultsElement.appendChild(fragment);
            if (done) break;
            await new Promise(requestAnimationFrame);
        }

        setLoadProgress(100, 100, 'Search complete');
        if (matchCount === 0) {
            resultsElement.innerHTML = '<li style="color:red;text-align:center;">DATA NOT FOUND.</li>';
        }
    } catch (error) {
        console.error('Search failed:', error);
        resultsElement.innerHTML = '<li style="color:red;text-align:center;">Could not read data files. Make sure XAMPP Apache is running.</li>';
    } finally {
        setTimeout(hideLoadProgress, 700);
    }
}

async function saveData() {
    await search();
    const resultsElement = document.getElementById('results');
    const searchInput = document.getElementById('searchInput');
    const lines = Array.from(resultsElement.querySelectorAll('li'), item => item.textContent);
    const downloadUrl = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${searchInput.value.trim().toLowerCase() || 'results'}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
}

function showDataFinder() {
    const loginSection = document.getElementById('login-section');
    const finderSection = document.getElementById('data-finder-section');
    if (loginSection) loginSection.style.display = 'none';
    if (finderSection) finderSection.style.display = 'block';
}

function checkPassword() {
    const passwordInput = document.getElementById('password');
    if (passwordInput && passwordInput.value === '143') {
        localStorage.setItem('isLoggedIn', 'true');
        showDataFinder();
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') search();
    });
}

if (localStorage.getItem('isLoggedIn') === 'true') {
    showDataFinder();
    setTimeout(logout, 1800000);
}
