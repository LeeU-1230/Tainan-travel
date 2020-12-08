fetch('https://opengov.tainan.gov.tw/OpenApi/api/service/Get/bb7ba3ff-1974-4400-9a41-2aa803045550').then(
    (res) => {
        return res.json();
    }
).then(
    (result) => {
        console.log(result);
    }
)