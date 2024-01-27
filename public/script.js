window.onload = function () {
    alert('インスタのフィルター越しの世界にさようなら。\nここでは宇宙の真実の美しさをお見せします。NASAの地球画像アーカイブへようこそ！');
}


const earthImage = document.getElementById('earthImage');
const selectDate = document.getElementById('selectDate');




document.addEventListener('DOMContentLoaded', function() {
    const selectDate = document.getElementById('selectDate');
    const today = new Date();
    const maxDate = new Date(today);

    maxDate.setDate(today.getDate() - 2); // 現在の日付から2日を引く

    // YYYY-MM-DD形式に変換
    const maxDateString = maxDate.toISOString().split('T')[0];

    selectDate.setAttribute('max', maxDateString);
});


// 画像ローダー要素を作成
const loader = document.createElement('img');
const loadingContainer = document.getElementById('image-display');
const loadingExp = document.createElement('div');
loadingExp.id = 'loader';
loadingExp.textContent = '画像を読み込んでいます...';
loader.id = 'image-loader';
loader.src = 'images/Loding.png';
loader.classList.add('loader');
loadingContainer.appendChild(loadingExp);
loadingContainer.appendChild(loader);
// ローダーを非表示にする関数
function hideLoader() {
    loader.style.display = 'none';
    loadingExp.style.display = 'none';
}

// ローダーを表示する関数
function showLoader() {
    loader.style.display = 'block';
    loadingExp.style.display = 'block';
}


document.getElementById('save-button').addEventListener('click', function() {
    const img = document.getElementById('modal-image');
    const imageUrl = img.src;

    // ダウンロードするためのリンク要素を作成
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'downloaded-image.jpg'; // ダウンロードされるファイルの名前

    // リンクをクリックしてダウンロードを実行
    downloadLink.click();
});

async function epic(earthDate) {
    
    try {
    showLoader();
    const container = document.getElementById('container') || createImageContainer();
    container.innerHTML = '';
    document.getElementById('text').innerHTML = '';
    const epicResponse = await fetch(`/epic/${earthDate}`);
    const res = await epicResponse.json();
    //const imageName = res[3].image;

    if (res.length > 0) {
        res.forEach(imageData => {
        const imageName = imageData.image;
        const formattedDate = transForm(earthDate);
        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/png/${imageName}.png`;
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        container.appendChild(imageElement);

        imageElement.addEventListener('click', () => {
            const modal = document.getElementById('photo-modal');
            modal.style.display = 'block';
            document.getElementById('modal-image').src = imageUrl;
        });
    });
    
    // モーダルウィンドウを閉じる処理
    const modal = document.getElementById('photo-modal');
    const span = document.getElementsByClassName('close')[0];

    span.onclick = function() {
        modal.style.display = "none";
    }

    console.log(res);
    hideLoader();
    }else{
        document.getElementById('text').textContent = '画像はありません';
        showLoader();
    }

    
}catch (error){
    console.error('エラー:'+error);
} /*finally{
    hideLoader();
}*/
}

selectDate.addEventListener('change', function() {
    const earthDate = selectDate.value;
    epic(earthDate);
});

function transForm(earthDate) {
    const parts = earthDate.split('-');
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
}

function createImageContainer () {
    const container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
    return container;
}