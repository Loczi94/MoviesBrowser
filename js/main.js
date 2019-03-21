
const form = document.querySelector('#searchForm');
const title = document.querySelector('#title');
const category = document.querySelector('#category');
const year = document.querySelector('#year');
const submit = document.querySelector('#submit');
const resultsDiv = document.querySelector('.results');

function printData(response) {
    if (response['Response']==='False') {
        alert(response['Error']);
    } else {
        let newRow;
        for (let i=0; i<response['Search'].length; i++) {
            if (i%2 === 0) {
                newRow = document.createElement('div');
                newRow.classList.add('row');
                resultsDiv.appendChild(newRow);
            }
            let info = response['Search'][i];

            const posterDiv = document.createElement('div');
            posterDiv.classList.add('poster');
            if (i%2 === 1) {
                posterDiv.classList.add('offset-lg-0');             
            }
            posterDiv.classList.add('offset-md-1');
            posterDiv.classList.add('col-md-5');
            posterDiv.classList.add('col-lg-3');
            posterDiv.classList.add('text-center');
            let poster = document.createElement('img');
            if (info['Poster']!='N/A') {
                poster.setAttribute('src', info['Poster']);
            } else {
                poster.setAttribute('src', 'img/poster.png');
            }

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('info');
            infoDiv.classList.add('col-md-5');
            infoDiv.classList.add('col-lg-2');
            let h2 = document.createElement('h2');
            h2.innerText = info['Title'];
            let category = document.createElement('strong');
            category.innerText = 'Category: ';
            let catParagraph = document.createElement('p');
            catParagraph.innerText = info['Type'];
            let br = document.createElement('br');
            let year = document.createElement('strong');
            year.innerText = 'Year: ';
            let catYear = document.createElement('p');
            catYear.innerText = info['Year'];

            posterDiv.appendChild(poster);
            infoDiv.appendChild(h2);
            infoDiv.appendChild(category);
            infoDiv.appendChild(catParagraph);
            infoDiv.appendChild(br);
            infoDiv.appendChild(year);
            infoDiv.appendChild(catYear);
            newRow.appendChild(posterDiv);
            newRow.appendChild(infoDiv);
        }
    }
}

function deletePreviousData() {
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
    }
}

function getDataFromAPI() {
    let url = 'https://www.omdbapi.com/?apikey=d925505&s=';
    url += title.value;
    if (category.value) {
        url += '&type=' + category.value;
    }
    if (year.value) {
        url += '&y=' + year.value;
    }
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            printData(xhr.response);
        }
    }

    xhr.open('GET', url);
    xhr.send();
}

form.addEventListener('submit', function(event)
{
    event.preventDefault();
    deletePreviousData();
    getDataFromAPI();
})