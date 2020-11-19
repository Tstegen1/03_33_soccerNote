'use strict';
{
  //11月→要注意プログラミングでは0からスタートのため11月を作りたかったら10にしておく

  const today = new Date(); //今日のオブジェクトを保持する
  let year = today.getFullYear(); //今日から今年を取得
  let month = today.getMonth(); //今日から今月を取得

  let Month = today.getMonth() + 1;



  //前月分の日数を取得する 例）26日、27日、28日、29日、30日..
  function backMonthDate() {
    const dates = [];
    const endDate = new Date(year, month, 0).getDate(); //前月の末日を取得
    const remainingDay = new Date(year, month, 1).getDay(); //disabledクラスをつける前月の日にちを取得

    for (let i = 0; i < remainingDay; i++) {
      dates.unshift({ //先頭から数値をいれていくため unshift() を使う
        date: endDate - i, //残りの日数
        isDisabled: true, //disabledクラスつけるので真偽値をtrueにする
      }); 
    }
    return dates;
  }


  //今月分のカレンダーを作る
  function calenderBody() {
    const tbody = document.querySelector('tbody'); 

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    const title = document.getElementById('title');
    title.textContent = `${year}/${String(month + 1).padStart(2, 0)}`;

    const dates = [];  //1日から末日までの日付いれる配列

    //new Date() は現在日時を取得する→getDate()としてあげることで、1〜31の数値を取得できる
    const lastDate = new Date(year, month + 1, 0).getDate(); //

    // for文で1日目から末日までの日付を dates[] にpushする
    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isDisabled: false, //disabledクラスのつけ外しの判定
      });

    }
    return dates;
  }


  //翌月分の日数を取得する
  function nextMonthDate() {
    const dates = []; //翌月分の日数をいれる空の配列を作る
    const lastDay = new Date(year, month + 1, 0).getDay(); 
    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isDisabled: true,
      });
    }
    return dates;
  }


  //3つのカレンダーを合わせて実際のカレンダーを描画する
  function calenderMix() { //配列にまとめて統合する
    const dates = [        //配列の中に配列が入っている状態
      ...backMonthDate(),  //スプレッド構文で配列のなかを一つにまとめる
      ...calenderBody(),
      ...nextMonthDate(),
    ];

    const oneWeek = []; //1週間分の空の配列を作る
    const weeks = dates.length / 7; //1週間が何周分あるかは dates.length を7日で割る

    for (let i = 0; i < weeks; i++) { 
      oneWeek.push(dates.splice(0, 7)); //dates[] の先頭から7日分を取り出して、oneWeek にpush する
    }

    oneWeek.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');
        td.textContent = date.date;
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  //backをクリックすると単純に前の月、もしくは前の年をまたいで前の月を表示するようにする
  document.getElementById('back').addEventListener('click', () => {
    month--; //月を減らす
    if (month < 0) { //年をまたいだら→最初に書いた通り0スタートだから0は1月の意味になる
      year--;        //1年減らす
      month = 11;   //12月にする→最初に書いた通り0スタートだから常に1引いたものを月にする
    }
    calenderMix(); //カレンダーを表示する
  });

  //nextをクリックすると単純に次の月、もしくは年をまたいで次の月を表示するようにする
  document.getElementById('next').addEventListener('click', () => {
    month++; //月を増やす
    if (month > 11) { //年をまたいだら→最初に書いた通り0スタートだから0は1月の意味になる
      year++;        //1年増やす
      month = 0;   //1月にする→最初に書いた通り0スタートだから常に1引いたものを月にする
    }
    calenderMix(); //カレンダーを表示する
  });

  calenderMix();

}  