// 変数
const postContent = document.getElementById("js-post-content");
const commentList = document.getElementById("js-comment-list");
const postList = document.getElementById("js-post-list");
const form = document.getElementById("js-form");
const nameTxt = document.getElementById("js-name");
const contentTxt = document.getElementById("js-content");
const searchTxt = document.getElementById("js-search-txt");
const searchBtn = document.getElementById("js-search-btn");
const errorSearch = document.getElementById("js-error-search");
const errorName = document.getElementById("js-error-name");
const errorContent = document.getElementById("js-error-content");
// true：エラーあり false：エラーなし
let nameErrorReturn = false;
let contentErrorReturn = false;

// イベント
form.addEventListener("submit", addComment);
searchBtn.addEventListener("click", searchId);

// 投稿一覧リンクにイベントを付与
postList.addEventListener("click", (e) => {
    if (e.target.classList.contains("link")) {
        e.preventDefault();
        const id = e.target.dataset.id;
        loadPost(id);
    }
});

// コメント一覧の親要素にイベント付与
commentList.addEventListener("click", (e) => {
    // コメント一覧（#js-comment-list）内に編集ボタン（.updateReady）が含まれていれば実行
    if (e.target.classList.contains("updateReady")) {
        e.preventDefault();
        // 押されたボタンのdata属性を取得
        const postId = e.target.dataset.post;
        const row = e.target.dataset.row;
        // 編集関数を実行
        updateReady(postId, row);
    }

    // コメント一覧（#js-comment-list）内に保存ボタン（.updateBtn）が含まれていれば実行
    if (e.target.classList.contains("updateBtn")) {
        e.preventDefault();
        // 押されたボタンのdata属性を取得
        const id = e.target.dataset.id;
        const postId = e.target.dataset.post;
        // 保存関数を実行
        commentUpdate(id, postId);
    }

    // コメント一覧（#js-comment-list）内に取消ボタン（.cancelBtn）が含まれていれば実行
    if (e.target.classList.contains("cancelBtn")) {
        e.preventDefault();
        // 押されたボタンのdata属性を取得
        const postId = e.target.dataset.post;
        // 取消関数を実行
        loadPost(postId);
    }

    // コメント一覧（#js-comment-list）内に削除ボタン（.deleteBtn）が含まれていれば実行
    if (e.target.classList.contains("deleteBtn")) {
        e.preventDefault();
        // 押されたボタンのdata属性を取得
        const id = e.target.dataset.id;
        const postId = e.target.dataset.post;
        // 削除関数を実行
        deleteComment(id, postId);
    }
});

// 関数
async function loadFirst() {
    // APIからデータを取得
    const listRes = await fetch("/api/posts");
    // JSONに変換
    const listData = await listRes.json();
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
    listData.data.forEach((post) => {
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

// 投稿ID検索
async function searchId() {
    // 入力値を数値に変換して取得
    const id = parseInt(searchTxt.value);
    // バリデーションエラーチェック
    // 数値未入力エラー
    if (Number.isInteger(id)) {
        errorSearch.innerText = "";
        searchTxt.value = "";
        // 投稿選択関数を実行
        loadPost(id);
    } else {
        errorSearch.innerText = "数値を入力してください。";
        errorSearch.style.color = "red";
        return;
    }
}

// 投稿を選択
async function loadPost(id) {
    // APIからデータを取得
    const postRes = await fetch("/api/posts/" + id);
    const commentRes = await fetch("/api/posts/" + id + "/comments");
    const listRes = await fetch("/api/posts");
    // JSONに変換
    const postData = await postRes.json();
    const commentData = await commentRes.json();
    const listData = await listRes.json();

    // 【投稿内容】
    // 以前の内容をクリア
    postContent.innerHTML = "";
    // 取得した投稿内容をHTMLに追加
    const div = document.createElement("div");
    div.innerHTML = `
        <p><span class="under" id="js-under" data-post="${id}">${postData.data.title}</span></p>
        <p>${postData.data.content}</p>
    `;
    // (js-post-content)の中に追加
    postContent.appendChild(div);

    // 【コメント一覧】
    // 以前の内容をクリア
    commentList.innerHTML = "";
    // 取得したコメント内容をHTMLに追加
    commentData.data.forEach((comment, index) => {
        const div2 = document.createElement("div");
        div2.innerHTML = `
        <div class="comment-area">
            <p>${comment.name}</p>
            <p>${comment.content}</p>
            <div class="btn">
                <button class="updateReady" data-post="${comment.post_id}" data-row="${index}">編集</button>
                <button class="deleteBtn" data-id="${comment.id}" data-post="${comment.post_id}">削除</button>
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
    listData.data.forEach((post) => {
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

    // バリデーションエラーチェック
    // 名前未入力エラー
    if (name.length <= 0) {
        errorName.innerHTML = "名前を入力してください";
        errorName.style.color = "red";
        nameErrorReturn = true;
    } else {
        errorName.innerHTML = "";
        nameErrorReturn = false;
    }
    // コメント未入力エラー
    if (content.length <= 0) {
        errorContent.innerHTML = "コメントを入力してください";
        errorContent.style.color = "red";
        contentErrorReturn = true;
    } else {
        errorContent.innerHTML = "";
        contentErrorReturn = false;
    }

    // エラーが発生した場合、処理を中止する
    if (nameErrorReturn == true || contentErrorReturn == true) {
        return;
    } else {
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
        // 現在表示中の投稿を再読み込み
        loadPost(id);
    }
}

// コメント保存
async function commentUpdate(id, postId) {
    // 投稿内容を取得
    const contentTxt = document.getElementById('js-comTxt');
    content = contentTxt.value;
    console.log(content);

    // APIへ送信
    const res = await fetch("api/comments/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
    })
    // 現在表示中の投稿を再読み込み
    loadPost(postId);
}

// コメント編集
async function updateReady(id, row) {
    // APIからデータを取得
    const commentRes = await fetch("/api/posts/" + id + "/comments");
    // JSONに変換
    const commentData = await commentRes.json();

    // 【コメント一覧】
    // 以前の内容をクリア
    commentList.innerHTML = "";
    // 取得したコメント内容をHTMLに追加
    commentData.data.forEach((comment, index) => {
        const div = document.createElement("div");
        if (index == row) {
            // 編集ボタンを押下した行はボタン表記を変更。コメントエリアを編集可能にする。
            div.innerHTML = `
        <div class="comment-area">
            <p>${comment.name}</p>
            <input type="text" id="js-comTxt" class="comTxt" value="${comment.content}">
            <div class="btn">
                <button class="updateBtn" data-id="${comment.id}" data-post="${comment.post_id}">保存</button>
                <button class="cancelBtn" data-post="${comment.post_id}">取消</button>
            </div>
        </div>
    `;
        } else {
            // 他はボタンを非表示
            div.innerHTML = `
        <div class="comment-area">
            <p>${comment.name}</p>
            <p>${comment.content}</p>
        </div>
    `;
        }
        // (js-comment-list)の中に追加
        commentList.appendChild(div);
    });
    // 編集ボタンを押下したコメントエリアのみ背景をピンクに変更
    const commentArea = document.getElementsByClassName("comment-area");
    commentArea[row].style.background = "pink";
}

// コメント削除
async function deleteComment(id, postId) {
    // APIからデータを取得
    const res = await fetch("api/comments/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    // 現在表示中の投稿を再読み込み
    loadPost(postId);
}

// 初期値
loadFirst();