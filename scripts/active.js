let group = document.getElementById('group');
let sort_list = [];
let active_list = [];

fetch('https://opengov.tainan.gov.tw/OpenApi/api/service/Get/7aa8a71c-95ab-49e8-8d22-b795c2e03b52').then(
    (res) => {
        return res.json();
    }
).then(
    (result) => {

        // data = result.data;
        // console.log(result.data.class_list);

        for (let i = 0; i < result.data.class_list.length; i++) {
            sort_list.push(result.data.class_list[i].class_name);
            active_list.push(result.data.class_list[i]);
        }

        // console.log(sort_list);
        // console.log(active_list);
        // print_btn(sort_list);
    }
)


function print() {

}
let sorts = document.getElementsByClassName('sort');
let actives = document.getElementsByClassName('active');

for (let i = 0; i < sorts.length; i++) {
    sorts[i].addEventListener('click', function (e) {

        actives[i].classList.toggle('show');

        let str = '';
        let lists;
        let value = e.target.innerText.slice(0, 2);

        if (value == active_list[i].class_name) {
            lists = active_list[i].data_list;

            for (let j = 0; j < lists.length; j++) {
                str += `
            <div class = 'inbox'>
            <div class="title">${lists[j].title.slice(1)}</div>
            <div class="information">
                <p class="url"><a
                    href='${lists[j].url}'>活動介紹</a>
                </p>
                <p class="day">活動時間&ensp;｜&ensp;${lists[j].cbdate} ~ ${lists[j].cedate}</p>
                <p class="place">活動地點&ensp;｜&ensp;${lists[j].place.place_name}</p>
            </div>
            </div>
            `;
            }
        }
        actives[i].innerHTML = str;
    })


}