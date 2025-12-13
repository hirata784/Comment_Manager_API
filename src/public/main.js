// 変数
const postContent = document.getElementById("js-post-content");
const commentList = document.getElementById("js-comment-list");
const postList = document.getElementById("js-post-list");
const form = document.getElementById("js-form");
const nameTxt = document.getElementById("js-name");
const contentTxt = document.getElementById("js-content");

// イベント
form.addEventListener("submit", addComment);

// 関数
async function loadFirst() {
    // APIからデータを取得
    const postRes = await fetch("/api/posts");
    // JSONに変換
    const postData = await postRes.json();
    // 【投稿内容】
    // 以前の内容をクリア
    postContent.innerHTML = "";
    // 取得した投稿内容をHTMLに追加
    const div = document.createElement("div");
    div.innerHTML = `
        <p class="center">投稿内容を選択してください。</p>
    `;
    // (js-post-content)の中に追加
    postContent.appendChild(div);

    // 【コメント一覧】
    // 以前の内容をクリア
    commentList.innerHTML = "";
    // 取得したコメント内容をHTMLに追加
    const div2 = document.createElement("div");
    div2.innerHTML = `
        <p class="center">投稿内容を選択してください。</p>
    `;
    // (js-comment-list)の中に追加
    commentList.appendChild(div2);

    // 【投稿一覧】
    // 以前の内容をクリア
    postList.innerHTML = "";
    // 取得した投稿一覧をHTMLに追加
    postData.data.forEach((post) => {
        const div3 = document.createElement("div");
        div3.innerHTML = `
        <div>
            <a href="" class="link" data-id="${post.id}">${post.title}</a>
        </div>
    `;
        // (js-comment-list)の中に追加
        postList.appendChild(div3);
    });
}

// 投稿一覧リンクにイベントを付与
postList.addEventListener("click", (e) => {
    if (e.target.classList.contains("link")) {
        e.preventDefault();
        const id = e.target.dataset.id;
        loadPost(id);
    }
});

// 投稿を選択
async function loadPost(id) {
    // APIからデータを取得
    const postRes = await fetch("/api/posts");
    const commentRes = await fetch("/api/posts/" + id + "/comments");
    // JSONに変換
    const postData = await postRes.json();
    const commentData = await commentRes.json();
    // 【投稿内容】
    // 以前の内容をクリア
    postContent.innerHTML = "";
    // 取得した投稿内容をHTMLに追加
    const div = document.createElement("div");
    div.innerHTML = `
        <p><span class="under" id="js-under" data-post="${id}">${postData.data[id - 1].title}</span></p>
        <p>${postData.data[id - 1].content}</p>
    `;
    // (js-post-content)の中に追加
    postContent.appendChild(div);

    // 【コメント一覧】
    // 以前の内容をクリア
    commentList.innerHTML = "";
    // 取得したコメント内容をHTMLに追加
    commentData.data.forEach((comment) => {
        const div2 = document.createElement("div");
        div2.innerHTML = `
        <div class="comment-area">
            <p>${comment.name}</p>
            <p>${comment.content}</p>
            <div class="btn">
                <button class="updateBtn">編集</button>
                <button class="deleteBtn">削除</button>
            </div>
        </div>
    `;
        // (js-comment-list)の中に追加
        commentList.appendChild(div2);
    });

    // 【投稿一覧】
    // 以前の内容をクリア
    postList.innerHTML = "";
    // 取得した投稿一覧をHTMLに追加
    postData.data.forEach((post) => {
        const div3 = document.createElement("div");
        div3.innerHTML = `
        <div>
            <a href="" class="link" data-id="${post.id}">${post.title}</a>
        </div>
    `;
        // (js-comment-list)の中に追加
        postList.appendChild(div3);
    });
}

// コメント追加
async function addComment(e) {
    e.preventDefault(e);

    // 入力値を取得
    const name = nameTxt.value;
    const content = contentTxt.value;
    // 投稿IDを取得
    const element = document.getElementById('js-under');
    const id = element.dataset.post;

    // APIへ送信
    const res = await fetch("api/posts/" + id + "/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, content }),
    })

    // テキストボックス内を空にする
    nameTxt.value = "";
    contentTxt.value = "";

    loadPost(id);
}

// 初期値
loadFirst();