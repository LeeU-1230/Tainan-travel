let date = [];
let area = document.querySelector('.area');
let box = document.querySelector('.box');
let information = document.querySelector('.information');
let page = document.getElementById('page');

fetch('https://opengov.tainan.gov.tw/OpenApi/api/service/Get/603c1369-f692-4fc3-888e-124e9d26c59c').then(
    (res) => {
        return res.json();
    }
).then(
    (result) => {

        data = result.data;
        // console.log(data);
    }
)

area.addEventListener('change', change_area);

function change_area(e) {
    e.preventDefault();
    let area_array = [];
    let str = '';
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i].address.slice(7,9));
        if (data[i].address.slice(7, 9) == e.target.value) {
            area_array.push(data[i]);
        }
    }

    // console.log(area_array);
    // console.log(area_array[0].name);
    let page_size = '';

    if (area_array.length <= 8) {
        page_size = area_array.length;
    } else if (area_array.length > 8) {
        page_size = 8;
    }

    for (let j = 0; j < page_size; j++) {
        str += `<div class='hotel'>
                    <h5>${area_array[j].name}</h5>
                    <a class="open btn btn-info">聯絡資訊 ▼ Open</a>
                    <div class="information active">
                        <span>類別:&ensp;${area_array[j].category}</span>
                        <a class='go btn btn-outline-primary' href="https://www.google.com.tw/maps/place/${area_array[j].address.slice(4,area_array[j].address.lastIndexOf('號')+1)}" target="_blank">前往店家</a>
                        <p>地址:&ensp;${area_array[j].address}</p>
                        <p>tel:&ensp;${area_array[j].fax}</p>
                    </div>
                    <p class='intro'>${area_array[j].introduction}</p>
                    </div>`
    }

    box.innerHTML = str;
    printPage(area_array);

    window.document.body.scrollTop = 300;              
    window.document.documentElement.scrollTop = 300;
}

function printPage(arr) {
    // console.log(arr);
    let page_size = 8;          // 一頁的資料筆數
    let page_total = Math.floor(arr.length / page_size) + 1;    // 區域資料總頁數
    let page_nu = '';      // 顯示的頁碼

    for (let i = 0; i < page_total; i++) {
        page_nu += `<li><a class="num" href="#" data-num='${i + 1}'> ${i + 1} </a></li>`;
    }

    page.innerHTML = page_nu;
    // console.log(page_total);


    page.addEventListener('click', function (e) {
        e.preventDefault();

        window.document.body.scrollTop = 200;              //換頁回頂端
        window.document.documentElement.scrollTop = 200;

        let nowpg = '';  // 當前頁碼
        let minnu = '';  // 當頁最小筆數
        let maxnu = '';  // 當頁最大筆數

        if (e.target.nodeName == 'A') {
            nowpg = e.target.dataset.num;          //當前頁數碼
            minnu = (nowpg * page_size) - page_size;    //當頁最小筆數

            if (arr.length <= 8) {
                maxnu = arr.length;                       //當頁最大筆數
            } else if (arr.length > 8) {
                maxnu = nowpg * page_size - 1;            //當頁最大筆數
            }
        }

        let str = '';
        // console.log(minnu);
        // console.log(maxnu);

        for (let j = minnu; j < arr.length; j++) {
            if (j > maxnu) {
                break;
            } else {
                str += `<div class='hotel'>
                    <h5>${arr[j].name}</h5>
                    <a class="open btn btn-info">聯絡資訊 ▼ Open</a>
                    <div class="information active">
                        <span>類別:&ensp;${arr[j].category}</span>
                        <a class='go btn btn-outline-primary' href="https://www.google.com.tw/maps/place/${arr[j].address.slice(4,arr[j].address.lastIndexOf('號')+1)}" target="_blank">前往店家</a>
                        <p>地址:&ensp;${arr[j].address}</p>
                        <p>tel:&ensp;${arr[j].fax}</p>
                    </div>
                    <p class='intro'>${arr[j].introduction}</p>
                    </div>`
            }
        }
        box.innerHTML = str;
    })

}


box.addEventListener('click', function (e) {
    // console.log(e.target.innerText);
    infor = e.target.parentNode.children[2];
    if (e.target.innerText == '聯絡資訊 ▼ Open') {
        infor.classList.toggle('active');
    }
})