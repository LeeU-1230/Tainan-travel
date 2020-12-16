let data = [];
let area = document.querySelector('.area');
let lists = document.querySelector('.lists');
let map = document.getElementById('map');

fetch('https://opengov.tainan.gov.tw/OpenApi/api/service/Get/bb7ba3ff-1974-4400-9a41-2aa803045550')
    .then((res) => {
        return res.json();
    })
    .then(
        (result) => {
            data = result.data;
        }
    )

area.addEventListener("change", changeArea, false);           // 景點選擇切換

function changeArea(e) {
    e.preventDefault();
    lists.style.display = 'inline-block';

    let value = e.target.value;
    Print(value);
    
    window.document.body.scrollTop = 800;              
    window.document.documentElement.scrollTop = 800;
}

function Print(value) {
    let list_str = '';

    for (let i = 0; i < data.length; i++) {
        if (data[i].district == value) {
            // area_data.push(data[i]);
            if (data[i].open_time == '') {
                list_str += `<li>
                <div class='visit'>
                <h5>${data[i].name}</h5>
                <p>開放時間</p>
                <p>目前無資訊</p>
                </div>
        
                <a class="open btn btn-primary" data-lat='${data[i].lat}' data-long='${data[i].long}'>景點資訊 ▼ Open</a>
               
                <div class='nav active'>
                    <p><i class="fa fa-map-marker" aria-hidden="true"></i>&ensp;地址
                    <a  class="go btn btn-outline-success" href="https://www.google.com.tw/maps/place/${data[i].address.slice(4)}" target="_blank">前往</a>
                    </p>
                    <p class='address'>${data[i].address}</p>
                    <p><i class="fa fa-phone" aria-hidden="true"></i>&ensp;電話</p>
                    <p  class='tel'>${data[i].tel}</p>
                    <p class='intro'>${data[i].introduction}</p>
                </div>
                </li>`;

            } else {
                list_str += `<li>
                    <div class='visit'>
                    <h5>${data[i].name}</h5>
                    <p>開放時間</p>
                    <p>${data[i].open_time}</p>
                    </div>

                    <a class="open btn btn-primary" data-lat='${data[i].lat}' data-long='${data[i].long}'>景點資訊 ▼ Open</a>

                    <div class='nav active'>
                    <p><i class="fa fa-map-marker" aria-hidden="true"></i>&ensp;地址
                    <a  class="go btn btn-outline-success" href="https://www.google.com.tw/maps/place/${data[i].address.slice(4)}" target="_blank">前往</a>
                    </p>
                    <p class='address'>&ensp;${data[i].address}</p>
                    <p><i class="fa fa-phone" aria-hidden="true"></i>&ensp;電話</p>
                    <p  class='tel'>${data[i].tel}</p>
                    <p class='intro'>${data[i].introduction}</p>
                    </div>
                    </li>`;
            }
        }

    }
    lists.innerHTML = list_str;
}


lists.addEventListener('click', function (e) {

    if (e.target.innerText == '景點資訊 ▼ Open') {
        let name = e.target.parentNode.children[0].children[0].innerText;         // 取得地名
        let nav = e.target.parentNode.children[2];                                // 取得詳細資訊區塊
        let addr = [e.target.dataset.lat, e.target.dataset.long];                 // 取得座標

        nav.classList.toggle('active');                                           // 切換詳細資訊區塊

        L.marker(addr).addTo(get_map)                                             // 定位此景點座標
            .bindPopup(`${name}`)
            .openPopup();
    }

})

let hot = document.querySelector('.hot');

hot.addEventListener('click', function (e) {
    e.preventDefault();

    lists.style.display = 'inline-block';
    let value = e.target.value;
    Print(value);

    window.document.body.scrollTop = 800;              
    window.document.documentElement.scrollTop = 800;
})