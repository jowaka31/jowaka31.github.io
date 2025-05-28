// Simple search functionality
(function() {
    function displaySearchResults(results, store) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;

        if (results.length) {
            let resultList = '';
            for (const n in results) {
                const item = store[results[n].ref];
                resultList += `
                    <article class="post-item">
                        <h3><a href="${item.url}">${item.title}</a></h3>
                        <p>${item.content.substring(0, 150)}...</p>
                        <div class="post-meta">
                            <time datetime="${item.date}">${item.date}</time>
                        </div>
                    </article>
                `;
            }
            searchResults.innerHTML = resultList;
        } else {
            searchResults.innerHTML = '<p>검색 결과가 없습니다.</p>';
        }
    }

    function getQueryVariable(variable) {
        const query = window.location.search.substring(1);
        const vars = query.split('&');

        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    const searchTerm = getQueryVariable('query');

    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);

        const idx = lunr(function () {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('category');
            this.field('content');
            
            for (const key in window.store) {
                this.add({
                    'id': key,
                    'title': window.store[key].title,
                    'category': window.store[key].category,
                    'content': window.store[key].content
                });
            }
        });

        const results = idx.search(searchTerm);
        displaySearchResults(results, window.store);
    }
})(); 